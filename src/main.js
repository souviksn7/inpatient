// Extneral imports
import jQuery from "jquery";
import merge from "lodash/merge";
import each from "lodash/each";
import healthchart from "healthchart";


// Internal imports
import chartConfig from "../conf/healthchartConfig.js";
// souvik comment
// import demo_confic from "../conf/visitConfig.js";

// EHR communication and session state
import { addEHRListener, ehrHandshake, executeAction, setEHRToken } from "./ehrComms.js";
import { getAndSetState, setStateKey, state, stateKey } from "./state.js";

// Logging
import { log, logD, flushLogs } from "./logger.js";

// Shared variables and functions
import { csnList, csnToFhirIdMap, setTokenResponse, today, tokenResponse } from "./shared.js";

// Authorization
import { getAccessToken } from "./auth.js";

// Error
import { dataFail, failureSplash } from "./error.js";

// HTTP imports
import { getUrlParameter, search } from "./http.js";

// Custom CHOP data
import customHosts from "./customHosts.js";
import { carePlans, getAsthmaActionPlan, getAsthmaCarePlan, filterCarePlans } from "./aap.js";
import { csnToDatMap, getEncDat } from "./dat.js";
import { filterExternalEncounters, getExternalEncounters } from "./hie.js";

// EHR note generation
import { followedBy, countToRTF } from "./note.js";
// import { getVisits, getVisitsRemainingData, visitsProcess } from "./visits.js";

// Wrap entire code within a try-catch to avoid potential EHR workflow issues
try {
    
    // Initialize timeline variable here to obtain access in other functions
    var timeline;

    // Total time from start of first request to end of last request.
    // Added to provide better performance metrics that take into consideration
    // browser content download time.
    var requestTime;

    // Initialize variable to measure time in hover event
    var timeIn;

    // Padding to ensure the application fits within the user's workspace
    var windowWidth;
    var windowPadding = 20;

    // Create shortcuts to commonly used components of the config
    var chart = chartConfig.chart;

    // Regex patterns
    var asthmaDxRegex = /^493\.?|^J45\.?/i; // Used to identify asthma diagnoses
    var croupDxRegex = /croup|laryngotracheobronchitis/i; // Used to identify croup diagnoses
    var truncateMedRegex = /^([^\d]*)\d+/; // Used to get medication name only (removes strength, route, form, etc.)
    var albuterolRegex = /accuneb|proair|ventolin|proventil|albuterol/i; // Used to identify albuterol medications

    // Date references for querying
    var counterLookback = chartConfig.chart.dates.line;
    var fhirLookback = "gt" + chartConfig.chart.dates.contextStart.toISOString().slice(0,10);

    // Patient data
    var encounters = []; // Relevant patient encounter information. Passed to HealthChart
    var medPlot = []; // Relevant medication information. Passed to HealthChart
    var locations = []; // Results from the "_include=Encounter:Location" parameter in the encounter request. Not passed to HealthChart
    var fhirMeds = []; // Temporary storage for the FHIR MedicationRequest response

    var locationMap = {}; // Key is FHIR ID and includes information to filter location
    var encMap = {}; // Key is FHIR ID and includes basic information about each encounter
    var encDateMap = {}; // Key is date string. Used to map medications to encounters 
    var medIdMap = {}; // Key is order ID. Used to store information about medications

    // Stores encounter information for acute encounters. This is used to link administrations
    // to encounters. Also used as a fallback if an OP order couldn't be linked to an encounter.
    var acuteCareList = [];

    var medAdminList = []; // List of order IDs to include in a payload to retrieve med admin info.
    var medAdminMap = {}; // Key is order ID. Maps individual administrations of an order to an encounter

    // Key is encounter FHIR ID. Stores hospital problems for resepective encounters.
    var hospitalProblemMap = {};

    // Build row location map based on chart config
    // Reduces iterations when pushing data since chartConfig.rows is an array

    console.log("chartConfig in the beginning ", chartConfig);
    var rowMap = chartConfig.rowMap = {};
    chartConfig.rows.forEach(function(v, i) {
        chartConfig.rowMap[v.name] = i;
    });
    console.log("rowMap ", rowMap);
    // Initialize app 
    init();
} catch (error) {
   chart.failure = true;
   failureSplash();
   log(error.stack, "error");
}

