import jQuery from "jquery";
import each from "lodash/each";

import chartConfig from "../conf/healthchartConfig.js";
import { executeAction } from "./ehrComms.js";
import { search } from "./http.js";
import { log } from "./logger.js";
import { tokenResponse } from "./shared.js";
import customHosts from "./customHosts.js";

var actMap = {};

var actLookback = 425;

// Used to extract asthma control from Care Assistant based control tool SDE
var asthmaControlRegex = /.*ACTSUMMARY.*symptoms\sare\s\{\\b\s([A-Z\s]*)\}/;

function getControlTool() {
    // Reset actMap to pull latest values
    actMap = {};
    var deferreds = [];
    ["MEDCIN#122305", "CHOPCN#353", "CHOPCN#354", "CHOPCN#355", "CHOPCN#356"].forEach(function(element) {
        deferreds.push(
            search(customHosts[sessionStorage.getItem("env")] + "CHOP/2015/CHOP/Clinical/GetSmartDataElement", {
                patientID: tokenResponse.eptId,
                csn: tokenResponse.csn,
                lookback: actLookback,
                sde: element
            }).then(function(act, state, xhr) {
                try {
                    if (xhr.status != 200) {
                        chartConfig.chart.failure = true;
                        log(this.type + " " + this.url + " " + xhr.status, "error");
                        return;
                    }
                    act.entry = act.entry || [];
                    // Create a map of the SDEs using encounter ID as the key.
                    // Need to include the date to ensure it can be appropriately sorted
                    // to present the latest filing of the information.
                    act.entry.forEach(function(v) {
                        if (!v.value) {
                            return;
                        }
                        if (!actMap[v.encounter.identifier]) {
                            actMap[v.encounter.identifier] = {
                                date: new Date(v.date),
                                id: v.encounter.identifier
                            };
                        }
                        if (element.indexOf("CHOPCN") >= 0) {
                            if (!actMap[v.encounter.identifier].qnr) {
                                actMap[v.encounter.identifier].qnr = [];
                            }
                            actMap[v.encounter.identifier].qnr.push(v.value);
                        }
                        actMap[v.encounter.identifier][element] = v.value;
                    });
                } catch (error) {
                    chartConfig.chart.failure = true;
                    log(error.stack, "error");
                }
            })
        );
    });
    return deferreds;
}

function getLastFileDate() {
    // Get latest asthma control assessment (if filed)
    var latestAct;
    each(actMap, function(v){
        if (!latestAct) {
            latestAct = v;
        } else {
            if (v.date > latestAct.date) {
                latestAct = v;
            }
        }
    });

    // Define control based on asthma control tool assessment
    // Default to "Not on file..." if not found
    var actControl = "Not on file in last 14 months";
    if (latestAct) {
        if (latestAct.qnr) {
            var max = Math.max.apply(null, latestAct.qnr);
            if (max == 1) {
                actControl = "Well Controlled";
            } else if (max == 2) {
                actControl = "Poorly Controlled";
            } else if (max == 3) {
                actControl = "Uncontrolled";
            }
            actControl += " (" + latestAct.date.toLocaleDateString() + ")";
        } else if (latestAct["MEDCIN#122305"]) {
            var actMatch = latestAct["MEDCIN#122305"].match(asthmaControlRegex);
            actControl = actMatch && actMatch[1] ? actMatch[1] : actControl;
            if (actControl != "Not on file in last 14 months") {
                actControl = actControl.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                actControl += " (" + latestAct.date.toLocaleDateString() + ")";
            }
        }
    }

    // Need to loop through to make sure that we are updating the correct object
    // since the values in the "Resources" section may change based on the context of the EHR.
    chartConfig.chart.resources.resources.forEach(function(obj) {
        if (obj.label == "Control Tool") {
            obj.value = actControl;
            if (actControl == "Not on file in last 14 months") {
                obj.valueLink = function(){
                    log("Navigate to Asthma Control Tool SmartForm", "info");
                    executeAction({
                        action: "Epic.Clinical.Informatics.Web.LaunchActivity",
                        args: {
                            PatientID: tokenResponse.patient,
                            ActivityKey: "ASTHMA_CONTROL_TOOL_SMARTFORM"
                        }
                    });
                };
            }
        }
    });
}

export {
    actMap,
    getControlTool,
    getLastFileDate
};