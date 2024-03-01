import config from "./main_config";
var medPlot = []; // Relevant medication information. Passed to HealthChart
var fhirMeds = []; // Temporary storage for the FHIR MedicationRequest response
// var encDateMap = {}; // Key is date string. Used to map medications to encounters
var medIdMap = {}; // Key is order ID. Used to store information about medications
var medAdminList = []; // List of order IDs to include in a payload to retrieve med admin info.
var medAdminMap = {}; // Key is order ID. Maps individual administrations of an order to an encounter
var fhirMeds = [];




// this is not working request failed when trying 
function getEHRMedicationsRequest() {
    var deferreds = [];
    var medication = chartConfig.medication
    // if(medication.isMedicationTrue === true)
    // {
    //     medication.grouper.forEach(function(grouper){
    //         deferreds.push(search(medication.endpoint,grouper.data,medication.method,medication.headers))
    //         .then(function(meds, state, xhr) {
    //             try {
    //                 // TODO - Need to check for "error" responses from EHR when there aren't any results to return
    //                 if (!meds.MedicationOrders) {
    //                     meds.MedicationOrders = [];
    //                 }
    //                 // Pre-filter immediately to prep for encounter linking.
    //                 preFilterMedications(meds.MedicationOrders, grouper.row);
    //             } catch (error) {
    //                 chart.failure = true;
    //                 log(error.stack, "error");
    //             }
    //         })
    //     })
    // }
    chartConfig.grouper.forEach(function(grouper) {
        deferreds.push(
            search("epic/2017/Clinical/Utility/GetMedications/GetMedications",
                JSON.stringify({
                    "PatientID": tokenResponse.patient,
                    "PatientIDType": "FHIR",
                    "GrouperID": grouper.id,
                    "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
                    "ProfileView": "3"
                }),
                "POST",
                {
                    "Content-Type": "application/json"
                }
            ).then(function(meds, state, xhr) {
                try {
                    // TODO - Need to check for "error" responses from EHR when there aren't any results to return
                    if (!meds.MedicationOrders) {
                        meds.MedicationOrders = [];
                    }
                    // Pre-filter immediately to prep for encounter linking.
                    preFilterMedications(meds.MedicationOrders, grouper.row);
                } catch (error) {
                    chart.failure = true;
                    log(error.stack, "error");
                }
            })
        );
    });
    return deferreds;
}


function preFilterMedications(medications, row) {
    // Looping through medications. Not using the filter method
    // since the data needs to be compressed based on medication type.
    medications.forEach(function(med) {

        // Check for failure and immediately exit to reduce computation time
        if (chart.failure) {
            return false;
        }

        if (!med.StartDate && !med.StartDateTime) {
            return false;
        }

        // Ignore historical medications for now
        if (med.OrderMode == "Outpatient" && !med.DispenseQuantity) {
            return false;
        }

        // Obtain medication order date
        var start = dateFromString(med.StartDateTime || med.StartDate);
        var startStr = stringFromDate(start);
        var end = dateFromString(med.EndDateTime || med.EndDate);

        // Verify medications were written before the current time
        if ((med.OrderMode == "Inpatient" && end && end < chartConfig.chart.dates.contextStart) ||
            (med.OrderMode == "Outpatient" && (start > today || start < chartConfig.chart.dates.contextStart))
        ) {
            return;
        }

        // Get order ID from the resource
        var ordId;
        med.IDs.forEach(function(id) {
            if (id.Type == "Internal") {
                ordId = id.ID;
            }
        });

        // Get medication name and truncate as necessary
        var medName = med.Name.match(truncateMedRegex);
        medName = medName ? (medName[1].trim() || med.Name) : med.Name;
        if (medName) {
            medName = medName.length > 35 ? medName.substr(0, 35).trim() + "..." : medName;
        }

        // Create a date map, which will be used to query the "List" resource
        // based on enconter IDs found in the encounter date map.
        // First, check if key exists for the specified date
        if (!medIdMap[ordId]) {
            medIdMap[ordId] = {};
        }

        // Create an order ID map, which will accept the encounter ID link
        // identified during the linking process and passed to the HealthChart
        // visualization library
        medIdMap[ordId].start = start;
        medIdMap[ordId].startStr = startStr;
        medIdMap[ordId].end = end || null;
        medIdMap[ordId].row = row;
        medIdMap[ordId].name = medName;
        medIdMap[ordId].orderMode = med.OrderMode;
        medIdMap[ordId].clinicAdmin = med.IsClinicAdministered;
        medIdMap[ordId].hoverDetails = [
            {
                key: "Date",
                value: startStr
            }
        ];

        // Generate list to check all inpatient orders for administration
        // during acute care visits
        if (med.OrderMode == "Inpatient") {
            medAdminList.push(
                {
                    "ID": ordId,
                    "Type": "Internal"
                }
            );
        }
    });
}
// this is the code in getprelimanary data 
deferreds.push.apply(deferreds, splitFhirRequest(3, today - chart.dates.contextStart, fhirMedCallback, "FHIR/R4/MedicationRequest",
{
    patient: tokenResponse.patient
}
));

