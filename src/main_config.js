import { data } from "jquery";

var main_config = {
  // thinking of using all the variable that are used to store data are defined in the
  //config file so that it will be confortable to share data between files
  // fhirMeds: [],
  function: [
    {
      name: "splitFhirRequest",
      params: [
        3,
        today - chart.dates.contextStart,
        callBack,
        [
          {
            condition: function (meds, state, xhr) {
              return xhr.status != 200;
            },
            execute: function (meds, state, xhr) {
              ref.failure = true;
              log(this.type + " " + this.url + " " + xhr.status, "error");
              return null;
            },
          },
          {
            condition: function (meds, state, xhr) {
              return (
                meds.entry && meds.entry[meds.entry.length - 1].resource.issue
              );
            },
            execute: function (meds, state, xhr) {
              log(
                this.type + " " + this.url + " 409 (Malformed Response)",
                "warn"
              );
            },
          },
          {
            condition: function (meds, state, xhr) {
              meds.total === 0 || !meds.entry;
            },
            execute: function (meds, state, xhr) {
              meds.entry = [];
              return meds;
            },
          },
          {
            condition: true,
            external: {
              name: "fhirMedCallback",
              params: [data],
            },
          },
        ],
        "FHIR/R4/MedicationRequest",
        { patient: tokenResponse.patient },
      ],
    },
    {
      name: "search",
      params: [
        "FHIR/R4/List",
        { code: "hospital-problems", patient: tokenResponse.patient },
      ],
      callback: "callBack",
      callbackConditions: [
        {
          condition: function (bundle, state, xhr) {
            return !bundle.entry;
          },
          execute: function (bundle, state, xhr) {
            return null;
          },
        },
        {
          condition: true,

          external: {
            name: "executeLoop",
            params: [
              data.entry,
              state,
              xhr,
              callBack,
              [
                {
                  condition: function (list, state, xhr) {
                    return !list.resource || !list.resource.entry;
                  },
                  execute: function (list, state, xhr) {
                    return null;
                  },
                },
                {
                  condition: true,
                  execute: function (list, state, xhr) {
                    list.encID = list.resource.encounter.reference.replace(
                      "Encounter/",
                      ""
                    );
                    return list;
                  },
                },
                {
                  condition: true,
                  external: {
                    name: "setEncId",
                    params: [data.encId],
                  },
                },
                {
                  condition: true,
                  external: {
                    name: "executeLoop",
                    params: [
                      data.resource.entry,
                      state,
                      xhr,
                      callBack,
                      [
                        {
                          condition: true,
                          external: {
                            name: "hospitalCallback",
                            params: [problem, state, xhr],
                          },
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          },
        },
      ],
    },
    {
      name: "splitFhirRequest",
      params: [
        3,
        today - chart.dates.contextStart,
        callBack,
        [
          {
            condition: function (enc, state, xhr) {
              return xhr.status != 200;
            },
            execute: function (enc, state, xhr) {
              ref.failure = true;
              log(this.type + " " + this.url + " " + xhr.status, "error");
              return null;
            },
          },
          {
            condition: function (enc, state, xhr) {
              return (
                enc.entry && enc.entry[enc.entry.length - 1].resource.issue
              );
            },
            execute: function (enc, state, xhr) {
              log(
                this.type + " " + this.url + " 409 (Malformed Response)",
                "warn"
              );
            },
          },
          {
            condition: true,
            external: {
              name: "executeLoop",
              params: [data.entry,
                state,
                xhr, 
                callBack, 
                [
                  {
                    condition:function(enc,state,xhr){
                      return enc.resource.resourceType == "Encounter"
                    },
                    external:{
                      name:'encounterPush',
                      params:[data.resource]
                    }
                  },
                  {
                    condition:function(enc,state,xhr){
                      return enc.resource.resourceType == "Location"
                    },
                    external:{
                      name:'locationPush',
                      params:[data.resource]
                    }
                  },

                ]
              ],
            },
          },
        ],
        "FHIR/R4/Encounter",
        { patient: tokenResponse.patient, _include: "Encounter:Location" },
      ],
    },

    // this api call depend upon ecounter and hospital-problem api
    // here refrence comes from hospital-problem api and encounter api which is
    //refrence to hospital-problem for a particular encounter

    {
      name: "search",
      params: ["FHIR/R4/" + reference],
      callback: function (condition, state, xhr) {
        try {
          // Add response to list reference...
          // (existing callback logic)
        } catch (error) {
          chart.failure = true;
          log(error.stack, "error");
        }
      },
      depends_on: true,
    },
    // this api depends on enncounter api
    // here we call for Inpatient and Observation
    {
      name: "search",
      params: [
        "FHIR/R4/Condition",
        {
          patient: tokenResponse.patient,
          category: "encounter-diagnosis",
          encounter: resource.id,
        },
      ],
      callback: function (encDx, state, xhr) {
        try {
          // Add response to list reference...
          // (existing callback logic)
        } catch (error) {
          chart.failure = true;
          log(error.stack, "error");
        }
      },
      depends_on: true,
    },
    // this api depends on enncounter api
    // here we call for Emergency Only
    {
      name: "search",
      params: [
        "FHIR/R4/Condition",
        {
          patient: tokenResponse.patient,
          category: "encounter-diagnosis",
          encounter: resource.id,
        },
      ],
      callback: function (encDx, state, xhr) {
        try {
          // Add response to list reference...
          // (existing callback logic)
        } catch (error) {
          chart.failure = true;
          log(error.stack, "error");
        }
      },
      depends_on: true,
    },
    // this api depends on enncounter api
    // here we call for all other visits
    {
      name: "search",
      params: [
        "FHIR/R4/Condition",
        {
          patient: tokenResponse.patient,
          category: "encounter-diagnosis",
          encounter: resource.id,
        },
      ],
      callback: function (encDx, state, xhr) {
        try {
          // Add response to list reference...
          // (existing callback logic)
        } catch (error) {
          chart.failure = true;
          log(error.stack, "error");
        }
      },
      depends_on: true,
    },
  ], // thinking of using all the variable that are used to store data are defined in the
  //config file so that it will be confortable to share data between files
  // fhirMeds: [],
};

export default main_config;
