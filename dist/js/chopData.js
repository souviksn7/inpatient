// // Extneral imports
import jQuery from "jquery";
// import merge from "lodash/merge";
// import each from "lodash/each";
// import healthchart from "healthchart";


// // Internal imports
import chartConfig from "../conf/healthchartConfig.js";
// // souvik comment
// // import demo_confic from "../conf/visitConfig.js";
// 
// // EHR communication and session state
// import { addEHRListener, ehrHandshake, executeAction, setEHRToken } from "./ehrComms.js";
// import { getAndSetState, setStateKey, state, stateKey } from "./state.js";

// // Logging
// import { log, logD, flushLogs } from "./logger.js";

// // Shared variables and functions
// import { csnList, csnToFhirIdMap, setTokenResponse, , tokenResponse } from "./shared.js";

// // Authorization
// import { getAccessToken } from "./auth.js";

// // Error
// import { dataFail, failureSplash } from "./error.js";

// // HTTP imports
// import { getUrlParameter, search } from "./http.js";

// // Custom CHOP data
import customHosts from "./customHosts.js";
import { carePlans, getAsthmaActionPlan, getAsthmaCarePlan, filterCarePlans } from "./aap.js";
import { csnToDatMap, getEncDat } from "./dat.js";
// import { filterExternalEncounters, getExternalEncounters } from "./hie.js";

// // EHR note generation
// import { followedBy, countToRTF } from "./note.js";
// // import { getVisits, getVisitsRemainingData, visitsProcess } from "./visits.js";

// // Wrap entire code within a try-catch to avoid potential EHR workflow issues
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
    // var fhirLookback = "gt" + chartConfig.chart.dates.contextStart.toISOString().slice(0,10);



    // Build row location map based on chart config
    // Reduces iterations when pushing data since chartConfig.rows is an array

    // console.log("chartConfig in the beginning ", chartConfig);
    // var rowMap = chartConfig.rowMap = {};
    // chartConfig.rows.forEach(function(v, i) {
    //     chartConfig.rowMap[v.name] = i;
    // });
    // console.log("rowMap ", rowMap);
    // Initialize app 
    // init();
} catch (error) {
//    chart.failure = true;
//    failureSplash();
//    log(error.stack, "error");
}

// Initialize the application by extracting the state parameter
// and loading previous state
// function init() {
//     // Extract URL parameters to complete auth
//     setStateKey(getUrlParameter("state"));

//     // If key is not present in the URL, abort the flow
//     if (!stateKey) {
//         // Invalid key parameter return an error
//         throw new Error("Invalid state parameter");
//     }

//     // Extract state from session storage
//     getAndSetState(stateKey);

//     // If state can't be found, abort the flow
//     if (!state) {
//         // Invalid key parameter return an error
//         throw new Error("Failed to obtain application state");
//     }

//     // Initialize callbacks
//     var callbacks = {
//         closeCB: closeCB,
//         logFn: log
//     };

//     // Re-establish new event listener
//     addEHRListener(callbacks);

//     // Re-establish EHR token
//     // souvik comment
//     // if (state.ehrToken) {
//     //     setEHRToken(state.ehrToken);
//     // } else {
//     //     throw new Error("Failed to obtain ehr token");
//     // }

//     // Check if an access token exists
//     if (state.tokenResponse) {
//         // Update the token response with the previous state
//         setTokenResponse(state.tokenResponse);

//         // Set the base URL to use based on the previous state
//         state.baseUrl = (state.serverUrl.replace('FHIR/R4', ''));

//         // Initialize app
//         buildApp();
//     } else {
//         getAccessToken().then(function() {
//             try {
//                 buildApp();
//             } catch (error) {
//                chart.failure = true;
//                failureSplash();
//                log(error.stack, "error");
//             }
//         }, dataFail);
//     }
// }

// function closeCB() {
//     // Remove sessionStorage - it is shared across the entire
//     // EHR session so it is important to remove it when finished
//     sessionStorage.removeItem(stateKey);
// }

function buildApp(tokenResponse) {

    console.log("Hi i am in chopDatafile",tokenResponse)
    // Get time object. Date.now() is more efficient, which is
    // why we attempt to get this first, but it is not available
    // in all versions of IE.

 
    requestTime = Date ? Date.now() : new Date();
    console.log(requestTime)

    // // Get data
    getPreliminaryData()
    // .then(function() {
    //     try {
    //         getRemainingData().then(process, dataFail);
    //     } catch (error) {
    //        chart.failure = true;
    //        failureSplash();
    //        log(error.stack, "error");
    //     }
    // }, dataFail);

}

function process() {
    try {
        // Get time object. Date.now() is more efficient, which is
        // why we attempt to get this first, but it is not available
        // in all versions of IE.
        var endTime = Date ? Date.now() : new Date();

        // Log total transaction time of all requests, which includes time related
        // to the deferred flows.
        logD({"transaction.total.duration.ms": endTime - requestTime} , "info");

        // Display the failure message if something went wrong
        if (chart.failure) {
            failureSplash();
            return;
        }

        // Waiting until remaining data is back to link
        // medications to encounters;
        linkMedAdmin();

        // Build medication visualization object to pass to visualization library
        buildMedVisObj();

        // Post-process encounters after medications have been linked
        postFilterEncounters();

        // Filter external encounters
        filterExternalEncounters();

        // Build visualization
        render();
    } catch (error) {
        chart.failure = true;
        failureSplash();
        log(error.stack, "error");
        return;
    }
}

// function render() {
//     // If a severity function exists, use it
//     if (chartConfig.chart.severity.calculator) {
//       chartConfig.chart.severity.calculator(chartConfig, true);
//     }
    
//     // Convert detailMap in encInfo to a list
//     // Required for the healthchart library
    
//     each(encMap, function(enc) {
//         enc.details = [];
//         chartConfig.detailsOrder.forEach(function(k) {
//             if (enc.detailMap[k]) {
//                 var tmp = merge( { label: k }, enc.detailMap[k]);
//                 if (k in { "Full Visit Report": 1, "Asthma Care Plan": 1 }) {
//                     tmp.label = k + " - " + stringFromDate(enc._start);
//                 }
//                 if (k == "Asthma Meds Ordered" || k == "Asthma Meds Administered") {
//                     if (tmp.value.length === 0) {
//                         tmp.value.push("None");
//                     }
//                 }
//                 enc.details.push(tmp);
//             }
//         });
//         delete enc.detailMap;
//     });

