import main_config from "./main_config";
import chartConfig from "../conf/healthchartConfig";
import {
  csnList,
  csnToFhirIdMap,
  setTokenResponse,
  today,
  tokenResponse,
} from "./shared.js";
import { getUrlParameter, search } from "./http.js";
var config = main_config;
var encId;
var encounters = [];
var locations = [];

var chart = chartConfig.chart;

var fhirMeds = []; // Temporary storage for the FHIR MedicationRequest response

function getPreliminaryData() {
  var deferreds = [];
  config.function.forEach(function (func) {
    var deferred = window[func.name].apply(null, func.params);
    if (func.callback) {
      deferred = deferred.then((responseData, state, xhr) =>
        window[func.callback].apply(null, [
          responseData,
          func.callbackConditions,
          state,
          xhr,
        ])
      );
    }
    deferreds.push(deferred);
  });

  return jQuery.when.apply(jQuery, deferreds);
}

function splitFhirRequest(
  splits,
  splitTimeDiff,
  callback,
  callbackConditons,
  endpoint,
  data,
  method,
  headers
) {
  var deferreds = [];
  for (var i = 1; i <= splits; i++) {
    // Example: Sending additional data to the callback
    deferreds.push(
      search(endpoint, data, method, headers).then((responseData, state, xhr) =>
        callback(responseData, callbackConditons, state, xhr)
      )
    );
  }
  return deferreds;
}

// this is the general callback function that execute code
// this will execute if-else condition
// on the basis of conditions array
// conditions array contains list of objects
// an object contain a condition if that true then execute the statements
// if the satements depends on some external variable or data we use some extenal function
// Otherwise we simply execute the statements
function callBack(data, conditions, state, xhr) {
  try {
    conditions.forEach(function (cond) {
      // get conditions one by one from config file for that callback
      let result;
      if (cond.condition(data, state, xhr)) {
        if (cond.external) {
          // check if there is some external variable or data used
          var external = window[cond.external.name].apply(
            // call external function
            null,
            cond.external.params // send params
          );
          if (cond.external.callback) {
            // if there is a callback for the external function
            external.then((responseData, state, xhr) => {
              cond.external.callback(
                responseData,
                cond.external.callbackConditions,
                state,
                xhr
              );
            });
          }
        } else {
          // execute the statements when there is no external dependency of variable or data
          // store the result
          result = cond.execute(data, state, xhr);
        }
        // result contains the update data
        // Here if condition is used to replace the old data with new data
        if (result) {
          data = result;
        } else if (result == null) {
          // this is used to return null to avoid undefined condition
          return;
        }
      }
    });
  } catch (error) {
    displayError(error);
  }
}

// this function is used to iterate over data
function executeLoop(data, state, xhr, callback, callbackConditions) {
  data.forEach(function (list) {
    callback(list, callbackConditions, state, xhr);
  });
}

// external function to push data in fhirMeds
// currently used in Medication Request api
function fhirMedCallback(meds, state, xhr) {
  fhirMeds.push.apply(fhirMeds, meds.entry);
}

// external function that used to set encounter id
// currently used in hospital-problem api callback
function setEncId(id) {
  encId = id;
}

// external function to map hospital-problem with encounter id
// currently used in hospital-problem api callback
function hospitalCallback(problem, state, xhr) {
  if (!hospitalProblemMap[encId]) {
    hospitalProblemMap[encId] = [];
  }
  hospitalProblemMap[encId].push(problem.item.reference);
}

// external function to push data in encounters
// currently used in encounter api
function encounterPush(enc) {
  encounters.push(enc);
}

// external function to push data in locations
// currently used in encounter api
function locationPush(loc) {
  locations.push(loc);
}

// this function is used to display error
function displayError(error) {
  chart.failure = true;
  log(error.stack, "error");
}
// trying to execute statements that was required before an api call
function getRemainingData(
  encounters,
  hospitalProblemMap,
  callback,
  callbackConditons,
  endpoint,
  data,
  method,
  headers
) {}

// trying to execute api call that even depend on previous calls
function apiCalls() {
  var deferreds = [];
  config.function.forEach(function (func) {
    deferreds = callingApi(func, deferreds);
  });
  return jQuery.when.apply(jQuery, deferreds);
}

// actual call of api
function callingApi(func, deferreds) {
  var deferred;
  if (func.depends_on) {
    var result = jQuery.when.apply(jQuery, deferreds);
    result.then(function(){
      deferreds = [];
      func.depends_on = false;
      deferreds = callingApi(func, deferreds);
    })
    
  } else {
    deferred = window[func.name].apply(null, func.params);
    if (func.callback) {
      deferred = deferred.then((responseData, state, xhr) =>
        window[func.callback].apply(null, [
          responseData,
          func.callbackConditions,
          state,
          xhr,
        ])
      );
    }
    deferreds.push(deferred)
  }
  return deferreds;
}
