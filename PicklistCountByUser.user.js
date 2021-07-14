// ==UserScript==
// @name         PicklistCountByUser
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Print out pick list IDs for Manual bigs assignments
// @author       dvglenn@
// @match        https://aftlite-na.amazon.com/picklist_group/index
// @match        https://aftlite-na.amazon.com/picklist_group
// @match        https://aftlite-na.amazon.com/picklist_group?selected_tab=In+Progress
// @match        https://aftlite-na.amazon.com/picklist_group/index?selected_tab=In+Progress
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

//    window.addEventListener('load',() => {

        //focusFormElement();
    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    //add an event handler to catch if the we've changed to a visible page,
    //if so, reload the page to make sure we've got the latest data
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    function handleVisibilityChange() {
        if (document[hidden]) {
            console.log("changed to hidden");
        } else {
            console.log("changed to visible");
            autoReload(1);
        }
    }

    //if the page is hidden, don't execute any further code
    // this is to resolve an issue where the code wouldn't function if the
    // page isn't visible.  It's a kludge, but seems to work.
    if (document.visibilityState === "hidden") {
        console.log("hidden");
        //autoReload(10);
        return;
    }


        var previousUser="";
        var currUserName="";
        var currUserCount=0;
        var currCount=0;

        var dictUsers = {};
        var dictUsersZone = {};

        var picklistTable = document.getElementById("picklist_group_list");
        for (var i = 1; i < picklistTable.rows.length; i++) {
            currCount=0;

            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = picklistTable.rows.item(i).cells;

            //tds[1].getElementsByTagName("a")[0].innerHTML
            var assignedUser = objCells.item(1).getElementsByTagName("a")[0].innerHTML;
            var assignedZone = objCells.item(6).innerHTML;
            dictUsersZone[assignedUser] = assignedZone;

            if ((assignedUser in dictUsers)) {
                currCount=dictUsers[assignedUser];
                currCount++;
                dictUsers[assignedUser] = currCount;
                //dictUsersZone[assignedUser] = assignedZone;

            }
            else {
                dictUsers[assignedUser]=1;
                //console.log("not in dictionary");
            }
            //console.log(assignedUser + ": " + dictUsers[assignedUser]);


        }


        var table = document.getElementsByTagName("table")[0];

        //    for (var user in dictUsers) {
        //         console.log(user + ": " + dictUsers[user]);
        //     }


        console.log("*************");

        var body = document.getElementsByTagName("body")[0];
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var rowCount = 0;



        var tHead = document.createElement("thead");
        tHead.innerHTML+="<tr style=\"background-color:powderblue;font-size:25px;\"><th style=\"font-size:25px;\">Username</th><th style=\"font-size:25px;\">Bag Count</th><th style=\"font-size:25px;\">Zone</th></tr>";

        tbl.appendChild(tHead);
        //cellUser.style.fontSize="25px";


        //     var tHeadRow = document.createElement("tr");
        //     var thUser = document.createElement("th");
        //     var thCount = document.createElement("th");
        //     var thZone = document.createElement("th");

        //     tHeadRow.appendChild(thUser);
        //     tHeadRow.appendChild(thCount);
        //     tHeadRow.appendChild(thZone);

        //thUser.innerHTML(thUser);


        for (var user in dictUsers) {

            var row = document.createElement("tr");
            var cellUser = document.createElement("td");
            var cellUserText = document.createTextNode(user);
            var cellCount = document.createElement("td");
            var cellCountText = document.createTextNode(dictUsers[user]);
            var cellZone = document.createElement("td");
            var cellZoneText = document.createTextNode(dictUsersZone[user]);

            cellUser.style.fontSize="25px";
            cellCount.style.fontSize="25px";
            cellZone.style.fontSize="25px";
            cellUser.style.textAlign="center";
            cellCount.style.textAlign="center";
            cellZone.style.textAlign="center";

            cellUser.appendChild(cellUserText);
            cellCount.appendChild(cellCountText);
            cellZone.appendChild(cellZoneText);
            row.appendChild(cellUser);
            row.appendChild(cellCount);
            row.appendChild(cellZone);
            var rmdr = rowCount%2;
            if(rowCount%2==0) {
                row.style.background = "#C2DFF0";
            } else {
                row.style.background = "#DFFFC2";
            }
            row.style.fontSize = "40px";


            tblBody.appendChild(row);
            rowCount++;
        }

        // append the <tbody> inside the <table>
        tbl.appendChild(tblBody);
        // put <table> in the <body>
        table.prepend(tbl);
        // tbl border attribute to
        //    tbl.setAttribute("border", "2");
        //     tbl.setAttribute("font-size", "0.9em");
        //     tbl.style.backgroundColor = "yellow";
        //     tbl.style.fontSize="0.9em";
        tbl.style.width = "500px";
        tbl.before(document.createElement("br"));
        tbl.after(document.createElement("br"));


        autoReload(30);

//      });


function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (var key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function autoReload(iSecs) {
    setInterval(function() {
        //if(checkbox.checked) {
            location.reload();
        //}
    }, iSecs*1000);
}



})();