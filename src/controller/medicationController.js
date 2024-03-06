import { medicationApiCall } from "../services/medicationService";

function getMedicationData(){
    return medicationApiCall()
}

export {
    getMedicationData
}