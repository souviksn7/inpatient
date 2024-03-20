// Extneral imports
import jQuery, { error } from "jquery";
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
import { getUrlParameter} from "./http.js";

// Custom CHOP data
// import customHosts from "./customHosts.js";
import { carePlans} from "./aap.js";


// EHR note generation
import {  countToRTF } from "./note.js";

try {
    
    // Initialize timeline variable here to obtain access in other functions
    var timeline;

    // Total time from start of first request to end of last request.
    // Added to provide better performance metrics that take into consideration
    // browser content download time.


    // Initialize variable to measure time in hover event
    var timeIn;

    // Padding to ensure the application fits within the user's workspace
    var windowWidth;
    var windowPadding = 20;

    // Create shortcuts to commonly used components of the config
    var chart = chartConfig.chart;

    // Regex patterns
  

    // Patient data
    var encounters = []; // Relevant patient encounter information. Passed to HealthChart
    var medPlot = []; // Relevant medication information. Passed to HealthChart
   
    var encMap = {}; // Key is FHIR ID and includes basic information about each encounter


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
      fetch('http://localhost:3006/healthchart/gethealthchartData', {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        if (!response.ok) {
        //   throw new Error(response);
         return response.json().then(data => {
            if(data.error){
                throw new Error(data.error);
            }else{
                throw new Error('Network response was not ok');
            }
      
      });
        }
        // Parse the response body as JSON
        return response.json();
      })
      .then(async (data) => {
        // Access the data received from the server
        console.log(data.encounters);
        encounters = data.encounters;
        medPlot = data.medPlot || [];
        encMap = data.encMap || {};
        chartConfig.rows = data.chartConfig.rows;
        render();
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('There was a problem with the fetch operation:', error);
        alert(error)
       
      });
}