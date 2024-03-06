import { medicationData } from "../medicationData";

function medicationApiCall() {
  return new Promise(function (resolve, reject) {
    resolve(medicationData);
  });
}


function getMedicationOrders(meds){

      if (!meds.MedicationOrders) {
            meds.MedicationOrders = [];
          }
          return meds
}


export {
    medicationApiCall,
    getMedicationOrders
}