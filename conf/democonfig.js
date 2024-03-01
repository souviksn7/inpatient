export default {
  requests: [
    {
      medicationRequest: {
        splits:3,
        url: "FHIR/R4/MedicationRequest",
      },
    },
    {
      list: {
        url:"FHIR/R4/List",
        code:"hospital-problems"
      },
    },
  ],
};