// Initialize the application by extracting the state parameter
// and loading previous state
function init() {
    // Extract URL parameters to complete auth
    setStateKey(getUrlParameter("state"));

    // If key is not present in the URL, abort the flow
    if (!stateKey) {
        // Invalid key parameter return an error
        throw new Error("Invalid state parameter");
    }

    // Extract state from session storage
    getAndSetState(stateKey);

    // If state can't be found, abort the flow
    if (!state) {
        // Invalid key parameter return an error
        throw new Error("Failed to obtain application state");
    }

    // Initialize callbacks
    var callbacks = {
        closeCB: closeCB,
        logFn: log
    };

    // Re-establish new event listener
    addEHRListener(callbacks);

    // Re-establish EHR token
    // souvik comment
    // if (state.ehrToken) {
    //     setEHRToken(state.ehrToken);
    // } else {
    //     throw new Error("Failed to obtain ehr token");
    // }

    // Check if an access token exists
    if (state.tokenResponse) {
        // Update the token response with the previous state
        setTokenResponse(state.tokenResponse);

        // Set the base URL to use based on the previous state
        state.baseUrl = (state.serverUrl.replace('FHIR/R4', ''));

        // Initialize app
        apiCall(tokenResponse,state,sessionStorage)
        // buildApp();
    } else {
        getAccessToken().then(function() {
            try {
                apiCall(tokenResponse,state,sessionStorage)
                // buildApp();
            } catch (error) {
               chart.failure = true;
               failureSplash();
               log(error.stack, "error");
            }
        }, dataFail);
    }
}

function closeCB() {
    // Remove sessionStorage - it is shared across the entire
    // EHR session so it is important to remove it when finished
    sessionStorage.removeItem(stateKey);
}





function render() {
    try{
        if (chartConfig.chart.severity.calculator) {
            chartConfig.chart.severity.calculator(chartConfig, true);
          }
          
          // Convert detailMap in encInfo to a list
          // Required for the healthchart library
          try{
              each(encMap, function(enc) {
                  enc.details = [];
                  chartConfig.detailsOrder.forEach(function(k) {
                      if (enc.detailMap[k]) {
                          var tmp = merge( { label: k }, enc.detailMap[k]);
                          if (k in { "Full Visit Report": 1, "Asthma Care Plan": 1 }) {
                              console.log(new Date(enc._start))
                              tmp.label = k + " - " + stringFromDate(new Date(enc._start));
                          }
                          if (k == "Asthma Meds Ordered" || k == "Asthma Meds Administered") {
                              if (tmp.value.length === 0) {
                                  tmp.value.push("None");
                              }
                          }
                          enc.details.push(tmp);
                      }
                  });
                  delete enc.detailMap;
              });
          }catch(error){
              console.log(error)
          }
      
          console.log("hello")
          
      
          // Pass encounter detail info as a map
          // Reduces the footprint of the application
          chartConfig.chart.infoMap = encMap;
      
          // Places the data points in the appropriate section
          // Doing this later to allow for potential filtering
          // after all data has come in
          encounters.forEach(function(v) {
              chartConfig.rows[rowMap[v.row]].data.push(v);
          });
          medPlot.forEach(function(v) {
              chartConfig.rows[rowMap[v.row]].data.push(v);
          });
          carePlans.forEach(function(v) {
              chartConfig.rows[rowMap[v.row]].data.push(v);
          });
          // Generate note text
          countToRTF();
      
          if (typeof getLastFileDate === "function") {
              getLastFileDate();
          }
      
          // Set chart width based on the available space of the window
          // This will need to be changed based on the
          // location of the application in the EHR.
          windowWidth = window.innerWidth;
          chart.width = windowWidth - windowPadding > 1200 ? 1200 : windowWidth - windowPadding;
          // Limit div to the size of the chart to eliminate EHR scroll bars
          jQuery("#" + chartConfig.namespace).css("width", chart.width);
          if (chart.width < 785) {
              chart.details.width = 0;
          }
      
          // Instantiate timeline
          timeline = new healthchart.chart(chartConfig.namespace, chartConfig);
      
          // Log event that says the application was displayed
          log({"app.severity": chart.severity.level || "none"}, "info");
      
          // Add to timeline object
          timeline.log = log;
      
          // Overwrite healthchart "on" functions so I can log
          // when users are interacting with the timeline
          timeline.mouseover = function(elem, d) {
              // 'this' refers to the healthchart object
              if (this.hover) {
                  return;
              }
              timeIn = new Date();
              this.hover = true;
              this.fade(elem, d);
              this.displayTooltip(elem, d);
          };
      
          timeline.mouseout = function(elem, d) {
              // 'this' refers to the healthchart object
              this.hover = false;
              this.unFade(elem, d);
              this.hideTooltip();
              if (timeIn && new Date() - timeIn > 500){
                  log(d.row + " hover event.", "info");
              }
          };
      
          timeline.mousedown = function(elem, d) {
              log(d.row + " click event.", "info");
              this.target = healthchart.select(elem);
              this.connect(d);
              this.update(elem, d);
          };
      
          // Add listener to respond to the page width
          window.addEventListener("resize", resizeHealthChart);
      
          // Flush logs
          flushLogs();
    }
    catch(error){
        console.log("render",error)
    }
    // If a severity function exists, use it
  
}

