// ==UserScript==
// @name         DGMissingExpirationInventoryHelper
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.5
// @description  Turn ASINs into clickable links that open inventory
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/inventory/view_inventory_for_asin_display/index
// @match        https://aftlite-portal.amazon.com/inventory/view_inventory_for_asin_display
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',() => {
        checkCookieExists("MissingExpirations");

        var delayInMilliseconds = 200;
        setTimeout(function() {

            var table = document.getElementsByTagName("table")[0];
            for (var i = 1; i < table.rows.length; i++) {
                var cells = table.rows.item(i).cells;
                var expireDateCell = cells.item(4);

                if (expireDateCell.innerHTML=="Missing") {
                    console.log("we found a missing item");
                    table.rows.item(i).style.background="#C2DFF0";
                    var updateDateCell = cells.item(5);
                    updateDateCell.getElementsByTagName("input")[0].focus();

                    //console.log('The page is fully loaded.');
                    document.getElementsByTagName("table")[0].rows.item(i).cells.item(5).getElementsByTagName("input")[0].focus();
                    return;
                }
            }
        }, delayInMilliseconds);

      });



    function createCookie(name, value) {
        var date = new Date();
        date.setTime(date.getTime()+(5*1000));
        var expires = "; expires="+date.toGMTString();

        document.cookie = name+"="+value+expires+"; path=/";
    }

    function checkCookieExists(cookieName) {
        if (document.cookie.split(';').some((item) => item.trim().startsWith(cookieName + '='))) {
            //const output = document.getElementById('a-cookie-existence')
            //output.textContent = '> The cookie "reader" exists'
            console.log("cookie exists!");
            return true;
        } else {
            console.log("no cookie!");
            console.log(document.cookie);
            return false;
        }
    }



})();