//     // Pass encounter detail info as a map
//     // Reduces the footprint of the application
//     chartConfig.chart.infoMap = encMap;

//     // Places the data points in the appropriate section
//     // Doing this later to allow for potential filtering
//     // after all data has come in
//     encounters.forEach(function(v) {
//         chartConfig.rows[rowMap[v.row]].data.push(v);
//     });
//     medPlot.forEach(function(v) {
//         chartConfig.rows[rowMap[v.row]].data.push(v);
//     });
//     carePlans.forEach(function(v) {
//         chartConfig.rows[rowMap[v.row]].data.push(v);
//     });
//     // Generate note text
//     countToRTF();

//     if (typeof getLastFileDate === "function") {
//         getLastFileDate();
//     }

//     // Set chart width based on the available space of the window
//     // This will need to be changed based on the
//     // location of the application in the EHR.
//     windowWidth = window.innerWidth;
//     chart.width = windowWidth - windowPadding > 1200 ? 1200 : windowWidth - windowPadding;
//     // Limit div to the size of the chart to eliminate EHR scroll bars
//     jQuery("#" + chartConfig.namespace).css("width", chart.width);
//     if (chart.width < 785) {
//         chart.details.width = 0;
//     }

//     // Instantiate timeline
//     timeline = new healthchart.chart(chartConfig.namespace, chartConfig);

//     // Log event that says the application was displayed
//     log({"app.severity": chart.severity.level || "none"}, "info");

//     // Add to timeline object
//     timeline.log = log;

//     // Overwrite healthchart "on" functions so I can log
//     // when users are interacting with the timeline
//     timeline.mouseover = function(elem, d) {
//         // 'this' refers to the healthchart object
//         if (this.hover) {
//             return;
//         }
//         timeIn = new Date();
//         this.hover = true;
//         this.fade(elem, d);
//         this.displayTooltip(elem, d);
//     };

//     timeline.mouseout = function(elem, d) {
//         // 'this' refers to the healthchart object
//         this.hover = false;
//         this.unFade(elem, d);
//         this.hideTooltip();
//         if (timeIn && new Date() - timeIn > 500){
//             log(d.row + " hover event.", "info");
//         }
//     };

//     timeline.mousedown = function(elem, d) {
//         log(d.row + " click event.", "info");
//         this.target = healthchart.select(elem);
//         this.connect(d);
//         this.update(elem, d);
//     };

//     // Add listener to respond to the page width
//     window.addEventListener("resize", resizeHealthChart);

//     // Flush logs
//     flushLogs();
// }

// /*****************************************************
// ****************** HTTP Functions ********************
// ******************************************************/

// // Get first set of data
function getPreliminaryData() {
    var deferreds = [];

    // Split EHR medication request to differentiate between groupers,
    // which determines what type of medication it is.

    // souvik comment
    // deferreds.push.apply(deferreds, getEHRMedicationsRequest());

    // Split FHIR medication request to reduce load time.
    deferreds.push.apply(deferreds, splitFhirRequest(3, today - chart.dates.contextStart, fhirMedCallback, "FHIR/R4/MedicationRequest",
        {
            patient: tokenResponse.patient
        }
    ));
    // Add other calls
    deferreds.push(
        search("FHIR/R4/List",
            {
                code: "hospital-problems",
                patient: tokenResponse.patient
            }
        ).then(function(bundle, state, xhr) {
            try {
                // Add response to list reference. Will be used after all responses
                // are returned to link medications to encounters. Must wait for all
                // responses based on the limitations of the "list" resource, which
                // doesn't specify a value for "medication started at visit".
                if (!bundle.entry) {
                    return;
                }
                bundle.entry.forEach(function(list) {
                    if (!list.resource || !list.resource.entry) {
                        return;
                    }

                    // Store a reference to the FHIR encounter ID so we can establish
                    // a link between this problem and the encounter.
                    var encId = list.resource.encounter.reference.replace("Encounter/", "");

                    list.resource.entry.forEach(function(problem) {
                        if (!hospitalProblemMap[encId]) {
                            hospitalProblemMap[encId] = [];
                        }
                        hospitalProblemMap[encId].push(problem.item.reference);
                    });
                });
            } catch (error) {
                chart.failure = true;
                log(error.stack, "error");
            }
        })
    );

    // Split encounter request to speed up application load time
    deferreds.push.apply(deferreds, splitFhirRequest(3, today - chart.dates.contextStart, encounterCallback, "FHIR/R4/Encounter",
        {
            patient: tokenResponse.patient,
            _include: "Encounter:Location"
        }
    ));
  
    // souvik comment
    // if (customHosts[sessionStorage.getItem("env")]) {
    //     if (typeof getControlTool === "function") {
    //         deferreds.push.apply(deferreds, getControlTool());
    //     }

    //     if (typeof getAsthmaActionPlan === "function") {
    //         deferreds.push(getAsthmaActionPlan());
    //     }

    //     if (typeof getAsthmaCarePlan === "function") {
    //         deferreds.push(getAsthmaCarePlan());
    //     }

    //     if (typeof getExternalEncounters === "function") {
    //         deferreds.push(getExternalEncounters());
    //     }
    // }

    return jQuery.when.apply(jQuery, deferreds);
}

// // Get remaining set of data
// function getRemainingData() {
//     // console.log("in getRemaining Data, before filterLocation, encounters array ", encounters);
//     console.log("encMap before filterLocation ", encMap);
//     var deferreds = [];
//     // Filter locations to enable filtering during encounter processing
//     filterLocations();
    
//     console.log("locationMap after filterLocation ", locationMap);
//     console.log("encounters before preFilterEncounters ", encounters);
//     // Perform a pre-filtering of the encounters to obtain base information about each for encMap
//     // and remove those that don't meet initial criteria. Will still need to filter based on dx and meds.
//     preFilterEncounters(deferreds);
    