/*****************************************************
****************** HTTP Functions ********************
******************************************************/


/*****************************************************
***************** Problem Functions ******************
******************************************************/

// Validates that each encounter discharge diagnosis set
// includes asthma but not croup.
function checkDx(dxList) {
    var asthmaDx = false;
    var croupDx = false;
    dxList.forEach(function(dx) {
        if (asthmaDxRegex.test(dx.code)) {
            asthmaDx = true;
        }
        if (dx.text && croupDxRegex.test(dx.text)) {
            croupDx = true;
        }
    });
    return (asthmaDx && !croupDx);
}

/*****************************************************
***************** EHR Communication ******************
******************************************************/

function visitReport(elem, data) {
    try {
        log(data.row + " encounter report click event.", "info");
        executeAction({
            action: "Epic.Clinical.Informatics.Web.LaunchActivity",
            args: {
                "ActivityKey":"REPORTVIEWER",
                "Parameters":{
                    "REPORTPROVIDER":"MR_REPORTS",
                    "REPORTCONTEXT": "11^R99#,EPT," + tokenResponse.eptIdIn + "," + csnToDatMap[data._csn] + ",1"
                }
            }
        });
    } catch (error) {
       log(error.stack, "error");
    }
}

/*****************************************************
********************** Utility ***********************
******************************************************/

function dateFromString(dte) {
    // If date is null, return null
    if (!dte) {
        return null;
    }
    // If a time zone exists, but is midnight, break the date into parts
    // and remove the timezone. This date form is typically passed for
    // on demand outpatient support encounters like telephone or messaging.
    if (dte.indexOf("T00:00:00Z") >= 0 || dte.indexOf("T") < 0) {
        // Split date into parts to avoid issues with time zones
        var dateParts = dte.split("T")[0].split("-");
        // Use date written as intial start time. Month is zero indexed.
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    }
    return new Date(dte);
}

// Implemented this since toLocaleDateString() was adding a significant
// amount of time in the EHR
function stringFromDate(dte) {
    // If date is null, return null
    if (!dte) {
        return null;
    }
    // Return date in MM/DD/YYYY format
    return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
}

// Create function to respond to the page width
function resizeHealthChart(){
    try {
        if (!timeline) {
            return;
        }
        // Need to immediately remove the timeline so the page can resize appropriately
        timeline.remove();
        // Adds a timeout to allow the DOM to refresh to the new size
        setTimeout(function() {
            windowWidth = window.innerWidth;
            try {
                timeline.options.chart.width = windowWidth - windowPadding > 1200 ? 1200 : windowWidth - windowPadding;
                if (timeline.options.chart.width < 785) {
                    timeline.options.chart.details.width = 0;
                } else if (chart.details && chart.details.width) {
                    timeline.options.chart.details.width = chart.details.width;
                } else {
                    timeline.options.chart.details.width = healthchart.defaultOptions.chart.details.width;
                }
                // Limit div to the size of the chart to eliminate EHR scroll bars
                jQuery("#" + chartConfig.namespace).css("width", timeline.options.chart.width);
                timeline.resize();
            } catch (error) {
                chart.failure = true;
                failureSplash();
                log(error.stack, "error");
            }
        }, 500);
    } catch (error) {
        chart.failure = true;
        failureSplash();
        log(error.stack, "error");
    }
}

function apiCall(tokenResponse,state,sessionStorage){
    // console.log("healthcahrt",healthchart.dateMath)
    let sessionData = {};

// Iterate through all keys in sessionStorage
for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  const value = sessionStorage.getItem(key);

  // Add key-value pair to sessionData object
  sessionData[key] = value;
}
    console.log(sessionData,"session")
    console.log('tokee',state)
    var headers = {
        'Content-Type': 'application/json',
        'tokenResponse':JSON.stringify(tokenResponse),
        'state':JSON.stringify(state),
        'sessionStorage':JSON.stringify(sessionData),
       
      };
      console.log(headers)
    fetch('http://localhost:3006/visits/getVisitData',
    {
        method: 'GET',
        headers: headers
      })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log("resposne",response)
        return response.json(); // Parse the response body as JSON
      })
      .then(async (data) => {

        // Access the filename property from the first object in the array

        console.log(data.encounters)

        encounters = data.encounters 
        medPlot = data.medPlot || []
        encMap = data.encMap || {}
        chartConfig.rows = data.chartConfig.rows
        // chartConfig.detailsOrder = data.chartConfig.detailsOrder
        console.log(encMap,"encMap")

        
        render();
        // You can do whatever you need with the filename here
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('There was a problem with the fetch operation:', error);
      });
}