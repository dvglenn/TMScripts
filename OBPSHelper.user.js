// ==UserScript==
// @name         OBPSHelper
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Print out pick list IDs for Manual bigs assignments
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/picklist/view_pack_by_picklist
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //**Only Add the "COPY SPOO" button if we have "Scan sp00" on the screen **
    var content = document.body.textContent || document.body.innerText;
    var hasScanSp00 = content.indexOf("Scan sp00")!==-1;
    var hasScanASIN = content.indexOf("Scan or enter ASIN/UPC to pack:")!==-1;
    if (hasScanSp00) {

        //**Check to see if we already have a sp00 assigned. If so, add the "COPY SPOO" button **
        var spoo = document.links[4].text;
        //console.log("spoo: " + spoo);
        var sp = spoo.substring(0,2);
        //console.log("sp: " + sp);
        if(sp == "Sp") {
            console.log("Add the SPOO button");

            var button_addSP00 = createButton("Add " + spoo);
            button_addSP00.onclick = function () {
                document.getElementsByName("tote_code")[0].value = spoo;
            };

            var spans = document.getElementsByTagName("form");

            //buttons.appendChild(button_copySP00);
            spans[2].appendChild(button_addSP00);
        }
    } else if (hasScanASIN) {
        console.log("Add the ASIN button");
        var tables = document.getElementsByTagName("table");
        var tableASIN = tables[1];
        var tds = tableASIN.getElementsByTagName("td");
        var ASIN = tds[1].getElementsByTagName("a")[0].innerHTML;
        console.log("ASIN: " + ASIN);

        //asin_or_upc
        var button_addASIN = createButton("Add " + ASIN);
        button_addASIN.onclick = function () {
            document.getElementsByName("asin_or_upc")[0].value = ASIN;
        };

        var pickListQuantity = tds[4].innerHTML;
        var packedQuantity = tds[5].innerHTML;
        console.log("pickListQuantity: " + pickListQuantity);
        console.log("packedQuantity: " + packedQuantity);
        if (pickListQuantity>packedQuantity) {
            var spans2 = document.getElementsByTagName("form");
            spans2[2].appendChild(button_addASIN);
        }


    }

    function createButton(name) {
        var button = document.createElement('button');
        button.innerHTML = name;
        console.log("createButton success");
        return button;
    }

})();




