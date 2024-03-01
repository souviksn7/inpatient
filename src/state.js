var state;

function replaceState(v) {
    state = v;
}

function getSessionState(key) {
    return sessionStorage.getItem(key);
}

function saveSessionState(key, v) {
    if (typeof v === "object") {
        v = JSON.stringify(v);
    }
    sessionStorage.setItem(key, v);
}

function getAndSetState(key) {
    replaceState(JSON.parse(getSessionState(key)));
}

// Initialize state key variable
var stateKey;

// Method to set state key variable
function setStateKey(v) {
    stateKey = v;
}

export {
    stateKey,
    setStateKey,
    state,
    getAndSetState,
    saveSessionState,
    replaceState
};