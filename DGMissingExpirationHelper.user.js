// ==UserScript==
// @name         DGMissingExpirationHelper
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.4
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

    var table = document.getElementsByTagName("table")[0];
    
    var count=table.rows.length-1;
    var countDiv = document.createElement("div");
    countDiv.innerHTML = 'Count: ' + count;
    table.prepend(countDiv);

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


})();




