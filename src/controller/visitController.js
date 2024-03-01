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


var visitsData = visitApiCall();

function dataSeparation() {
  return visitsData.then(function (data) {
    
    ({ encounters, locations } = encAndLocSep(encounters, locations, data.entry));

    locationMap = filterLocations(locations, locationMap);
  });
}
function getEncounters(){
  
   return dataSeparation().then(function () {
    // console.log("ewejrkljelkr",encounters)
  
         encounters = encounters.filter(function (resource) {
         console.log("resource.id",resource.id, checkStatus(resource))
          if (!checkStatus(resource)) {
            return false;
          }
          console.log("hiiiii",resource)
          var { start, startStr, end, endStr } = createDate(resource);
          if(!checkDate(start,end)){
              return false
          }
          var encMap={}
          if(!checkExitingResource(encMap,resource)){
              return false
          }

          // console.log("fix",resource)
          encMap = createDetailMap(encMap,start,end,startStr,resource)
          var csnList = [];
          var csnToFhirIdMap = {};
         
          var {csnList,csnToFhirIdMap,encMap,resource}= mapCsn(csnList,csnToFhirIdMap,encMap,resource)
          resource = encTypeAndClass(resource)
      
          encDateMap = linkEncDateMap(encDateMap,startStr,endStr,resource)
          // acuteCareList = linkAcurateCareList(acuteCareList,resource)
          resource = createGroupAndHoverDetails(startStr,resource)
          resource = checkAndAddAdmission(encMap,resource)
          
          return true
        });
        encDateMap = sortEncDateMap(encDateMap)
        console.log("insidecontroller",encounters)
        return encounters
      });
}


function getVisitsData(){
     return getEncounters()
}

export { getVisitsData };
