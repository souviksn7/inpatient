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

    // console.log("chartConfig in the beginning ", chartConfig);
    var rowMap = chartConfig.rowMap = {};
    chartConfig.rows.forEach(function(v, i) {
        chartConfig.rowMap[v.name] = i;
    });
    // console.log("rowMap ", rowMap);
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

    console.log(state,"state")
    if (state.tokenResponse) {
        // Update the token response with the previous state
        setTokenResponse(state.tokenResponse);

        // Set the base URL to use based on the previous state
        state.baseUrl = (state.serverUrl.replace('FHIR/R4', ''));

        // Initialize app
        // console.log("I am in main file",tokenResponse)
        
        apiCall(tokenResponse,state)
    } else {
        getAccessToken().then(function() {
            try {
                // console.log("I am in main file",tokenResponse)
                apiCall(tokenResponse,state)
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


function apiCall(tokenResponse,state){
    console.log('tokee',state)
    var headers = {
        'Content-Type': 'application/json',
        'tokenResponse':JSON.stringify(tokenResponse),
        'state':JSON.stringify(state)
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
        console.log(data)
        // You can do whatever you need with the filename here
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('There was a problem with the fetch operation:', error);
      });
}