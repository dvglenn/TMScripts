// ==UserScript==
// @name         MissingExpirationHelper
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Turn ASINs into clickable links that open inventory
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/missing_exp_date_report/index
// @match        https://aftlite-portal.amazon.com/missing_exp_date_report
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const cookieTime=30; //time in seconds to keep the cookie
    var scriptElm = document.createElement('script');
    //scriptElm.setAttribute('class', 'class-name');
    var scriptTxt = 'function highlightRow(i) { createCookie("MissingExpirations", 1); var table = document.getElementsByTagName("table")[0]; table.rows.item(i).style.background="#C2DFF0";return true;}';
    var cookieTxt = 'function createCookie(name, value) {var date = new Date();date.setTime(date.getTime()+(' + cookieTime + '*1000));var expires = "; expires="+date.toGMTString();document.cookie = name+"="+value+expires+"; path=/";}'

    var inlineCode = document.createTextNode(scriptTxt + " " + cookieTxt);
    scriptElm.appendChild(inlineCode);
    document.body.appendChild(scriptElm);

    //var asinForm = document.createElement("div");
    //asinForm.innerHTML = '<form accept-charset="UTF-8" action="/inventory/view_inventory_for_asin" method="post">Inventory by ASIN or UPC <input type="text" name="asin" size="20"><input type="submit" name="view" value="view or update"/></form>'

    //console.log("Get our table");
    var table = document.getElementsByTagName("table")[0];
    //var tableASIN = tables[1];
    //var tds = tableASIN.getElementsByTagName("td");
    //var ASIN = tds[1].getElementsByTagName("a")[0].innerHTML;
    //console.log("ASIN: " + ASIN);

    for (var i = 1; i < table.rows.length; i++) {
        var cells = table.rows.item(i).cells;
        var cell = cells.item(2);
        var p = cell.getElementsByTagName("p")[0];
        var asin = p.innerHTML;
        //console.log(asin);
        var asinForm = document.createElement("div");
        asinForm.innerHTML = '<form accept-charset="UTF-8" target="inventory" action="/inventory/view_inventory_for_asin" method="post" onsubmit="return highlightRow(' + i + ')"><input type="hidden" name="asin" size="20" value="' + asin + '"><input type="submit" name="view" value="View"/></form>'
        //console.log(asinForm.innerHTML);
        p.append(asinForm);

    }

//    createCookie("MissingExpirations", 1);
//    checkCookieExists("MissingExpirations");




//     function createCookie(name, value) {
//         var date = new Date();
//         date.setTime(date.getTime()+(20*1000));
//         var expires = "; expires="+date.toGMTString();
//         document.cookie = name+"="+value+expires+"; path=/";
//     }

//     function checkCookieExists(cookieName) {
//         if (document.cookie.split(';').some((item) => item.trim().startsWith(cookieName + '='))) {
//             //const output = document.getElementById('a-cookie-existence')
//             //output.textContent = '> The cookie "reader" exists'
//             console.log("cookie exists!");
//             console.log(document.cookie);
//         } else {
//             console.log("no cookie!");
//         }
//     }



//     highlightRow(2);

//     function highlightRow(i) {


//         console.log("highlighting the row!");
//         var row = table.rows.item(i);
//         row.style.background = "#C2DFF0";
//         return true; // submit the form
//     }









//     //**Only Add the "COPY SPOO" button if we have "Scan sp00" on the screen **
//     var content = document.body.textContent || document.body.innerText;
//     var hasScanSp00 = content.indexOf("Scan sp00")!==-1;
//     var hasScanASIN = content.indexOf("Scan or enter ASIN/UPC to pack:")!==-1;
//     if (hasScanSp00) {

//         //**Check to see if we already have a sp00 assigned. If so, add the "COPY SPOO" button **
//         var spoo = document.links[4].text;
//         //console.log("spoo: " + spoo);
//         var sp = spoo.substring(0,2);
//         //console.log("sp: " + sp);
//         if(sp == "Sp") {
//             console.log("Add the SPOO button");

//             var button_addSP00 = createButton("Add " + spoo);
//             button_addSP00.onclick = function () {
//                 document.getElementsByName("tote_code")[0].value = spoo;
//             };

//             var spans = document.getElementsByTagName("form");

//             //buttons.appendChild(button_copySP00);
//             spans[2].appendChild(button_addSP00);
//         }
//     } else if (hasScanASIN) {
//         console.log("Add the ASIN button");
//         var tables = document.getElementsByTagName("table");
//         var tableASIN = tables[1];
//         var tds = tableASIN.getElementsByTagName("td");
//         var ASIN = tds[1].getElementsByTagName("a")[0].innerHTML;
//         console.log("ASIN: " + ASIN);

//         //asin_or_upc
//         var button_addASIN = createButton("Add " + ASIN);
//         button_addASIN.onclick = function () {
//             document.getElementsByName("asin_or_upc")[0].value = ASIN;
//         };

//         var pickListQuantity = tds[4].innerHTML;
//         var packedQuantity = tds[5].innerHTML;
//         console.log("pickListQuantity: " + pickListQuantity);
//         console.log("packedQuantity: " + packedQuantity);
//         if (pickListQuantity>packedQuantity) {
//             var spans2 = document.getElementsByTagName("form");
//             spans2[2].appendChild(button_addASIN);
//         }


//     }

//     function createButton(name) {
//         var button = document.createElement('button');
//         button.innerHTML = name;
//         console.log("createButton success");
//         return button;
//     }

})();




