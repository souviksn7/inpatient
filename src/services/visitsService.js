import { resolve } from "core-js/fn/promise";
import { myData } from "../data";
import each from "lodash/each";
var today = new Date();
import chartConfig from "../../conf/healthchartConfig";
var rowMap = (chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});
// here we call the api for vists
// currently we are using mock data for that
function visitApiCall() {
  var result = new Promise((resolve, reject) => {
    resolve(myData);
  });
  return result;
}

// this is used to separate location and encounter on the basis of data
function encAndLocSep(encounters, locations, data) {
    console.log("service",data)
  data.forEach(function (enc) {
    if (enc.resource.resourceType == "Encounter") {
      encounters.push(enc.resource);
    } else if (enc.resource.resourceType == "Location") {
      locations.push(enc.resource);
    }
  });
  // console.log("vists sdfkjdhsfkj", encounters)
  return {
    encounters,
    locations,
  };
}

function filterLocations(locations, locationMap) {
  locations.forEach(function (v) {
    if (v.extension) {
      v.extension.forEach(function (ext, i) {
        ext.valueCodeableConcept.coding.forEach(function (coding, j) {
          if (
            locationMap[v.id] === undefined &&
            coding.system.indexOf(".7.10.688867.4150") >= 0
          ) {
            locationMap[v.id] = {
              name: v.name,
              specialty: coding.display,
              code: coding.code,
            };
          }
        });
      });
    }
    if (v.identifier) {
      v.identifier.forEach(function (id, i) {
        if (locationMap[v.id] === undefined) {
          locationMap[v.id] = {};
        }
        if (id.system && id.system.indexOf(".7.2.686980") >= 0) {
          locationMap[v.id].internalId = id.value;
        }
      });
    }
  });

  return locationMap;
}

function checkStatus(resource) {
  
  if (resource.status == "unknown") {
    return false;
  }
  if (
    !(
      resource.status in
      { arrived: 1, finished: 1, "in-progress": 1, triaged: 1, planned: 1 }
    )
  ) {
    return false;
  }
  return true
}
// this function is used to create date that will going to plot on chart
function createDate(resource) {
  var start = (resource.start = dateFromString(resource.period.start));
  var startStr = stringFromDate(start);
  var end = (resource.end = dateFromString(resource.period.end));
  var endStr = stringFromDate(end);

  return {
    start,
    startStr,
    end,
    endStr,
  };
}