//     // Obtain admin history for meds classified as "inpatient"
//     // This includes acute encounters (e.g. IP and ED) as well
//     // as clinic administered medications.

//     // souvik comment
//     // if (medAdminList.length > 0) {
//     //     deferreds.push(getMedAdmin());
//     // }


//     // Attach encounter ID to meds in medIdMap
//     addMedContext();

//     // Filter on care plans;
//     filterCarePlans(encMap);

//     if (customHosts[sessionStorage.getItem("env")]) {
//         if (typeof getEncDat === "function" && csnList.length > 0) {
//             deferreds.push(getEncDat());
//         }
//     }

//     return jQuery.when.apply(jQuery, deferreds);
// }

function splitFhirRequest(splits, splitTimeDiff, callback, endpoint, data, method, headers) {
    var deferreds = [];
    for (var i = 1; i <= splits; i++) {
        // souvik comment
        // data.Date = [
        //     "le" + new Date(today - (splitTimeDiff / splits * (i - 1))).toISOString().slice(0, 10),
        //     "gt" + new Date(today - (splitTimeDiff / splits * i)).toISOString().slice(0, 10)
        // ];
        deferreds.push(search(endpoint, data, method, headers).then(callback));
    }
    return deferreds;
}

// function encounterCallback(enc, state, xhr) {
//     try {
//         if (xhr.status != 200) {
//             ref.failure = true;
//             log(this.type + " " + this.url + " " + xhr.status, "error");
//             return;
//         }
//         if (enc.entry && enc.entry[enc.entry.length - 1].resource.issue) {
//             // TODO - Not a great error message. Should think about improving
//             log(this.type + " " + this.url + " 409 (Malformed Response)", "warn");
//         }
//         enc.entry.forEach(function(v) {
//             if (v.resource.resourceType == "Encounter") {
//                 encounters.push(v.resource);
//             } else if (v.resource.resourceType == "Location") {
//                 locations.push(v.resource);
//             }
//         });
//         // console.log("in encounterCallback", encounters);
//     } catch (error) {
//         chart.failure = true;
//         log(error.stack, "error");
//     }
// }




// //Sudip- Not required
// function getEHRMedicationsRequest() {
//     var deferreds = [];
//     chartConfig.grouper.forEach(function(grouper) {
//         deferreds.push(
//             search("epic/2017/Clinical/Utility/GetMedications/GetMedications",
//                 JSON.stringify({
//                     "PatientID": tokenResponse.patient,
//                     "PatientIDType": "FHIR",
//                     "GrouperID": grouper.id,
//                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
//                     "ProfileView": "3"
//                 }),
//                 "POST",
//                 {
//                     "Content-Type": "application/json"
//                 }
//             ).then(function(meds, state, xhr) {
//                 try {
//                     // TODO - Need to check for "error" responses from EHR when there aren't any results to return
//                     if (!meds.MedicationOrders) {
//                         meds.MedicationOrders = [];
//                     }
//                     // Pre-filter immediately to prep for encounter linking.
//                     preFilterMedications(meds.MedicationOrders, grouper.row);
//                 } catch (error) {
//                     chart.failure = true;
//                     log(error.stack, "error");
//                 }
//             })
//         );
//     });
//     return deferreds;
// }

// function fhirMedCallback(meds, state, xhr) {
//     try {
//         if (xhr.status != 200) {
//             ref.failure = true;
//             log(this.type + " " + this.url + " " + xhr.status, "error");
//             return;
//         }
//         if (meds.entry && meds.entry[meds.entry.length - 1].resource.issue) {
//             // TODO - Not a great error message. Should think about improving
//             log(this.type + " " + this.url + " 409 (Malformed Response)", "warn");
//         }
//         if (meds.total === 0 || !meds.entry) {
//             meds.entry = [];
//         }
//         // TODO - May want to consider adding a map to see if the a previous request
//         // returned this medication.
//         fhirMeds.push.apply(fhirMeds, meds.entry);
//     } catch (error) {
//         chart.failure = true;
//         log(error.stack, "error");
//     }
// }

// function getEncDiagnosis(resource, deferred) {
//     deferred.push(
//         search("FHIR/R4/Condition",
//                {
//                    patient: tokenResponse.patient,
//                    category: "encounter-diagnosis",
//                    encounter: resource.id
//                }
//         ).then(function(encDx, state, xhr) {
//             try {
//                 encDx.entry.forEach(function(entry) {
//                     if (encMap[resource.id]._validDx) {
//                         return;
//                     }
//                     if (entry.resource.code) {
//                         encMap[resource.id]._validDx = checkDx(entry.resource.code.coding);
//                     }
//                 });
//             } catch (error) {
//                 chart.failure = true;
//                 log(error.stack, "error");
//             }
//         })
//     );
// }

// function readCondition(resource, reference, deferred) {
//     deferred.push(
//         search("FHIR/R4/" + reference).then(function(condition, state, xhr) {
//             try {
//                 if (encMap[resource.id]._validDx) {
//                     return false;
//                 }
//                 // TODO - Future state could consider capturing the data
//                 // and processing later
//                 if (condition.code) {
//                     condition.code.coding.forEach(function(dx) {
//                         if (asthmaDxRegex.test(dx.code)) {
//                             encMap[resource.id]._validDx = true;
//                         }
//                         if (dx.text && croupDxRegex.test(dx.text)) {
//                             encMap[resource.id]._croupDx = true;
//                         }
//                     });
//                 }
//             } catch (error) {
//                 chart.failure = true;
//                 log(error.stack, "error");
//             }
//         })
//     );
// }

