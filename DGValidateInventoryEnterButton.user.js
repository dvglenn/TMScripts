// ==UserScript==
// @name         DGValidateInventoryEnterButton
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Enables ENTER key to submit page on "Confirm Lost Inventory" page
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/inventory/validate_remove_inventory*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',() => {

        //checkCookieExists("MissingExpirations");
        var yesbtn = document.getElementsByClassName("a-button-input")[0];
        //console.log(yesbtn);
        yesbtn.focus();


    });




})();




