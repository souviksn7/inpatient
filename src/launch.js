import jQuery from 'jquery';

// Required polyfill until fully moved to modern browsers
import find from 'core-js/features/array/find';

import { addEHRListener, ehrHandshake, ehrToken, executeAction } from "./ehrComms.js";
import { log } from "./logger.js";
import randomString from "./random.js";
import { getUrlParameter } from "./http.js";
import { getAndSetState, setStateKey, state } from "./state.js";
import issMap from "../conf/issMap.js";

// EHR message handshake callback to determine if the app already
// exists on the page
function openCB(resp) {
    try {
        // Check if a previous state exists meaning
        // the app already loaded and may have already authorized
        if (resp.state) {
            // Set state key with value passed from EHR response
            setStateKey(resp.state);

            // Retrieve previous state
            getAndSetState(resp.state);

            // If the redirect URI was not set in session storage the
            // auth call never returned so try again. It's possible this
            // will fail if the page was interrupted while the call was outstanding
            if (state && state.redirectUri) {
                window.location.href = state.redirectUri;
            }
        }

        // Get "iss" and "launch" params
        var iss = getUrlParameter("iss");
        var launch = getUrlParameter("launch");

        if (!iss) {
            log("Failed to obtain iss parameter", "error");
            return;
        }

        if (!launch) {
            log("Failed to obtain launch parameter", "error");
            return;
        }

        // Create anchor tag to easily parse the ISS parameter
        var urlParser = document.createElement('a');
        urlParser.href = iss;

        // Set ehr environment
        sessionStorage.setItem("env", urlParser.hostname + "/" + urlParser.pathname.split("/").find(function(v) {
            return v;
        }));

        var redirectUri;
        // Set redirect URI based on runtime environment
        if (urlParser.hostname && issMap[urlParser.hostname]) {
            redirectUri = issMap[urlParser.hostname].redirectUri;
            console.log(redirectUri)
        }

        if (!redirectUri) {
            log("Failed to obtain redirect URI for " + iss, "error");
            return;
        }

        // Set client ID based on build environment
        var clientId = __CLIENT_ID__;

        // Initialize variable to store returned config
        var smartConfig;

        // Build well-known config URL
        var configURI = iss + "/.well-known/smart-configuration";

        // Obtain authorize and token URLs and save to storage
        jQuery.when(jQuery.ajax({
                url: configURI,
                cache: false,
                timeout: 2000,
                success: function(resp) {
                    // Store smartConfig for reuse
                    smartConfig = resp;
                },
                error: function(xhr, textStatus, errorThrown) {
                    // Log the error here, but rely on the deferred to determine if the application should fail
                    log(this.type + " " + this.url + " " + xhr.status + " (" + (xhr.responseText || errorThrown) + ")", "error");
                }
            })
        ).then(function() {
            try {
                // Build state key
                var stateKey = randomString(16);

                // Store the state key on the "EHR session"
                executeAction({
                    action: "Epic.Clinical.Informatics.Web.SaveState",
                    args: stateKey
                });

                // Build state object
                var state = {
                    clientId: clientId,
                    ehrToken: ehrToken,
                    redirectUri: redirectUri,
                    serverUrl: iss,
                    key: stateKey,
                    authorizeUri: smartConfig.authorization_endpoint,
                    tokenUri: smartConfig.token_endpoint
                };

                // Store state in session storage
                sessionStorage.setItem(stateKey, JSON.stringify(state));

                if (launch) {
                    // Build remaining portions of redirect uri
                    var redirectParams = [
                        "response_type=code",
                        "client_id="    + encodeURIComponent(clientId || ""),
                        "scope="        + encodeURIComponent("launch"), // Need to define this further, but may not matter
                        "redirect_uri=" + encodeURIComponent(redirectUri),
                        "aud="          + encodeURIComponent(iss),
                        "state="        + encodeURIComponent(stateKey),
                        "launch="       + encodeURIComponent(launch)
                    ];

                    // Build redirect URL
                    var redirectUrl = state.authorizeUri + "?" + redirectParams.join("&");
                    // Redirect to authorize URL
                    window.location.href =  redirectUrl;
                }
            } catch (error) {
               log(error.stack, "error");
            }
        });
    } catch (error) {
       log(error.stack, "error");
    }
}

try {
    // Initialize callbacks
    var callbacks = {
        openCB: openCB,
        logFn: log
    };

    // Add event listener
    addEHRListener(callbacks);

    // Initialize subscriptions
    var subscriptions = [
        {
            "EventName": "Epic.Common.RequestToCloseApp",
            "EventArgs": {
                "PauseDuration":"100"
            }
        },
        {
            "EventName": "Epic.Clinical.healthChartIpAsthma"
        }
    ];

    // Initiate EHR communication

    //taposh comment
    // ehrHandshake(subscriptions);
    openCB({});

} catch (error) {
   log(error.stack, "error");
}