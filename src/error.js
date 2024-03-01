import jQuery from "jquery";

import chartConfig from "../conf/healthchartConfig.js";

import { flushLogs } from "./logger.js";

// Failure method for the intervention
function dataFail(xhr, textStatus) {
    if (textStatus != "abort") {
        chartConfig.chart.failure = true;
        failureSplash();
    }
}

function failureSplash() {
    if (chartConfig.chart.failure && jQuery("#" + chartConfig.namespace).length !== 0) {
        var errorMessage = [
            "An error occurred while loading HealthChart.",
            "Application developers have been notified and are working to correct the issue."
        ];
        jQuery("#" + chartConfig.namespace).html(errorMessage.join(" "));
    }
    flushLogs();
}

export {
    dataFail,
    failureSplash
};