// ==UserScript==
// @name         AssignPicklistHelper
// @namespace    https://github.com/jgray0705/UserScripts
// @version      0.5
// @description  Grabs the Assigned pick list from the URL and adds it to the form
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/picklist_group/create*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    var AssignList = urlParams.get('AssignList')
    AssignList = AssignList.replace(/x/g, " ");
    console.log(AssignList);
    //alert(AssignList);

    //picklist_ids
    picklist_ids.value = AssignList;


})();




