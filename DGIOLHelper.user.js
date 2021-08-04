// ==UserScript==
// @name         DGIOLHelper
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.2
// @description  IOL Helper script that highlights row you've already clicked on and makes it so when you click on a Location hyperlink it opens in another tab instead of the same tab.
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/inventory_in_odd_location_report*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',() => {

        var scriptElm = document.createElement('script');
        scriptElm.setAttribute('class', 'class-name');
        var scriptTxt = 'function highlightRow(i) { var table2 = document.getElementsByTagName("table")[0]; table2.rows.item(i).style.background="#C2DFF0";return true;}';

        var inlineCode = document.createTextNode(scriptTxt);
        scriptElm.appendChild(inlineCode);
        document.body.appendChild(scriptElm);

        var table = document.getElementsByTagName("table")[0];
        for (var i = 1; i < table.rows.length; i++) {
            var cells = table.rows.item(i).cells;
            var cell = cells.item(2);
            var a = cell.getElementsByTagName("a")[0];
            a.target = "IOLHelper";
            a.onclick = function() {
                this.style.color="#C2DFF0";
                var table3 = document.getElementsByTagName("table")[0];
                for (var ii = 1; ii < table.rows.length; ii++) {
                    var checkcell = table.rows.item(ii).cells.item(2).getElementsByTagName("a")[0];
                    if (checkcell.style.color=="") {
                        checkcell.focus();
                        return;
                    }
                }
            }

        }

    });


})();
