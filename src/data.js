// export const data =
  
  

export const myData =  {
    entry: [
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
    ],
  };