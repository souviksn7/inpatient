import {
  visitApiCall,
  encAndLocSep,
  filterLocations,
  checkStatus,
  checkDate,
  createDate,
  createDetailMap,
  checkExitingResource,
  encTypeAndClass,
  linkEncDateMap,
  linkAcurateCareList,
  createGroupAndHoverDetails,
  checkAndAddAdmission,
  sortEncDateMap,
  mapCsn,
} from "../services/visitsService";

var encounters = [];
var locations = [];
var locationMap = {};
var encMap = {};
var encDateMap = {};
var csnList = [];
var csnToFhirIdMap = {};
var acuteCareList = [];
var hospitalProblemMap = [];


var visitsData = visitApiCall();

function dataSeparation() {
  return visitsData.then(function (data) {
    
    ({ encounters, locations } = encAndLocSep(encounters, locations, data.entry));
    // console.log('locations: ',locations)
    locationMap = filterLocations(locations, locationMap);
    // console.log(locationMap)
  });
}
function getEncounters(){
  
   return dataSeparation().then(function () {
    // console.log("ewejrkljelkr",encounters)
    
         encounters = encounters.filter(function (resource) {
        //  console.log("resource.id",resource.id, checkStatus(resource))
          if (!checkStatus(resource)) {
            return false;
          }
         
          var { start, startStr, end, endStr } = createDate(resource);
          if(!checkDate(start,end)){
              return false
          }
          
          if(!checkExitingResource(encMap,resource)){
              return false
          }
          
          // console.log("fix",resource)
          encMap = createDetailMap(encMap,start,end,startStr,resource)
          // const mapCsnResult = mapCsn(csnList, csnToFhirIdMap, encMap, resource);
          // ({ csnList, csnToFhirIdMap, encMap, resource } = mapCsnResult);

          //  console.log(hello)
          var result = mapCsn(csnList,csnToFhirIdMap,encMap,resource)
          csnList = result.csnList
          csnToFhirIdMap = result.csnToFhirIdMap
          encMap = result.encMap
          resource = result.resource
          resource = encTypeAndClass(resource)
          // console.log("hello")
      
          encDateMap = linkEncDateMap(encDateMap,startStr,endStr,resource)
          acuteCareList = linkAcurateCareList(acuteCareList,resource)
          resource = createGroupAndHoverDetails(startStr,resource)
          resource = checkAndAddAdmission(hospitalProblemMap,encMap,locationMap,resource)
          
          return true
        });
        encDateMap = sortEncDateMap(encDateMap)
        // console.log("insidecontroller",encounters)
        return {encounters,encMap}
      });
}


function getVisitsData(){
     return getEncounters()
}

export { getVisitsData };
