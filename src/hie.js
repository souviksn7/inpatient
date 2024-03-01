import { search } from "./http.js";
import chartConfig from "../conf/healthchartConfig.js";
import { log } from "./logger.js";
import { today, tokenResponse } from "./shared.js";
import customHosts from "./customHosts.js";
import { followedBy } from "./note.js";

// Initialize external encounter variable
var extEncounters = [];

function getExternalEncounters() {
    return search(customHosts[sessionStorage.getItem("env")] + "CHOP/2021/CHOP/Clinical/EncounterReference", {
        patientID: tokenResponse.eptId,
        date: "gt" + chartConfig.chart.dates.contextStart.toISOString().slice(0,10)
    }).then(function(encounters, state, xhr) {
        try {
            if (xhr.status != 200) {
                ref.failure = true;
                log(this.type + " " + this.url + " " + xhr.status, "error");
                return;
            }
            encounters.entry = encounters.entry || [];
            extEncounters.push.apply(extEncounters, encounters.entry);
        } catch (error) {
            chartConfig.chart.failure = true;
            log(error.stack, "error");
        }
    });
}

function checkExternalDx(dx) {
    if (dx.toLowerCase().indexOf("asthma") >= 0) {
        return true;
    } else {
        return false;
    }
}

function filterExternalEncounters() {
    extEncounters.filter(function(entry, i) {
        var start = new Date(entry.effectiveTime.low);
        if (start < today && checkExternalDx(entry.description)) {
            // Check for inpatient visits
            if (entry.class == "Inpatient Encounter" && entry.type == "Hospital Encounter") {
                entry.row = "Inpatient";
             // Check for ED visits
            } else if (
                (entry.class == "Emergency" && (entry.type == "Hospital Encounter" || entry.type == "Emergency")) ||
                (entry.class == "Inpatient Encounter" && entry.type == "Emergency")
            ) {
                entry.type = "Emergency";
                entry.row = "Emergency Only";
            // Check for Urgent Care visits
            } else if (entry.class == "Ambulatory" && entry.specialty == "Urgent Care" &&
                    (entry.type == "Hospital Encounter" || entry.type == "Office Visit")
            ) {
                entry.type = "Urgent Care";
                entry.row = "Emergency Only";
                // Modify shape based on legend specified in the initial configuration
                entry.shape = chartConfig.rows[chartConfig.rowMap[entry.row]].legend.alt.shape;
                chartConfig.rows[chartConfig.rowMap[entry.row]].legend.count++;
            // Check for office visits
            } else if (entry.class == "Ambulatory" && entry.type == "Office Visit") {
                if (entry.specialty.toLowerCase().indexOf("allergy") !== -1) {
                    entry.row = "Allergy";
                } else if (entry.specialty.toLowerCase().indexOf("pulmonary") !== -1) {
                    entry.row = "Pulmonary";
                } else if (
                    entry.specialty.toLowerCase().indexOf("family medicine") >= 0 ||
                    entry.specialty.toLowerCase().indexOf("general pediatrics") >= 0
                ) {
                    entry.row = "Primary Care";
                } else {
                    return false;
                }
            } else {
                return false;
            }
            // Build HealthChart object
            var encObj = {
                group: entry.id,
                start: start,
                row: entry.row,
                shape: entry.shape || "circle",
                details: [
                    {
                        label: "Outside Organization",
                        highlight: true
                    },
                    {
                        label: "Date",
                        value: start.toLocaleDateString()
                    },
                    {
                        label: "Type",
                        value: entry.type
                    },
                    {
                        label: "Organization",
                        value: entry.org.length > 20 ? entry.org.substr(0, 20) + "..." : entry.org
                    },
                    {
                        label: "Location",
                        value: entry.location.length > 20 ? entry.location.substr(0, 20) + "..." : entry.location
                    }
                ],
                hoverDetails: [
                    {
                        key: "Date",
                        value: start.toLocaleDateString()
                    },
                    {
                        key: "Type",
                        value: entry.type
                    },
                    {
                        key: "Organization",
                        value: entry.org
                    }
                ]
            };

            // Add data to HealthChart config
            chartConfig.rows[chartConfig.rowMap[entry.row]].data.push(encObj);

            // Check if the visit is within the lookback window
            if (start > chartConfig.chart.dates.line) {
                followedBy(entry.row);
                chartConfig.rows[chartConfig.rowMap[entry.row]].count++;
            }
        }
    });
}

export {
    getExternalEncounters,
    filterExternalEncounters
};