// // Get medication administrations for any orders
// function getMedAdmin() {
//     return search("epic/2014/Clinical/Patient/GETMEDICATIONADMINISTRATIONHISTORY/MedicationAdministration",
//         JSON.stringify({
//             "PatientID": tokenResponse.patient,
//             "PatientIDType": "FHIR",
//             "ContactID": tokenResponse.csn,
//             "ContactIDType": "CSN",
//             "OrderIDs": medAdminList
//         }),
//         "POST",
//         {
//             "Content-Type": "application/json"
//         }
//     ).then(function(adminHistory, state, xhr) {
//         try {
//             if (!adminHistory.Orders) {
//                 return;
//             }
//             adminHistory.Orders.forEach(function(d) {
//                 // This should never happen, but adding check
//                 // just in case.
//                 if (!medIdMap[d.OrderID.ID]) {
//                     return;
//                 }
//                 d.MedicationAdministrations.forEach(function(admin) {
//                     var adminDate = dateFromString(admin.AdministrationInstant);
//                     if (admin.AdministrationInstant && adminDate > chartConfig.chart.dates.contextStart) {
//                         if (!medAdminMap[d.OrderID.ID]) {
//                             medAdminMap[d.OrderID.ID] = [];
//                         }
//                         medAdminMap[d.OrderID.ID].push(
//                             {
//                                 date: adminDate,
//                                 dateStr: stringFromDate(adminDate)
//                             }
//                         );
//                     }
//                 });
//             });
//         } catch (error) {
//             chart.failure = true;
//             log(error.stack, "error");
//         }
//     });
// }

// /*****************************************************
// **************** Encounter Functions *****************
// ******************************************************/

// function filterLocations() {
//     locations.forEach(function(v) {
//         if (v.extension) {
//             v.extension.forEach(function(ext, i) {
//                 ext.valueCodeableConcept.coding.forEach(function(coding, j) {
//                     if (locationMap[v.id] === undefined && coding.system.indexOf(".7.10.688867.4150") >= 0) {
//                         locationMap[v.id] = {
//                             name: v.name,
//                             specialty: coding.display,
//                             code: coding.code
//                         };
//                     }
//                 });
//             });
//         }
//         if (v.identifier) {
//             v.identifier.forEach(function(id, i) {
//                 if (locationMap[v.id] === undefined) {
//                     locationMap[v.id] = {};
//                 }
//                 if (id.system && id.system.indexOf(".7.2.686980") >= 0) {
//                     locationMap[v.id].internalId = id.value;
//                 }
//             });
//         }
//     });
// }

// function isValidLocation(resource) {
//     var internalId;
//     if (locationMap[resource.deptId]) {
//         internalId = locationMap[resource.deptId].internalId;
//     }

//     // Check if this department should be ignored
//     if (internalId && chartConfig.ignoredDepts && chartConfig.ignoredDepts[internalId]) {
//         return false;
//     }

//     // Check for organization specific filtering
//     if (chartConfig.orgDeptMap && chartConfig.orgDeptMap[internalId]) {
//         encMap[resource.id].row = resource.row = chartConfig.orgDeptMap[internalId];
//         return true;
//     }
//     // souvik debug
//     // console.log("reource: ", resource);
//     // Use standardized mapping from FHIR service
//     if (locationMap[resource.deptId]) {
//         switch(locationMap[resource.deptId].code) {
//             case "3":
//                 encMap[resource.id].row = resource.row = "Allergy";
//                 return true;
//             case "82":
//                 encMap[resource.id].row = resource.row = "Primary Care";
//                 return true;
//             case "105":
//                 // Urgent care visit, which are plotted under Emergency Only
//                 encMap[resource.id].row = resource.row = "Emergency Only";
//                 return true;
//             case "110":
//                 encMap[resource.id].row = resource.row = "Pulmonary";
//                 return true;
//         }
//     }
//     return false;
// }


// function preFilterEncounters(deferred) {
    
//     encounters = encounters.filter(function(resource) {

//         // Check status of encounter. Encounters with unknown status can be discarded.
//         // This is typically from billing encounters that aren't used for clinical care
//         if (resource.status == "unknown") {
//             return false;
//         }
        
//         // Convert period to start and end date
//         var start = resource.start = dateFromString(resource.period.start);
//         var startStr = stringFromDate(start);
//         var end = resource.end = dateFromString(resource.period.end);
//         var endStr = stringFromDate(end);

//         // Do not process future encounters
//         if (!start || start > today) {
//             return false;
//         }

//         // Due to splitting of requests, the EHR can return duplicate entries
//         // if the encounter spans multiple days. Check if we've already processed this encounter
//         if (encMap[resource.id]) {
//             return false;
//         }

//         // Create global encounter map for direct access when enhancing
//         // information from other APIs (e.g. medications)
//         // Use the FHIR ID as the key
//         encMap[resource.id] = {
//             "_start": start,
//             "_end": end,
//             "detailMap": {
//                 "Asthma Meds Ordered": {
//                     value: []
//                 },
//                 "Asthma Meds Administered": {
//                     value: []
//                 },
//                 "Date": {
//                     value: startStr
//                 },
//                 "Full Visit Report": {
//                     link: visitReport
//                 },
//                 "Type": {}
//             }
//         };

//         // Obtain contact serial number (EHR encounter ID)
//         resource.identifier.forEach(function(id, j) {
//             if (id.system.indexOf(".7.3.698084.8") >= 0) {
//                 // Add csn to encounter object
//                 resource.csn = id.value;
//                 encMap[resource.id]._csn = resource.csn;

//                 // Add to CSN list to obtain DATs, which are used to
//                 // link to encounter reports
//                 csnList.push(resource.csn);
//                 // Add to CSN map to link care plan to encounter
//                 csnToFhirIdMap[resource.csn] = resource.id;
//             }
//         });

//         // Do not proceed if encounter is currently active
//         if (!end) {
//             return false;
//         }

//         // Extract encounter type and class (if they exist)
//         resource.type.forEach(function(type) {
//             type.coding.forEach(function(v) {
//                 if (v.system.indexOf(".7.10.698084.30") >= 0) {
//                     resource.contactType = +v.code;
//                     resource.contactName = v.display;
//                 } else if (v.system.indexOf(".7.10.698084.10110") >= 0) {
//                     resource.adtClass = +v.code;
//                     resource.adtClassName = v.display;
//                 }
//             });
//         });

