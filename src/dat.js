import jQuery from "jquery";

import chartConfig from "../conf/healthchartConfig.js";
import { search } from "./http.js";
import { log } from "./logger.js";
import { csnList, tokenResponse } from "./shared.js";
import customHosts from "./customHosts.js";

var csnToDatMap;

function getEncDat() {
    return search(customHosts[sessionStorage.getItem("env")] + "CHOP/2015/CHOP/Clinical/Csn2Dat", JSON.stringify({
        csn: csnList
    }), "POST", {"Content-Type": "application/json"}).then(function(map, state, xhr) {
        try {
            if (xhr.status != 200) {
                chartConfig.chart.failure = true;
                log(this.type + " " + this.url + " " + xhr.status, "error");
                return;
            }
            csnToDatMap = map.map;
        } catch (error) {
            log(error.stack, "error");
        }
    });
}

export {
    csnToDatMap,
    getEncDat
};