function fhirMedCallback(meds, state, xhr) {
    // this variable have the values that we give in main_config file 
    var fhirMedvalues = config.fhirMedCallback
    try{
        if (xhr.status != fhirMedvalues.status) {
            ref.failure = true;
            log(this.type + " " + this.url + " " + xhr.status, "error");
            return;
        }
        if (meds.entry && meds.entry[meds.entry.length - 1].resource.issue) {
            // TODO - Not a great error message. Should think about improving
            log(this.type + " " + this.url + " 409 (Malformed Response)", "warn");
        }
        if (meds.total === 0 || !meds.entry) {
            meds.entry = [];
        }
        // TODO - May want to consider adding a map to see if the a previous request
        // returned this medication.
        fhirMeds.push.apply(fhirMeds, meds.entry);
    } catch (error) {
        chart.failure = true;
        log(error.stack, "error");
    }
}


// Attach encounter ID to meds in medIdMap
function addMedContext() {
    fhirMeds.forEach(function(v) {
        var encId;
        if (v.resource.encounter && v.resource.encounter.reference) {
            encId = v.resource.encounter.reference.replace("Encounter/", "");
        }
        if (!encId) {
            log("Could not locate encounter medication was ordered in: " + v.resource.id, "warn");
            return;
        }
        v.resource.identifier.forEach(function(id) {
            if (id.system.indexOf(".7.2.798268") >= 0) {
                if (medIdMap[id.value] && v.resource.encounter.reference) {
                    medIdMap[id.value].encId = medIdMap[id.value].group = encId;
                }
            }
        });
        // Check for albuterol and make a note on encounter map
        // If the encounter does not exist in the encounter map, it's likely
        // because it is beyond the date boundary HealthChart is interested in
        if (encMap[encId] && v.resource.medicationReference && albuterolRegex.test(v.resource.medicationReference.display)) {
            encMap[encId]._albuterol = true;
        }
    });
}

function linkMedAdmin() {
    // Loop on medication administration map
    each(medAdminMap, function(adminList, ordId) {
        // Check if the medication was administered at a clinic.
        if (medIdMap[ordId].clinicAdmin) {
            // Loop on medAdminMap to determine if the admin
            // datetime falls on an encounter date.
            adminList.forEach(function(admin) {
                // Encounter already linked or encounter not found on admin date
                if (admin.group || !encDateMap[admin.dateStr]) {
                    return;
                }
                // If there is only one encounter on that day, attribute the
                // administration to that encounter
                if (encDateMap[admin.dateStr].length == 1) {
                    admin.group = encDateMap[admin.dateStr][0].id;
                } else {
                    // Loop on encounter by date
                    encDateMap[admin.dateStr].forEach(function(enc) {
                        if (enc.contactType != 101) {
                            return;
                        }
                        // Widen the boundary window by two hours after and 30
                        // minutes before to account for documentation errors.
                        var tmpEnd = new Date(enc.end);
                        tmpEnd.setMinutes(tmpEnd.getMinutes() + 120);
                        var tmpStart = new Date(enc.start);
                        tmpStart.setMinutes(tmpStart.getMinutes() - 30);
                        // Associate with the encounter if it falls within the time boundary
                        if (admin.date >= tmpStart && admin.date < tmpEnd) {
                            admin.group = enc.id;
                        }
                    });
                }
            });
        } else {
            // Loop on medAdminMap to attribute an administration to
            // its ordering encounter
            // TODO - Could probably restructure this during the admin
            // return call
            adminList.forEach(function(admin) {
                // Make sure we have information about the encounter
                if (encMap[medIdMap[ordId].group]) {
                    admin.group = medIdMap[ordId].group;
                } else {
                    log("Could not link med administration to encounter: " + ordId, "warn");
                }
            });
        }
    });
}