//         // encDateMap is used to link clinic administered meds to outpatient encounters
//         // so restricting to office visits
//         if (resource.contactType == 101) {
//             // Creating this complex of an encounter date map may be
//             // superflous now that we can link meds to encounter IDs.
//             // Can likely assume that all office visits start and stop
//             // on the same day.
//             if (!encDateMap[startStr]) {
//                 encDateMap[startStr] = [];
//             }

//             // Adding full resource since I will need to sort on CSN
//             encDateMap[startStr].push(resource);
//             if (startStr != endStr) {
//                 if (!encDateMap[endStr]) {
//                     encDateMap[endStr] = [];
//                 }
//                 encDateMap[endStr].push(resource);
//             }
//         }

//         // Customer owned values
//         if ([1, 3, 4, 5].indexOf(resource.adtClass) >= 0) {
//             // Add encounter to the acute care list, which will be used to obtain
//             // medication administration records.
//             acuteCareList.push(resource);
//         }

//         // Check status of encounter. The values don't match up in EHR as you would expect.
//         if (!(resource.status in { "arrived": 1, "finished": 1, "in-progress": 1, "triaged": 1, "planned": 1 })) {
//             return false;
//         }
//         // Set visualization group to the encounter ID and populate the hover details
//         // with basic information about the encounter. Hover details will be expanded
//         // on within each encounter type.
//         resource.group = resource.id;
//         resource.hoverDetails = [
//             {
//                 key: "Date",
//                 value: startStr
//             }
//         ];

//         // Check for "inpatient" admission
//         //   1 - Inpatient
//         //   5 - Observation

        
//         if ([1, 5].indexOf(resource.adtClass) >= 0) {
//             // Retrieve Condition resource from the reference provided as part
//             // of the "list" resource for hospital problems, if it exists
//             if (hospitalProblemMap[resource.id]) {
//                 hospitalProblemMap[resource.id].forEach(function (reference) {
//                     deferred.push(search("FHIR/R4/" + reference).then(function (condition, state, xhr) {
//                         try {
//                             if (encMap[resource.id]._validDx) {
//                                 return false;
//                             }
//                             // TODO - Future state could consider capturing the data
//                             // and processing later
//                             if (condition.code) {
//                                 condition.code.coding.forEach(function (dx) {
//                                     if (asthmaDxRegex.test(dx.code)) {
//                                         encMap[resource.id]._validDx = true;
//                                     }
//                                     if (dx.text && croupDxRegex.test(dx.text)) {
//                                         encMap[resource.id]._croupDx = true;
//                                     }
//                                 });
//                             }
//                         } catch (error) {
//                             chart.failure = true;
//                             log(error.stack, "error");
//                         }
//                     }));
//                 });
//             }

//             // Check for an encounter diagnosis if it exists to also
//             // determine if this is an encounter we should plot
//             deferred.push(
//                     search("FHIR/R4/Condition",
//                             {
//                                 patient: tokenResponse.patient,
//                                 category: "encounter-diagnosis",
//                                 encounter: resource.id
//                             }
//                     ).then(function (encDx, state, xhr) {
//                 try {
//                     encDx.entry.forEach(function (entry) {
//                         if (encMap[resource.id]._validDx) {
//                             return;
//                         }
//                         if (entry.resource.code) {
//                             encMap[resource.id]._validDx = checkDx(entry.resource.code.coding);
//                         }
//                     });
//                 } catch (error) {
//                     chart.failure = true;
//                     log(error.stack, "error");
//                 }
//             }));

//             // Add details about the encounter to the encounter map
//             encMap[resource.id].row = resource.row = "Inpatient";
//             encMap[resource.id].detailMap.Type.value = resource.adtClassName;

//             // Add location to hover details
//             resource.hoverDetails.push({
//                 key: "Location",
//                 value: resource.adtClassName
//             });
//             // Check for ICU stays
//             if (resource.location) {
//                 // Get location name
//                 resource.location.forEach(function(loc, i) {
//                     // Verify the location has a "period" key
//                     if (loc.period && loc.location.reference) {
//                         var locationId = loc.location.reference.replace("Location/", "");
//                         if (
//                             chartConfig.icuList &&
//                             locationMap[locationId] &&
//                             locationMap[locationId].internalId &&
//                             chartConfig.icuList.indexOf(locationMap[locationId].internalId) !== -1
//                         ) {
//                             // Add metadata and change the color and shape based
//                             // on the value defined in the legend
//                             encMap[resource.id].detailMap["ICU Visit"] = {
//                                 highlight: true
//                             };
//                             resource._icu = true;
//                             resource.shape = chartConfig.rows[rowMap[resource.row]].legend.alt.shape;
//                             resource.color = chartConfig.rows[rowMap[resource.row]].legend.alt.color;
//                         }
//                     }
//                 });
//             }
//         // Check for "emergency" visit
//         } else if (resource.adtClass == 3) {
//             // Check if this is an encounter we should plot
//             getEncDiagnosis(resource, deferred);

//             // Add details about the encounter to the encounter map
//             encMap[resource.id].row = resource.row = "Emergency Only";
//             encMap[resource.id].detailMap.Type.value = resource.adtClassName;

//             // Add location to hover details
//             resource.hoverDetails.push({
//                 key: "Location",
//                 value: resource.adtClassName
//             });
//         // Process all other visits
//         } else {
//             // Souvik debug
//             // console.log("resource.adtClass  " + resource.adtClass);

//             // Set visit type
//             encMap[resource.id].detailMap.Type.value = resource.contactName || resource.adtClassName;

//             if (resource.location) {
//                 // Get location name
//                 resource.location.forEach(function(loc, i) {
//                     // Verify the location has a "period" key
//                     if (resource.contactType == 3) {
//                         if (loc.period) {
//                             resource.fullLocationName = loc.location.display;
//                             // For encounters with multiple locations the application will display the last one
//                             encMap[resource.id].detailMap.Location = {
//                                 value: loc.location.display.length > 25 ? loc.location.display.substr(0, 25) + "..." : loc.location.display
//                             };
//                             resource.deptId = loc.location.reference.replace("Location/", "");
//                         }
//                         return;
//                     }
//                     resource.fullLocationName = loc.location.display;
//                     // For encounters with multiple locations the application will display the last one
//                     encMap[resource.id].detailMap.Location = {
//                                 value: loc.location.display.length > 25 ? loc.location.display.substr(0, 25) + "..." : loc.location.display
//                     };
//                     // souvik debug
//                     // console.log("In prefilter", encMap[resource.id]);
//                     resource.deptId = loc.location.reference.replace("Location/", "");
//                 });
//             } else {
//                 encMap[resource.id].detailMap.Location = {
//                     value: "Unknown"
//                 };
//             }