// to check whether date is valid and also if it is still active
function checkDate(start, end) {
  if (!end) {
    return false;
  }
  if (!start || start > today) {
    return false;
  }
  return true
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

// to check whether the resource is already
function checkExitingResource(encMap, resource) {
  console.log("check",encMap)
  if (encMap[resource.id]) {
    return false;
  }
  return true
}

// create details of encounter
function createDetailMap(encMap,start,end,startStr, resource) {
  encMap[resource.id] = {
    _start: start,
    _end: end,
    detailMap: {
      "Asthma Meds Ordered": {
        value: [],
      },
      "Asthma Meds Administered": {
        value: [],
      },
      Date: {
        value: startStr,
      },
      "Full Visit Report": {
        link: "kdklfjldks",
      },
      Type: {},
    },
  };

  return encMap;
}
// Obtain contact serial number (EHR encounter ID)
function mapCsn(csnList,csnToFhirIdMap,encMap,resource){
  console.log("mapcsn",encMap)
    resource.identifier.forEach(function (id, j) {
        if (id.system.indexOf(".7.3.698084.8") >= 0) {
          // Add csn to encounter object
          resource.csn = id.value;
          encMap[resource.id]._csn = resource.csn;
  
          // Add to CSN list to obtain DATs, which are used to
          // link to encounter reports
          csnList.push(resource.csn);
          // Add to CSN map to link care plan to encounter
          csnToFhirIdMap[resource.csn] = resource.id;
        }
      });
  return {csnList,csnToFhirIdMap,encMap,resource}
}

// Extract encounter type and class (if they exist)
function encTypeAndClass(resource) {
  resource.type.forEach(function (type) {
    type.coding.forEach(function (v) {
      if (v.system.indexOf(".7.10.698084.30") >= 0) {
        resource.contactType = +v.code;
        resource.contactName = v.display;
      } else if (v.system.indexOf(".7.10.698084.10110") >= 0) {
        resource.adtClass = +v.code;
        resource.adtClassName = v.display;
      }
    });
  });

  return resource;
}

function linkEncDateMap(encDateMap, startStr, endStr, resource) {
  if (resource.contactType == 101) {
    if (!encDateMap[startStr]) {
      encDateMap[startStr] = [];
    }

    encDateMap[startStr].push(resource);
    if (startStr != endStr) {
      if (!encDateMap[endStr]) {
        encDateMap[endStr] = [];
      }
      encDateMap[endStr].push(resource);
    }
  }

  return encDateMap;
}

// Add encounter to the acute care list, which will be used to obtain
// medication administration records.
function linkAcurateCareList(acuteCareList, resource) {
  if ([1, 3, 4, 5].indexOf(resource.adtClass) >= 0) {
    acuteCareList.push(resource);
  }
  return acuteCareList
}

// this function is used to create data that will used to plot point on chart
// here group will work as link between visits, medication, and others
// hoverdetails will provide the visible detail on hover
function createGroupAndHoverDetails(startStr, resource) {
  resource.group = resource.id;
  resource.hoverDetails = [
    {
      key: "Date",
      value: startStr,
    },
  ];
  return resource
}

// here we will classify which type of visit and add it to the data
function checkAndAddAdmission(encMap, resource) {
  if ([1, 5].indexOf(resource.adtClass) >= 0) {
    // Add details about the encounter to the encounter map
    encMap[resource.id].row = resource.row = "Inpatient";
    resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    encMap[resource.id].detailMap.Type.value = resource.adtClassName;

    // Add location to hover details
    resource.hoverDetails.push({
      key: "Location",
      value: resource.adtClassName,
    });
    // Check for ICU stays

    // Check for "emergency" visit
  } else if (resource.adtClass == 3) {
    // Check if this is an encounter we should plot
    //   getEncDiagnosis(resource, deferred);

    // Add details about the encounter to the encounter map
    encMap[resource.id].row = resource.row = "Emergency Only";
    resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    encMap[resource.id].detailMap.Type.value = resource.adtClassName;

    // Add location to hover details
    resource.hoverDetails.push({
      key: "Location",
      value: resource.adtClassName,
    });

    // Process all other visits
  } else {
    // Set visit type
    encMap[resource.id].detailMap.Type.value =
      resource.contactName || resource.adtClassName;

    if (resource.location) {
      // Get location name
      resource.location.forEach(function (loc, i) {
        // Verify the location has a "period" key
        if (resource.contactType == 3) {
          if (loc.period) {
            resource.fullLocationName = loc.location.display;
            // For encounters with multiple locations the application will display the last one
            encMap[resource.id].detailMap.Location = {
              value:
                loc.location.display.length > 25
                  ? loc.location.display.substr(0, 25) + "..."
                  : loc.location.display,
            };
            resource.deptId = loc.location.reference.replace("Location/", "");
          }
          return;
        }
        resource.fullLocationName = loc.location.display;
        // For encounters with multiple locations the application will display the last one
        encMap[resource.id].detailMap.Location = {
          value:
            loc.location.display.length > 25
              ? loc.location.display.substr(0, 25) + "..."
              : loc.location.display,
        };
        resource.deptId = loc.location.reference.replace("Location/", "");
      });
    } else {
      encMap[resource.id].detailMap.Location = {
        value: "Unknown",
      };
    }
    if (resource.adtClass == 4) {
      encMap[resource.id].row = resource.row = "Allergy";
      resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    }
    if (resource.adtClass == 82) {
      encMap[resource.id].row = resource.row = "Primary Care";
      resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    }
    if (resource.adtClass == 105) {
      encMap[resource.id].row = resource.row = "Emergency Only";
      resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    }
    if (resource.adtClass == 110) {
      encMap[resource.id].row = resource.row = "Pulmonary";
      resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    }
  }

  return resource
}

// Sorting encounter date map entries by CSN. May not be necessary anymore
// but possibly helpful when linking admins to encounters.
function sortEncDateMap(encDateMap) {
  each(encDateMap, function (v) {
    v.sort(function (a, b) {
      if (a.csn < b.csn) {
        return -1;
      }
      if (a.csn > b.csn) {
        return 1;
      }
      return 0;
    });
  });
  return encDateMap;
}

function stringFromDate(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // Return date in MM/DD/YYYY format
  return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
}
export {
  visitApiCall,
  encAndLocSep,
  filterLocations,
  checkStatus,
  createDate,
  createDetailMap,
  checkDate,
  checkExitingResource,
  encTypeAndClass,
  linkEncDateMap,
  linkAcurateCareList,
  createGroupAndHoverDetails,
  checkAndAddAdmission,
  sortEncDateMap,
  mapCsn
};
