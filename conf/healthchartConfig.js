import healthchart from 'healthchart';

import { executeAction } from "../src/ehrComms.js";
import { log } from "../src/logger.js";
import { tokenResponse } from "../src/shared.js";

export default {
    displayTransition: 750,
    chart: {
        background: {
            color: "#FFFFFF"
        },
        button: {
            options: [
                {
                    label: "14 months",
                    value: 36720000
                },
                {
                    label: "18 months",
                    value: 47260800
                },
                {
                    label: "24 months",
                    value: 63072000
                }
            ]
        },
        counter: {
            text: ["Past 12", "Mo."],
            height: null,
            width: 55
        },
        dates : {
            end: new Date(),
            focusStart: healthchart.dateMath(-36720000),
            line: healthchart.dateMath(-31536000),
            contextStart: healthchart.dateMath(-63072000)
        },
        details: {
            image: "./images/arrow.png",
            width: 255
        },
        logo: {
            image: "./images/logo.jpg"
        },
        margin: {
            top: 5,
            right: 1,
            bottom: 1,
            left: 1
        },
        severity: {
            // The 'calculator' function will be bound to the HealthChart context
            calculator: function(chartConfig) {
                var chart = chartConfig.chart;
                var rows = chartConfig.rows;
                var rowMap = chartConfig.rowMap;

                // Creates a list to append text to based on below conditions
                var severityText = {
                    high: [],
                    medium: []
                };

                // Set severity level. If no severity level, leave the severity box blank
                // Evaluate inpatient visits
                if (rows[rowMap.Inpatient].count > 1) {
                    // Highlight the counter reds
                    rows[rowMap.Inpatient].highlight = "#B72413";
                    // Set the severity level to high
                    chart.severity.level = "high";
                    // Add severity text to the high list
                    severityText.high.push("At least 2 IP");
                } else if (rows[rowMap.Inpatient].count > 0) {
                    // Highlight the counter orange
                    rows[rowMap.Inpatient].highlight = "#D4782A";
                    // Set the severity level to medium
                    chart.severity.level = "medium";
                    // Add severity text to the medium list
                    severityText.medium.push("1 IP");
                }

                // Evaluate emergency visits
                if (rows[rowMap["Emergency Only"]].count > 2) {
                    // Builds text based on whether text already exists
                    var more = severityText.high.length === 0 ? "At least " : " ";
                    // Highlight the counter reds
                    rows[rowMap["Emergency Only"]].highlight = "#B72413";
                    // Set the severity level to high
                    chart.severity.level = "high";
                    // Add severity text to the high list
                    severityText.high.push(more + "3 ED");
                } else if (chart.severity.level != "high" && rows[rowMap["Emergency Only"]].count > 1) {
                    // Highlight the counter orange
                    rows[rowMap["Emergency Only"]].highlight = "#D4782A";
                    // Set the severity level to medium
                    chart.severity.level = "medium";
                    // Add severity text to the medium list
                    severityText.medium.push("2 ED");
                }

                var severityTextList = [];

                // Builds severity header and text based on severity level
                if (chart.severity.level == "high" || chart.severity.level == "medium") {
                    severityTextList.push(severityText[chart.severity.level].join(" or "));
                    severityTextList.push("visit(s) for asthma during the past year.");
                }

                if (chart.severity.level == "high") {
                    chart.severity.header = {
                        text: "High Utilization"
                    };
                } else if (chart.severity.level == "medium") {
                    chart.severity.header = {
                        text: "Rising Utilization"
                    };
                }

                // Adds severity text to the chart config
                chart.severity.reason = {
                    text: severityTextList.join(" ")
                };
            },
            header: {},
            reason: {}
        },
        resources: {
            height: 85,
            header: "Resources",
            resources: [
                {
                    label: "Asthma Action Plan",
                    labelLink: function(){
                        log("Navigate to Asthma Action Plan SmartForm", "info");
                        executeAction({
                            action: "Epic.Clinical.Informatics.Web.LaunchActivity",
                            args: {
                                PatientID: tokenResponse.patient,
                                ActivityKey: "ASTHMA_ACTION_PLAN"
                            }
                        });
                    }
                },
                {
                    label: "Asthma Pathway",
                    labelLink: function(){
                        log("Navigate to Asthma Pathway", "info");
                        executeAction({
                            action: "Epic.Clinical.Informatics.Web.LaunchActivity",
                            args: {
                                PatientID: tokenResponse.patient,
                                ActivityKey: "ASTHMA_IP_PATHWAY"
                            }
                        });
                    }
                }
            ]
        },
        title: {
            text: ["Asthma", "HealthChart"],
            width: 200
        }
    },
    // medication : {
    //     isMedicationTrue: true,
    //     endpoint:"epic/2017/Clinical/Utility/GetMedications/GetMedications",
    //     method:"Post",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     grouper:[
    //         [
    //             {
                    
    //                 id: "119944",
                    
    //                 row: "Biologic",
                   
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "119944",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             },
    //             {
    //                 id: "113258",
    //                 row: "Controller",
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "113258",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             },
    //             {
    //                 id: "101365",
    //                 row: "Systemic Steroid",
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "101365",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             }
    //         ],
    //     ]
    // },
    grouper: [
        {
            
            id: "119944",
            
            row: "Biologic",
           
            // data:JSON.stringify({
            //     "PatientID": tokenResponse.patient,
            //     "PatientIDType": "FHIR",
            //     "GrouperID": "119944",
            //     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
            //     "ProfileView": "3"
            // })
        },
        {
            id: "113258",
            row: "Controller"
        },
        {
            id: "101365",
            row: "Systemic Steroid"
        }
    ],
    orgDeptMap: {
        101012174: "Allergy"
    },
    ignoredDepts: {
        101001610: 1
    },
    icuList: ["5", "34", "36", "43", "51", "123"],
    noteKey: "CHOP#6395",
    detailsOrder: [
        "ICU Visit",
        "Date",
        "Type",
        "Location",
        "Asthma Meds Ordered",
        "Asthma Meds Administered",
        "Asthma Care Plan",
        "Spirometry Report",
        "Full Visit Report"
    ],
    namespace: "healthchart_app",
    rows: [
        {
            name: "Visits",
            header: true,
            count: null,
            data: []
        },
        {
            name: "Inpatient",
            header: false,
            count: 0,
            legend: {
                count: 0,
                label: "ICU",
                base: {
                    shape: "circle",
                },
                alt: {
                    shape: "triangle-up",
                    color: "#FDE160"
                }
            },
            data: []
        },
        {
            name: "Emergency Only",
            header: false,
            count: 0,
            legend: {
                count: 0,
                label: "UC",
                base: {
                    shape: "circle"
                },
                alt: {
                    shape: "square"
                }
            },
            data: []
        },
        {
            name: "Primary Care",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Allergy",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Pulmonary",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Medications",
            header: true,
            count: null,
            legend: {
                label: "Admin",
                base: {
                    shape: "circle"
                },
                alt: {
                    shape: "square"
                }
            },
            data: []
        },
        {
            name: "Systemic Steroid",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Controller",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Biologic",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Other",
            header: true,
            count: null,
            legend: null,
            data: []
        },
        {
            name: "Asthma Care Plan",
            header: false,
            count: 0,
            legend: null,
            data: []
        }
    ]
};