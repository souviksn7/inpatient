import jQuery from "jquery";

import { state } from "./state.js";
import chartConfig from "../conf/healthchartConfig.js";
import { log, logD } from "./logger.js";
import { tokenResponse } from "./shared.js";

// Used to extract the path and cache timestamp from the url
var urlRegex = /.*api\/(.*)/;

// Access token search function
function search(endpoint, data, method, headers) {
    try {
        method = method || "GET";

        // Build headers
        headers = headers || {};
        headers.Authorization = "Bearer " + tokenResponse.access_token;
        headers.accept = "application/json";

        // Initialize url variable
        var url;
        // Conditionally constructs endpoint based on the base URL
        if (endpoint.indexOf("chop.edu") >= 0) {
            url = endpoint;
        } else {
            url = state.baseUrl + endpoint;
        }

        // Get time object. Date.now() is more efficient, which is
        // why we attempt to get this first, but it is not available
        // in all versions of IE.
        var time = Date ? Date.now() : new Date();

        // Send request
        return jQuery.ajax({
            url: url,
            type: method,
            headers: headers,
            time: time,
            timeout: 20000,
            traditional: true,
            data: data,
            success: function(xhr) {
                // Only send metrics for Encounter and MedicationRequest requests
                if (this.url.indexOf("FHIR/R4/Encounter") === -1 && this.url.indexOf("FHIR/R4/MedicationRequest") === -1) {
                    return;
                }

                // Get time object. Date.now() is more efficient, which is
                // why we attempt to get this first, but it is not available
                // in all versions of IE.
                var endTime = Date ? Date.now() : new Date();

                // Extract path and cache timestamp from url
                var urlMatch = this.url.match(urlRegex);
                var tmpObj = {
                    "transaction.duration.ms": endTime - this.time
                };

                if (urlMatch) {
                    if (urlMatch[1]) {
                        tmpObj.path = urlMatch[1];
                    }
                }

                // Log transaction time for individual request
                // Uses logD to avoid holding up the current transactions
                logD(tmpObj, "info");
            },
            error: function(xhr, textStatus, errorThrown) {
                // Log the error here, but rely on the "then" fail function from the "when"
                // to determine if the application should fail
                log(this.type + " " + this.url + " " + xhr.status + " (" + (xhr.responseText || errorThrown) + ")", "error");
            }
        });
    } catch (error) {
        chartConfig.chart.failure = true;
        log(error.stack, "error");
    }
}

// Extract parameters from URL
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}

export {
    getUrlParameter,
    search
};