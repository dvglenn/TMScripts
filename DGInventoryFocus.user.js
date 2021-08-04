// ==UserScript==
// @name         DGInventoryFocus
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Enables ENTER key to submit page on "Confirm Lost Inventory" page
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/inventory/view_inventory_at*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',() => {

        var delayInMilliseconds = 200;
        setTimeout(function() {
            //your code to be executed after 1 second
            var input = document.getElementsByTagName("input")[0];
            input.focus();
            input.select();
        }, delayInMilliseconds);
        

    });


})();
