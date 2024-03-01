import jQuery from 'jquery';

import { log } from "./logger.js";
import { setTokenResponse, tokenResponse } from "./shared.js";
import chartConfig from "../conf/healthchartConfig.js";
import { failureSplash } from "./error.js";
import { executeAction } from "./ehrComms.js";
import { getAndSetState, state, stateKey, setStateKey, saveSessionState } from "./state.js";
import { getUrlParameter } from "./http.js";

// Used to remove encoded spaces in EHR provided
// variables within the token response
var plusRegex = /\+/g;

// Get first set of data
function getAccessToken() {
    try {
        // Extract code from query parameter
        var code = getUrlParameter("code");

        // Set base URL
        state.baseUrl = state.serverUrl.replace('FHIR/R4', '');

        // Configure request body. AJAX library will encode so no need
        // to do it here.
        var data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": state.redirectUri,
            "client_id": state.clientId
        };

        // Build request
        var deferreds = [
            jQuery.ajax({
                url: state.tokenUri,
                type: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                timeout: 2000,
                data: data,
                success: function(xhr, b, c) {
                    try {
                        // Store response to tokenResponse variable
                        setTokenResponse(xhr);

                        if(!!tokenResponse.eptId){
                            tokenResponse.eptIdIn = tokenResponse.eptId.replace(plusRegex, " ");
                            tokenResponse.eptId = tokenResponse.eptId.replace(plusRegex, "");
                        }
                        if(!!tokenResponse.userId){
                            tokenResponse.userId = tokenResponse.userId.replace(plusRegex, "");
                        }
                        // Adjust token values to remove encoded spaces
                        //taposh comment
                        // tokenResponse.eptIdIn = tokenResponse.eptId.replace(plusRegex, " ");
                        // tokenResponse.eptId = tokenResponse.eptId.replace(plusRegex, "");
                        
                        //taposh comment

                        // tokenResponse.userId = tokenResponse.userId.replace(plusRegex, "");

                        // Store the token response information in session storage
                        state.tokenResponse = tokenResponse;

                        // Save updated state in session storage
                        saveSessionState(stateKey, state);
                    } catch (error) {
                        chartConfig.chart.failure = true;
                        failureSplash();
                        log(error.stack, "error");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    // Log the error here, but rely on the "then" fail function from the "when"
                    // to determine if the application should fail
                    log(this.type + " " + this.url + " " + xhr.status + " (" + (xhr.responseText || errorThrown) + ")", "error");
                }
            })
        ];
        return jQuery.when.apply(jQuery, deferreds);
    } catch (error) {
        chartConfig.chart.failure = true;
        failureSplash();
        log(error.stack, "error");
    }
}

export {
    getAccessToken
};