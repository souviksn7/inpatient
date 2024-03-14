import { medicationData } from "../medicationData";
import { medicationRequestData } from "../medicationRequestData";
import chartConfig from "../../conf/healthchartConfig";
var rowMap = (chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});

function medicationApiCall() {
  return new Promise(function (resolve, reject) {
    resolve(medicationData);
  });
}


function medicaitonsRequestApiCall(){
  return new Promise(function (resolve, reject) {
    resolve(medicationRequestData);
  });
}

function getMedicationOrders(meds) {
  console.log(meds);
}

function createDate(med) {
  var start = dateFromString(med.StartDateTime || med.StartDate);
  var startStr = stringFromDate(start);
  var end = dateFromString(med.EndDateTime || med.EndDate);

  return {
    start,
    startStr,
    end,
  };
}

function stringFromDate(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // Return date in MM/DD/YYYY format
  return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
}

function dateFromString(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // If a time zone exists, but is midnight, break the date into parts
  // and remove the timezone. This date form is typically passed for
  // on demand outpatient support encounters like telephone or messaging.
  if (dte.indexOf("T00:00:00Z") >= 0 || dte.indexOf("T") < 0) {
    // Split date into parts to avoid issues with time zones
    var dateParts = dte.split("T")[0].split("-");
    // Use date written as intial start time. Month is zero indexed.
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }
  return new Date(dte);
}

export { medicationApiCall, getMedicationOrders, createDate, medicaitonsRequestApiCall };