//             // Check for valid location, which also sets the row
//             // TODO - These two functions should be separated
//             if (!isValidLocation(resource)) {
//                 return false;
//             }

//             // Check for a valid contact type. Office visit or urgent care
//             if (resource.contactType == 3) {
//                 // Add encounter to the acute care list, which will be used to obtain
//                 // medication administration records.
//                 acuteCareList.push(resource);
//                 encMap[resource.id].detailMap.Type.value = "Urgent Care";
//                 resource._uc = true;
//                 resource.shape = chartConfig.rows[rowMap[resource.row]].legend.alt.shape;
//             } else if (resource.contactType != 101) {
//                 return false;
//             }

//             // Add location to hover details
//             resource.hoverDetails.push({
//                 key: "Location",
//                 value: resource.fullLocationName
//             });

//             // Check for valid encounter diagnosis
//             getEncDiagnosis(resource, deferred);
//         }

//         // If the code gets here, this is an encounter we are interested in
//         return true;
//     });
//     // Sorting encounter date map entries by CSN. May not be necessary anymore
//     // but possibly helpful when linking admins to encounters.
//     each(encDateMap, function(v) {
//         v.sort(function(a, b) {
//             if ( a.csn < b.csn ) {
//               return -1;
//             }
//             if ( a.csn > b.csn ) {
//               return 1;
//             }
//             return 0;
//         });
//     });
// }

// function postFilterEncounters() {
//     // Loop over encounters after additional context has been added
//     // to determine which encounters to include
//     encounters = encounters.filter(function(resource) {
//         // Check for a valid dx
//         if (!encMap[resource.id]._validDx || encMap[resource.id]._croupDx) {
//             return false;
//         }
//         if ([1, 5].indexOf(resource.adtClass) >= 0) {
//             if (!encMap[resource.id]._steroid) {
//                 return false;
//             }
//         }
//         if (resource.adtClass == 3) {
//             if (!encMap[resource.id]._steroid && !encMap[resource.id]._albuterol) {
//                 return false;
//             }
//         }
//         // Increment the counter
//         if (resource.start > counterLookback) {
//             followedBy(resource.row);
//             // Add to the global counter
//             chartConfig.rows[rowMap[resource.row]].count++;
//             // TODO - Need to define ICU visits
//             if (resource._icu || resource._uc) {
//                 chartConfig.rows[rowMap[resource.row]].legend.count++;
//             }
//         }
//         return true;
//     });
// }

// /*****************************************************
// **************** Medication Functions ****************
// ******************************************************/

// function preFilterMedications(medications, row) {
//     // Looping through medications. Not using the filter method
//     // since the data needs to be compressed based on medication type.
//     medications.forEach(function(med) {

//         // Check for failure and immediately exit to reduce computation time
//         if (chart.failure) {
//             return false;
//         }

//         if (!med.StartDate && !med.StartDateTime) {
//             return false;
//         }

//         // Ignore historical medications for now
//         if (med.OrderMode == "Outpatient" && !med.DispenseQuantity) {
//             return false;
//         }

//         // Obtain medication order date
//         var start = dateFromString(med.StartDateTime || med.StartDate);
//         var startStr = stringFromDate(start);
//         var end = dateFromString(med.EndDateTime || med.EndDate);

//         // Verify medications were written before the current time
//         if ((med.OrderMode == "Inpatient" && end && end < chartConfig.chart.dates.contextStart) ||
//             (med.OrderMode == "Outpatient" && (start > today || start < chartConfig.chart.dates.contextStart))
//         ) {
//             return;
//         }

//         // Get order ID from the resource
//         var ordId;
//         med.IDs.forEach(function(id) {
//             if (id.Type == "Internal") {
//                 ordId = id.ID;
//             }
//         });

//         // Get medication name and truncate as necessary
//         var medName = med.Name.match(truncateMedRegex);
//         medName = medName ? (medName[1].trim() || med.Name) : med.Name;
//         if (medName) {
//             medName = medName.length > 35 ? medName.substr(0, 35).trim() + "..." : medName;
//         }

//         // Create a date map, which will be used to query the "List" resource
//         // based on enconter IDs found in the encounter date map.
//         // First, check if key exists for the specified date
//         if (!medIdMap[ordId]) {
//             medIdMap[ordId] = {};
//         }

//         // Create an order ID map, which will accept the encounter ID link
//         // identified during the linking process and passed to the HealthChart
//         // visualization library
//         medIdMap[ordId].start = start;
//         medIdMap[ordId].startStr = startStr;
//         medIdMap[ordId].end = end || null;
//         medIdMap[ordId].row = row;
//         medIdMap[ordId].name = medName;
//         medIdMap[ordId].orderMode = med.OrderMode;
//         medIdMap[ordId].clinicAdmin = med.IsClinicAdministered;
//         medIdMap[ordId].hoverDetails = [
//             {
//                 key: "Date",
//                 value: startStr
//             }
//         ];

//         // Generate list to check all inpatient orders for administration
//         // during acute care visits
//         if (med.OrderMode == "Inpatient") {
//             medAdminList.push(
//                 {
//                     "ID": ordId,
//                     "Type": "Internal"
//                 }
//             );
//         }
//     });
// }