function buildMedVisObj() {
    // Map to ensure we are only plotting a single mark per encounter
    // per medication class.
    var medMap = {
        "Controller": {},
        "Systemic Steroid": {},
        "Biologic": {}
    };

    // Loop on admins first because they are prioritized
    each(medAdminMap, function(med, ordId) {
        med.forEach(function(admin) {
            if (admin.group && medIdMap[ordId].row === "Systemic Steroid") {
                encMap[admin.group]._steroid = true;
            }
            // Check if the med has  been added to the "Asthma Meds Administered" list
            if (encMap[admin.group] && encMap[admin.group].detailMap["Asthma Meds Administered"].value.indexOf(medIdMap[ordId].name) < 0) {
                encMap[admin.group].detailMap["Asthma Meds Administered"].value.push(medIdMap[ordId].name);
            }

            // Check if a mark already exists for the encounter/group
            // If so, we don't want another mark for the same
            // encounter/medication class combo
            if (medMap[medIdMap[ordId].row][admin.group] !== undefined) {
                return;
            }

            // Flag that this encounter/medication class combo has
            // been accounted for
            medMap[medIdMap[ordId].row][admin.group] = true;

            // Check if it falls within the counter range
            if (admin.date > counterLookback) {
                chartConfig.rows[rowMap[medIdMap[ordId].row]].count++;
            }

            // Add the compressed data point to the medication array
            var tmpObj = {
                "row": medIdMap[ordId].row,
                "group": admin.group,
                "hoverDetails": [
                    {
                        key: "Date",
                        value: admin.dateStr
                    }
                ],
                "start": admin.date,
                "shape": "square"
            };

            // If the administration couldn't be linked to an encouter, we
            // need to provide basic details about the administration.
            // This situation should be infrequent, but important
            // to account for
            if (!admin.group) {
                tmpObj.details = [
                    {
                        label: "Date",
                        value: admin.dateStr
                    },
                    {
                    label: "Medication",
                        value: [medIdMap[ordId].name]
                    }
                ];
            }
            medPlot.push(tmpObj);
        });
    });
    
    each(medIdMap, function(med, ordId) {
        // Ignore medicaitons classified as "inpatient" since they
        // are handled by the admin loop.
        // TODO - Do we care about when these were ordered? Mainly pertains
        // to biologics
        if (med.orderMode == "Inpatient") {
            return;
        }

        if (med.group && encMap[med.group] && medIdMap[ordId].row === "Systemic Steroid") {
            encMap[med.group]._steroid = true;
        }

        // Check if the med has been added to the "Asthma Meds Ordered" list
        if (encMap[med.group] && encMap[med.group].detailMap["Asthma Meds Ordered"].value.indexOf(medIdMap[ordId].name) < 0) {
            encMap[med.group].detailMap["Asthma Meds Ordered"].value.push(medIdMap[ordId].name);
        }

        // Check if a mark already exists for the encounter/group
        // If so, we don't want another mark for the same
        // encounter/medication class combo
        if (medMap[medIdMap[ordId].row][med.group] !== undefined) {
            return;
        }

        // Flag that this encounter/medication class combo has
        // been accounted for
        medMap[medIdMap[ordId].row][med.group] = true;

        // Check if it falls within the counter range
        if (med.start > counterLookback) {
            chartConfig.rows[rowMap[medIdMap[ordId].row]].count++;
        }

        // Add the compressed data point to the medication array
        var tmpObj = {
            "row": medIdMap[ordId].row,
            "group": med.group,
            "hoverDetails": [
                {
                    key: "Date",
                    value: med.startStr
                }
            ],
            "start": med.start,
            "shape": "circle"
        };
        medPlot.push(tmpObj);
    });
}


// this function is never called in main js
function getMedAdmin() {
    return search("epic/2014/Clinical/Patient/GETMEDICATIONADMINISTRATIONHISTORY/MedicationAdministration",
        JSON.stringify({
            "PatientID": tokenResponse.patient,
            "PatientIDType": "FHIR",
            "ContactID": tokenResponse.csn,
            "ContactIDType": "CSN",
            "OrderIDs": medAdminList
        }),
        "POST",
        {
            "Content-Type": "application/json"
        }
    ).then(function(adminHistory, state, xhr) {
        try {
            if (!adminHistory.Orders) {
                return;
            }
            adminHistory.Orders.forEach(function(d) {
                // This should never happen, but adding check
                // just in case.
                if (!medIdMap[d.OrderID.ID]) {
                    return;
                }
                d.MedicationAdministrations.forEach(function(admin) {
                    var adminDate = dateFromString(admin.AdministrationInstant);
                    if (admin.AdministrationInstant && adminDate > chartConfig.chart.dates.contextStart) {
                        if (!medAdminMap[d.OrderID.ID]) {
                            medAdminMap[d.OrderID.ID] = [];
                        }
                        medAdminMap[d.OrderID.ID].push(
                            {
                                date: adminDate,
                                dateStr: stringFromDate(adminDate)
                            }
                        );
                    }
                });
            });
        } catch (error) {
            chart.failure = true;
            log(error.stack, "error");
        }
    });
}


// after this render function is called where data is pushed into healthchartConfig