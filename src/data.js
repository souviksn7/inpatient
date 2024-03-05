// export const data =
  
  

export const visitsData = {
    "resourceType": "Bundle",
    "type": "searchset",
    "total": 47,
    "link": [
        {
            "relation": "self",
            "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter?patient=ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3&date=gt2018-06-15"
        }
    ],
    "entry": [
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Location",
                "id": "44319901",
                extension:[{
                    valueCodeableConcept:{
        coding:[
            {
                system:".7.10.688867.4150",
                code:"82"
            }
        ]
                    }
                }
                
                ],
                identifier:[
                   {
                    system:".7.2.686980",
                    value:"sjdfkjdshf"
                   }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Encounter",
                "id": "etPlPSTi-Ck8pFW0vJgBM6A3",
                "identifier": [
                    {
                        "use": "usual",
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.8",
                        "value": "8700006468"
                    },
                    {
                        "use": "usual",
                        "type": {
                            "text": "billing-number"
                        },
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.17",
                        "value": "8700006468"
                    }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                "type": [
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.10.698084.30",
                                "code": "50",
                                "display": "Appointment"
                            }
                        ],
                        "text": "Appointment"
                    },
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.2.808267",
                                "code": "3044",
                                "display": "BIOLOGIC"
                            }
                        ],
                        "text": "BIOLOGIC"
                    }
                ],
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            },
            
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Location",
                "id": "44319902",
                extension:[{
                    valueCodeableConcept:{
        coding:[
            {
                system:".7.10.688867.4150",
                code:"3"
            }
        ]
                    }
                }
                
                ],
                identifier:[
                   {
                    system:".7.2.686980",
                    value:"sjdfkjdshf"
                   }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Encounter",
                "id": "etPlPSTi-Ck8pFW0vJgBA3",
                "identifier": [
                    {
                        "use": "usual",
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.8",
                        "value": "8700006468"
                    },
                    {
                        "use": "usual",
                        "type": {
                            "text": "billing-number"
                        },
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.17",
                        "value": "8700006468"
                    }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                "type": [
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.10.698084.30",
                                "code": "50",
                                "display": "Appointment"
                            }
                        ],
                        "text": "Appointment"
                    },
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.2.808267",
                                "code": "3044",
                                "display": "BIOLOGIC"
                            }
                        ],
                        "text": "BIOLOGIC"
                    }
                ],
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2023-05-25T14:00:00Z",
                            "end": "2023-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2023-05-25T14:00:00Z",
                    "end": "2023-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319902",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            },
            
        },
        {
            resource: {
              resourceType: "Encounter",
              id: 1,
              status:'unknown'
            },
          },
          {
              resource: {
                resourceType: "Encounter",
                id: 2,
                status:'arrived',
                
                period:{
                  start:"2023-08-10T10:00:00",
                  end:"2023-08-15T18:30:00"
                },
                identifier:[
                  {
                      system:'.7.3.698084.8',
                      value:'value',
      
                  }
                ],
                type:[
                  {
                      coding:[
                          {
                              system:".7.10.698084.30",
                              code:'3',
                              display:''
                          }
                      ]
                  }
                ]
              },
            },
            {
                resource: {
                  resourceType: "Encounter",
                  id: 3,
                  status:'in-progress',
                  
                  period:{
                    start:"2023-08-10T10:00:00",
                    end:"2023-08-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'1',
                                display:''
                            }
                        ]
                    }
                  ]
                },
              },
              {
                resource: {
                  resourceType: "Encounter",
                  id: 4,
                  status:'in-progress',
                  
                  period:{
                    start:"2023-01-10T10:00:00",
                    end:"2023-01-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'5',
                                display:'Florida'
                            }
                        ]
                    }
                  ]
                },
              },
              {
                resource: {
                  resourceType: "Encounter",
                  id: 5,
                  status:'in-progress',
                  
                  period:{
                    start:"2022-08-10T10:00:00",
                    end:"2022-08-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'3',
                                display:'Florida'
                            }
                        ]
                    }
                  ]
                },
              },
          {
            resource: {
              resourceType: "Location",
              id: 2,
              name: "name",
              extension: [
                {
                  valueCodeableConcept: {
                    coding: [
                      {
                        system: "",
                        code: 34,
                        display: "something display",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            resource: {
              resourceType: "Location",
              id: 3,
              name: "name",
              identifier: [{ value: "random value" }],
            },
          },
    ]
}