// function addMedContext() {
//     console.log("fhirMeds ",fhirMeds);
//     fhirMeds.forEach(function(v) {
//         var encId;
//         if (v.resource.encounter && v.resource.encounter.reference) {
//             encId = v.resource.encounter.reference.replace("Encounter/", "");
//         }
//         if (!encId) {
//             log("Could not locate encounter medication was ordered in: " + v.resource.id, "warn");
//             return;
//         }
//         v.resource.identifier.forEach(function(id) {
//             if (id.system.indexOf(".7.2.798268") >= 0) {
//                 if (medIdMap[id.value] && v.resource.encounter.reference) {
//                     medIdMap[id.value].encId = medIdMap[id.value].group = encId;
//                 }
//             }
//         });
//         // Check for albuterol and make a note on encounter map
//         // If the encounter does not exist in the encounter map, it's likely
//         // because it is beyond the date boundary HealthChart is interested in
//         if (encMap[encId] && v.resource.medicationReference && albuterolRegex.test(v.resource.medicationReference.display)) {
//             encMap[encId]._albuterol = true;
//         }
//     });
// }

// function linkMedAdmin() {
    
//     // Loop on medication administration map
//     each(medAdminMap, function(adminList, ordId) {
//         // Check if the medication was administered at a clinic.
//         if (medIdMap[ordId].clinicAdmin) {
//             // Loop on medAdminMap to determine if the admin
//             // datetime falls on an encounter date.
//             adminList.forEach(function(admin) {
//                 // Encounter already linked or encounter not found on admin date
//                 if (admin.group || !encDateMap[admin.dateStr]) {
//                     return;
//                 }
//                 // If there is only one encounter on that day, attribute the
//                 // administration to that encounter
//                 if (encDateMap[admin.dateStr].length == 1) {
//                     admin.group = encDateMap[admin.dateStr][0].id;
//                 } else {
//                     // Loop on encounter by date
//                     encDateMap[admin.dateStr].forEach(function(enc) {
//                         if (enc.contactType != 101) {
//                             return;
//                         }
//                         // Widen the boundary window by two hours after and 30
//                         // minutes before to account for documentation errors.
//                         var tmpEnd = new Date(enc.end);
//                         tmpEnd.setMinutes(tmpEnd.getMinutes() + 120);
//                         var tmpStart = new Date(enc.start);
//                         tmpStart.setMinutes(tmpStart.getMinutes() - 30);
//                         // Associate with the encounter if it falls within the time boundary
//                         if (admin.date >= tmpStart && admin.date < tmpEnd) {
//                             admin.group = enc.id;
//                         }
//                     });
//                 }
//             });
//         } else {
//             // Loop on medAdminMap to attribute an administration to
//             // its ordering encounter
//             // TODO - Could probably restructure this during the admin
//             // return call
//             adminList.forEach(function(admin) {
//                 // Make sure we have information about the encounter
//                 if (encMap[medIdMap[ordId].group]) {
//                     admin.group = medIdMap[ordId].group;
//                 } else {
//                     log("Could not link med administration to encounter: " + ordId, "warn");
//                 }
//             });
//         }
//     });
// }

// function buildMedVisObj() {
//     // Map to ensure we are only plotting a single mark per encounter
//     // per medication class.
//     var medMap = {
//         "Controller": {},
//         "Systemic Steroid": {},
//         "Biologic": {}
//     };

//     // Loop on admins first because they are prioritized
//     each(medAdminMap, function(med, ordId) {
//         med.forEach(function(admin) {
//             if (admin.group && medIdMap[ordId].row === "Systemic Steroid") {
//                 encMap[admin.group]._steroid = true;
//             }
//             // Check if the med has  been added to the "Asthma Meds Administered" list
//             if (encMap[admin.group] && encMap[admin.group].detailMap["Asthma Meds Administered"].value.indexOf(medIdMap[ordId].name) < 0) {
//                 encMap[admin.group].detailMap["Asthma Meds Administered"].value.push(medIdMap[ordId].name);
//             }

//             // Check if a mark already exists for the encounter/group
//             // If so, we don't want another mark for the same
//             // encounter/medication class combo
//             if (medMap[medIdMap[ordId].row][admin.group] !== undefined) {
//                 return;
//             }

//             // Flag that this encounter/medication class combo has
//             // been accounted for
//             medMap[medIdMap[ordId].row][admin.group] = true;

//             // Check if it falls within the counter range
//             if (admin.date > counterLookback) {
//                 chartConfig.rows[rowMap[medIdMap[ordId].row]].count++;
//             }

//             // Add the compressed data point to the medication array
//             var tmpObj = {
//                 "row": medIdMap[ordId].row,
//                 "group": admin.group,
//                 "hoverDetails": [
//                     {
//                         key: "Date",
//                         value: admin.dateStr
//                     }
//                 ],
//                 "start": admin.date,
//                 "shape": "square"
//             };

//             // If the administration couldn't be linked to an encouter, we
//             // need to provide basic details about the administration.
//             // This situation should be infrequent, but important
//             // to account for
//             if (!admin.group) {
//                 tmpObj.details = [
//                     {
//                         label: "Date",
//                         value: admin.dateStr
//                     },
//                     {
//                     label: "Medication",
//                         value: [medIdMap[ordId].name]
//                     }
//                 ];
//             }
//             medPlot.push(tmpObj);
//         });
//     });

//     each(medIdMap, function(med, ordId) {
//         // Ignore medicaitons classified as "inpatient" since they
//         // are handled by the admin loop.
//         // TODO - Do we care about when these were ordered? Mainly pertains
//         // to biologics
//         if (med.orderMode == "Inpatient") {
//             return;
//         }

//         if (med.group && encMap[med.group] && medIdMap[ordId].row === "Systemic Steroid") {
//             encMap[med.group]._steroid = true;
//         }

//         // Check if the med has been added to the "Asthma Meds Ordered" list
//         if (encMap[med.group] && encMap[med.group].detailMap["Asthma Meds Ordered"].value.indexOf(medIdMap[ordId].name) < 0) {
//             encMap[med.group].detailMap["Asthma Meds Ordered"].value.push(medIdMap[ordId].name);
//         }

//         // Check if a mark already exists for the encounter/group
//         // If so, we don't want another mark for the same
//         // encounter/medication class combo
//         if (medMap[medIdMap[ordId].row][med.group] !== undefined) {
//             return;
//         }

//         // Flag that this encounter/medication class combo has
//         // been accounted for
//         medMap[medIdMap[ordId].row][med.group] = true;

