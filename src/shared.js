// Date references
var today = new Date();

// Variables to build a map from CSN to other encounter IDs (e.g. FHIR and DAT)
var csnToFhirIdMap = {};
var csnList = [];

// Set token response variable
var tokenResponse;

// Method to set token response variable
function setTokenResponse(v) {
    tokenResponse = v;
}

export {
    csnList,
    csnToFhirIdMap,
    setTokenResponse,
    today,
    tokenResponse
};