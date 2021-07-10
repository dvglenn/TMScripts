// ==UserScript==
// @name         IdleTimeFocus
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Sets focus to first IDLE time
// @author       dvglenn@
// @match        https://aftlite-na.amazon.com/labor_tracking/view_daily_detail*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',() => {

        var table = document.getElementById("dailyReportTable");

        for (var i = 1; i < table.rows.length; i++) {
            var foo = table.rows.item(i).cells.item(7).getElementsByTagName("select")[0];
            if (typeof foo != "undefined") {
                console.log(foo.value);
                if (foo.value=="IDLE") {
                    console.log("setting focus");
                    foo.focus({ preventScroll: false});
                    return;
                }
            }
        }

    });

})();