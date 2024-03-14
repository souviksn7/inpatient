import {
  getMedicationOrders,
  medicationApiCall,
  createDate,
  medicaitonsRequestApiCall,
} from "../services/medicationService";
var today = new Date();
var truncateMedRegex = /^([^\d]*)\d+/;
var medIdMap = {};
var medAdminList = [];
var fhirMeds = [];
import chartConfig from "../../conf/healthchartConfig";
var rowMap = (chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});

var data = medicationApiCall();
function getMedicationData() {
  return data.then(function (meds) {
    if (!meds.MedicationOrders) {
      meds.MedicationOrders = [];
    }
    var len = meds.MedicationOrders.length;
    var divided = Math.floor(len / 3);
    //   console.log(divided)
    let count = 0;
    chartConfig.grouper.forEach(function (grouper) {
      // console.log("grouper",grouper)
      // console.log("hello i am in chartconfig")
      //   console.log("medIdMap", medIdMap)
      if (count <= len) {
        var medications = meds.MedicationOrders.slice(count, count + divided);
        // console.log(medications)
        medications.forEach(function (med) {
          if (!med.StartDate && !med.StartDateTime) {
            return false;
          }
          if (med.OrderMode == "Outpatient" && !med.DispenseQuantity) {
            return false;
          }
          var { start, startStr, end, endStr } = createDate(med);
          //   console.log("hello here we start",start)

          if (
            (med.OrderMode == "Inpatient" &&
              end &&
              end < chartConfig.chart.dates.contextStart) ||
            (med.OrderMode == "Outpatient" &&
              (start > today || start < chartConfig.chart.dates.contextStart))
          ) {
            return;
          }

          var ordId;
          med.IDs.forEach(function (id) {
            if (id.Type == "Internal") {
              ordId = id.ID;
            }
          });
          // Get medication name and truncate as necessary
          var medName = med.Name.match(truncateMedRegex);
          medName = medName ? medName[1].trim() || med.Name : med.Name;
          if (medName) {
            medName =
              medName.length > 35
                ? medName.substr(0, 35).trim() + "..."
                : medName;
          }

          if (!medIdMap[ordId]) {
            medIdMap[ordId] = {};
          }

          medIdMap[ordId].start = start;
          medIdMap[ordId].startStr = startStr;
          medIdMap[ordId].end = end || null;
          medIdMap[ordId].row = grouper.row;
          medIdMap[ordId].name = medName;
          medIdMap[ordId].orderMode = med.OrderMode;
          medIdMap[ordId].clinicAdmin = med.IsClinicAdministered;
          medIdMap[ordId].hoverDetails = [
            {
              key: "Date",
              value: startStr,
            },
          ];
          if (med.OrderMode == "Inpatient") {
            medAdminList.push({
              ID: ordId,
              Type: "Internal",
            });
          }
        });

        count = count + divided;
      }
    });

    console.log(medAdminList);

    return meds;
  });
}

function getFhirMeds() {
  return getMedicationData().then(function () {
    medicaitonsRequestApiCall().then(function (data) {
      // console.log("fhirmeds data: ", data)
      if (meds.total === 0 || !meds.entry) {
        meds.entry = [];
      }
      // TODO - May want to consider adding a map to see if the a previous request
      // returned this medication.
      fhirMeds.push.apply(fhirMeds, meds.entry);
    });
  });
}

function addMedContext(){
    
}

export { getFhirMeds };
