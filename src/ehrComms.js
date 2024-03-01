// Obtain EHR token
var ehrToken;

// Function to set the value of the EHR token
function setEHRToken(v) {
    ehrToken = v;
}

// Initialize action queue - required to ensure synchronous behavior
var actionQueue = [];

// Boolean to deteremine if an action is in process
var awaitingAction;

// Initialize callback function object
var cbFns;

// Initialize logging placeholder
var logger;

function addEHRListener(cbObj) {
    // Init values
    cbFns = cbObj || {};

    // Sets log function
    logger = cbObj.logFn;

    // Add event listener
    window.addEventListener("message", ehrListener, false);
}

// Intializes EHR handshake to obtain token and other context
function ehrHandshake(subscriptions) {
    // Init values
    subscriptions = subscriptions || [];

    // Set a flag that we are waiting for an action to return
    awaitingAction = true;

    // Request the initial handshake
    window.parent.postMessage({
        action: "Epic.Clinical.Informatics.Web.InitiateHandshake",
        args:{
            "SubscriptionRequests": subscriptions
        }
    }, "*");
}

function validateApp(event) {
    var validApp = false;
    if (event.data && event.data.subscriptionResults) {
        event.data.subscriptionResults.forEach(function(v) {
            if (v.EventName == "Epic.Clinical.healthChartIpAsthma") {
                validApp = true;
            }
        });
    }
    return validApp;
}

// Establishing event listener for communication with EHR
function ehrListener(event) {
    try {
        for (var type in event.data) {
            var payload = event.data[type];
            switch (type) {
                case "token":
                    if (validateApp(event)) {
                        // Store EHR token
                        ehrToken = payload;
                    }
                    break;
                case "error":
                    // This will capture failures from other applications
                    // TODO - Need additional development from host system
                    // to avoid polluting the message space
                    logger(JSON.stringify(payload), "error");
                    break;
                case "actionExecuted":
                    awaitingAction = false;
                    break;
                case "errorCodes":
                    // Payload is an array of all errors which might have been encountered
                    // TODO - May be helpful in the future, but not in use now
                    break;
                case "EventName":
                    // TODO - Add a switch statement to capture the different actions
                    // Need to add the diagnosis updates
                    if (payload == "Epic.Common.RequestToCloseApp") {
                        if (typeof cbFns.closeCB === "function") {
                            cbFns.closeCB();
                        }
                    }
                    break;
            }
        }

        // Check if this is the intial handshake event
        if (event.data && event.data.token && validateApp(event)) {
            if (typeof cbFns.openCB === "function") {
                cbFns.openCB(event.data);
            }
        }

        // Check if events exist in the queue
        if (actionQueue.length > 0) {
            executeAction();
        }
    } catch (error) {
       logger(error.stack, "error");
    }
}

// Proxy function to send EHR messages
function executeAction(data) {
    if (!awaitingAction) {
        if (data === undefined) {
            data = actionQueue.shift();
        }
        awaitingAction = true;
        data.token = ehrToken;
        window.parent.postMessage(data, "*");
    } else {
        if (data === undefined) {
            return;
        }
        actionQueue.push(data);
    }
}

export {
    addEHRListener,
    ehrHandshake,
    ehrToken,
    executeAction,
    setEHRToken
};