//         // Check if it falls within the counter range
//         if (med.start > counterLookback) {
//             chartConfig.rows[rowMap[medIdMap[ordId].row]].count++;
//         }

//         // Add the compressed data point to the medication array
//         var tmpObj = {
//             "row": medIdMap[ordId].row,
//             "group": med.group,
//             "hoverDetails": [
//                 {
//                     key: "Date",
//                     value: med.startStr
//                 }
//             ],
//             "start": med.start,
//             "shape": "circle"
//         };
//         medPlot.push(tmpObj);
//     });
// }

// /*****************************************************
// ***************** Problem Functions ******************
// ******************************************************/

// // Validates that each encounter discharge diagnosis set
// // includes asthma but not croup.
// function checkDx(dxList) {
//     var asthmaDx = false;
//     var croupDx = false;
//     dxList.forEach(function(dx) {
//         if (asthmaDxRegex.test(dx.code)) {
//             asthmaDx = true;
//         }
//         if (dx.text && croupDxRegex.test(dx.text)) {
//             croupDx = true;
//         }
//     });
//     return (asthmaDx && !croupDx);
// }

// /*****************************************************
// ***************** EHR Communication ******************
// ******************************************************/

// function visitReport(elem, data) {
//     try {
//         log(data.row + " encounter report click event.", "info");
//         executeAction({
//             action: "Epic.Clinical.Informatics.Web.LaunchActivity",
//             args: {
//                 "ActivityKey":"REPORTVIEWER",
//                 "Parameters":{
//                     "REPORTPROVIDER":"MR_REPORTS",
//                     "REPORTCONTEXT": "11^R99#,EPT," + tokenResponse.eptIdIn + "," + csnToDatMap[data._csn] + ",1"
//                 }
//             }
//         });
//     } catch (error) {
//        log(error.stack, "error");
//     }
// }

// /*****************************************************
// ********************** Utility ***********************
// ******************************************************/

// function dateFromString(dte) {
//     // If date is null, return null
//     if (!dte) {
//         return null;
//     }
//     // If a time zone exists, but is midnight, break the date into parts
//     // and remove the timezone. This date form is typically passed for
//     // on demand outpatient support encounters like telephone or messaging.
//     if (dte.indexOf("T00:00:00Z") >= 0 || dte.indexOf("T") < 0) {
//         // Split date into parts to avoid issues with time zones
//         var dateParts = dte.split("T")[0].split("-");
//         // Use date written as intial start time. Month is zero indexed.
//         return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
//     }
//     return new Date(dte);
// }

// // Implemented this since toLocaleDateString() was adding a significant
// // amount of time in the EHR
// function stringFromDate(dte) {
//     // If date is null, return null
//     if (!dte) {
//         return null;
//     }
//     // Return date in MM/DD/YYYY format
//     return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
// }

// // Create function to respond to the page width
// function resizeHealthChart(){
//     try {
//         if (!timeline) {
//             return;
//         }
//         // Need to immediately remove the timeline so the page can resize appropriately
//         timeline.remove();
//         // Adds a timeout to allow the DOM to refresh to the new size
//         setTimeout(function() {
//             windowWidth = window.innerWidth;
//             try {
//                 timeline.options.chart.width = windowWidth - windowPadding > 1200 ? 1200 : windowWidth - windowPadding;
//                 if (timeline.options.chart.width < 785) {
//                     timeline.options.chart.details.width = 0;
//                 } else if (chart.details && chart.details.width) {
//                     timeline.options.chart.details.width = chart.details.width;
//                 } else {
//                     timeline.options.chart.details.width = healthchart.defaultOptions.chart.details.width;
//                 }
//                 // Limit div to the size of the chart to eliminate EHR scroll bars
//                 jQuery("#" + chartConfig.namespace).css("width", timeline.options.chart.width);
//                 timeline.resize();
//             } catch (error) {
//                 chart.failure = true;
//                 failureSplash();
//                 log(error.stack, "error");
//             }
//         }, 500);
//     } catch (error) {
//         chart.failure = true;
//         failureSplash();
//         log(error.stack, "error");
//     }
// }


// these functions are required as it is an external file 


var logList = [];

function log(message, level){
    // Convert to a consistent environment label to determine where logs are stored
    var buildEnv = __BUILD_ENVIRONMENT__ == "production" ? "prod" : "test";

    // Set a default level if none exists
    level = level || "debug";

    // Only send "info" and higher logs for prod
    if (buildEnv == "prod" && (level != "error" & level != "warn" & level != "info")) {
        return;
    }

    // Set app name - TODO - Move somewhere else
    var APP_NAME = "healthchart-inpatient-asthma";

    // Build log message
    var data = {
        application: APP_NAME,
        environment: buildEnv,
        level: level,
    };

    // Check tokenResponse is defined
    if (tokenResponse) {
        data.patFHIRId = tokenResponse.patient;
        data.encounter = tokenResponse.encounter;
        data.csn = tokenResponse.csn;
        data.patient = tokenResponse.eptId;
        data.user = tokenResponse.userId;
    }

    // Get EHR environment
    var runtimeEnv = sessionStorage.getItem("env");
    if (runtimeEnv) {
        data.ehr = runtimeEnv;
    }

    // Conditionally add keys to log object
    if (typeof message === "object") {
        jQuery.extend(data, message);
    } else if (typeof message === "string") {
        data.msg = message;
    } else {
        return;
    }

    // Add date if not set
    if (!data.date) {
        data.date = new Date().toISOString();
    }

    // Send message to logging server
    try{
        jQuery.ajax({
            type:"POST",
            url: __LOGGING_URI__,
            data: JSON.stringify(data),
            contentType: "application/json",
            timeout:2000
        });
    } catch (error) {}
}

function logD(message, level) {
    try {
        var tmpObj = {
            message: message,
            level: level || "debug"
        };

        logList.push(tmpObj);
    } catch (error) {}
}

function flushLogs() {
    try {
        logList.forEach(function(v) {
            log(v.message, v.level);
        });

        // Reset log list
        logList = [];
    } catch (error) {}
}

export {
    log,
    logD,
    flushLogs
};

export {
    buildApp
}