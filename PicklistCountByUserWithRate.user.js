// ==UserScript==
// @name         PicklistCountByUserWithRate
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.3
// @description  Dashboard to show which AA's have a picklist assigned to them and some vital details
// @author       dvglenn@
// @match        https://aftlite-na.amazon.com/picklist_group/index
// @match        https://aftlite-na.amazon.com/picklist_group
// @match        https://aftlite-na.amazon.com/picklist_group?selected_tab=In+Progress
// @match        https://aftlite-portal.amazon.com/picklist_group
// @match        https://aftlite-portal.amazon.com/picklist_group/index
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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



            //if the page is hidden, don't execute any further code
            // this is to resolve an issue where the code wouldn't function if the
            // page isn't visible.  It's a kludge, but seems to work.
            if (document.visibilityState === "hidden") {
                console.log("hidden");
                //autoReload(10);
                return;
            }



            var dictUserAction = {};
            var dictUserLastTime = {};

            let request = new XMLHttpRequest();

            //request.open("GET", "https://aftlite-portal.amazon.com/labor_tracking/find_people", true);
            request.open("GET", "/labor_tracking/find_people", true);
            request.responseType = "document";
            request.onloadend = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var lastAction = "";
                    var lastTime = "";
                    var userName = "";
                    //let dictUserAction = {};
                    let xtable = request.responseXML.getElementsByClassName("reportLayout sortable filterable")[0];
                    if (typeof xtable == "undefined") {
                        xtable = request.responseXML.getElementsByTagName("table")[0];
                    }

                    //console.log(xtable);
                    var cnt=0;
                    for(let row of xtable.rows) {
                        if (cnt>0) {
                            userName = row.cells[2].getElementsByTagName("a")[0].innerHTML;
                            lastTime = row.cells[5].innerHTML.trim();
                            lastAction = row.cells[7].innerHTML.trim();

                            if (lastAction == "undefined") {
                                dictUserAction[userName] = "--";
                            } else {
                                dictUserAction[userName] = lastAction;
                            }
                            dictUserLastTime[userName] = lastTime;

                            //console.log(userName + " " + dictUserAction[userName]);
                            //console.log(dictUserAction[userName]);
                            //console.log(dictUserLastTime[userName]);
                        }
                        cnt++;
                    }
                }

                ////////////////////////////////////////////////
                //Add code here

                    var previousUser="";
                    var currUserName="";
                    var currUserCount=0;
                    var currCount=0;

                    var dictUsers = {};
                    var dictItemCount = {};
                    var dictUsersZone = {};
                    var isPortal = false;

                    var picklistTable = document.getElementById("picklist_group_list");
                    //console.log("after first table");
                    if ((typeof picklistTable == "undefined") || (picklistTable==null)) {
                        console.log("getting new table");
                        picklistTable = document.getElementsByTagName("table")[0];
                        isPortal=true;
                    } else {
                        isPortal = false;
                    }


                    //console.log(picklistTable);

                    for (var i = 2; i < picklistTable.rows.length; i++) {
                        currCount=0;

                        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
                        var objCells = picklistTable.rows.item(i).cells;
                        //console.log(objCells);


                        //tds[1].getElementsByTagName("a")[0].innerHTML
                        //console.log("before assigned user");
                        var assignedUser = objCells.item(1).getElementsByTagName("a")[0].innerHTML;
                        //console.log("before assigned zone");
                        var assignedZone = objCells.item(6).innerHTML;
                        dictUsersZone[assignedUser] = assignedZone;

                        var pickList = objCells.item(4).innerHTML;
                        var itemCount = parseInt(pickList.substring(pickList.lastIndexOf("(") + 1, pickList.lastIndexOf(")")).split(" ")[0]);

                        if ((assignedUser in dictUsers)) {
                            currCount=dictUsers[assignedUser];
                            currCount++;
                            dictUsers[assignedUser] = currCount;
                            dictItemCount[assignedUser] = dictItemCount[assignedUser] + itemCount;
                            //dictUsersZone[assignedUser] = assignedZone;

                        }
                        else {
                            dictUsers[assignedUser]=1;
                            dictItemCount[assignedUser] = itemCount;
                            //console.log("not in dictionary");
                        }
                        //console.log(assignedUser + ": " + dictUsers[assignedUser]);


                        //console.log("itemCount: " + itemCount);


                    }


                    var table = document.getElementsByTagName("table")[0];

                    //    for (var user in dictUsers) {
                    //         console.log(user + ": " + dictUsers[user]);
                    //     }


                    //console.log("*************");

                    var body = document.getElementsByTagName("body")[0];
                    var tbl = document.createElement("table");
                    var tblBody = document.createElement("tbody");
                    var rowCount = 0;



                    var tHead = document.createElement("thead");
                    //console.log("before thead")
                    tbl.nowrap;
                    tHead.innerHTML+="<tr style=\"background-color:powderblue;font-size:20px;text-align:center;\"><th style=\"font-size:20px;text-align:center;\">Username</th><th style=\"font-size:20px;text-align:center;\">Bag Count</th><th style=\"font-size:20px;text-align:center;\">Total Items</th><th style=\"font-size:20px;text-align:center;\">Zone</th><th nowrap style=\"font-size:20px;text-align:center;\">Last Scan</th><th style=\"font-size:20px;text-align:center;\">Last Action</th><th style=\"font-size:20px;text-align:center;\">Rate Last Hour<br>Goal: 100+</th></tr>";

                    tbl.appendChild(tHead);
                    //cellUser.style.fontSize="20px";


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
                        var cellItemCount = document.createElement("td");
                        var cellItemCountText = document.createTextNode(dictItemCount[user]);
                        var cellZone = document.createElement("td");
                        var cellZoneText = document.createTextNode(dictUsersZone[user]);
                        var cellAction = document.createElement("td");
                        var cellActionText = document.createTextNode(dictUserAction[user]);
                        var cellTime = document.createElement("td");
                        var cellTimeText = document.createTextNode(getMins(dictUserLastTime[user]));

                        tbl.style.padding="15px";
                        cellUser.style.fontSize="20px";
                        cellCount.style.fontSize="20px";
                        cellItemCount.style.fontSize="20px";
                        cellZone.style.fontSize="20px";
                        cellTime.style.fontSize="20px";
                        cellAction.style.fontSize="20px";
                        cellUser.style.textAlign="center";
                        cellCount.style.textAlign="center";
                        cellItemCount.style.textAlign="center";
                        cellZone.style.textAlign="center";
                        cellTime.style.textAlign="center";
                        cellAction.style.textAlign="center";

                        try {
                            if (dictUserLastTime[user].split(" ")[0] > 9) {
                                cellTime.style.background = "red";
                            }
                        } catch {
                            //do nothing
                        }


                        //cellTime.nowrap;

                        cellUser.appendChild(cellUserText);
                        cellCount.appendChild(cellCountText);
                        cellItemCount.appendChild(cellItemCountText);
                        cellZone.appendChild(cellZoneText);
                        cellAction.appendChild(cellActionText);
                        cellTime.appendChild(cellTimeText);
                        row.appendChild(cellUser);
                        row.appendChild(cellCount);
                        row.appendChild(cellItemCount);
                        row.appendChild(cellZone);
                        row.appendChild(cellTime);
                        row.appendChild(cellAction);
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

                var first = document.getElementsByTagName("h3")[0];
                //console.log(first);
                if (isPortal) {
                    first.prepend(tbl);
                } else {
                    table.prepend(tbl);
                }

                    //table.prepend(tbl);
                    // tbl border attribute to
                    //    tbl.setAttribute("border", "2");
                    //     tbl.setAttribute("font-size", "0.9em");
                    //     tbl.style.backgroundColor = "yellow";
                    //     tbl.style.fontSize="0.9em";
                    tbl.style.width = "800px";
                    //tbl.before(document.createElement("br"));
                    tbl.after(document.createElement("br"));




                getRates(tbl);


            //      });


                //end of code
                ////////////////////////////////////////////////
            }
            request.send();

            autoReload(30);


            //console.log("shelbrut: " + dictUserAction[dg]);

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


    function getMins(myTime) {
        try {
            var arrTime = myTime.split(" ");
            return(arrTime[0] + " mins");
        } catch {
            return("--");
        }

    }



//    }

//     function getLastActionTime(login) {
//             console.log(login);
//             // get last action
//             let request = new XMLHttpRequest();
//             request.open("GET", "/labor_tracking/lookup_history?user_name=" + login);
//             request.responseType = "document";
//             request.onloadend = function() {
//                 let lastAction = "";
//                 let lastTime = "";
//                 if(window.location.href.match("aftlite-portal")) {
//                     let table = request.responseXML.getElementsByTagName("table")[1];
//                     lastAction = table.rows[1].cells[1].lastChild.textContent.trim();
//                     lastTime = table.rows[1].cells[0].lastChild.textContent.trim();
//                 } else {
//                     let table = request.responseXML.getElementsByClassName("reportLayout")[0];
//                     lastAction = table.rows[1].cells[1].innerHTML.trim();
//                     lastTime = table.rows[1].cells[0].innerHTML.trim();
//                 }
//                 //let cell = row.cells[2];
//                 console.log("Last Action: " + lastAction);
//                 console.log("Last Time: " + lastTime);
// //                 if(lastAction == "EOS") {
// //                     cell.innerHTML = cell.innerHTML.replace(login, `<span style="background-color:red;">${login}(${lastAction})</span>`);
// //                 } else cell.innerHTML = cell.innerHTML.replace(login, `${login}(${lastAction})`);
//             }
//             request.send();
//     }

    function handleVisibilityChange() {
        if (document[hidden]) {
            //console.log("changed to hidden");
        } else {
            //console.log("changed to visible");
            autoReload(1);
        }
    }



    function getRates(tabletoAddRatesTo) {

        console.log("tabletoAddRatesTo has this many rows: " + tabletoAddRatesTo.rows.length);

        let request = new XMLHttpRequest();

        //var queryString = "startDateId=07/21/2021&endDateId=07/21/2021&startDate-m=7&startDate-d=21&startDate-y=2021&endDate-m=7&endDate-d=21&endDate-y=2021&date[start_hour]=11&date[end_hour]=11&function=pack&zone=--";

        let data = new FormData();
        var myDate = "07/23/2021";
        //     data.append("startDateId", myDate);
        //     data.append("endDateId", myDate);
        //     data.append("startDate-m", 7);
        //     data.append("startDate-d", 21);
        //     data.append("startDate-y", 2021);
        //     data.append("endDate-m", 7);
        //     data.append("endDate-d", 21);
        //     data.append("endDate-y", 2021);
        //     data.append("date[start_hour]", 11);
        //     data.append("date[end_hour]", 11);
        //     data.append("function", "pack");
        //     data.append("zone", "--");
        //     data.append("commit", "Generate Report");

        var lastHDT = new Date();
        console.log(lastHDT);
        lastHDT.setHours(lastHDT.getHours() -1);
        //console.log(currDateTime);
        console.log(lastHDT);

        var lastHour = lastHDT.getHours();
        var lastDate = lastHDT.getDate();
        var lastMonth = lastHDT.getMonth()+1;
        var lastYear = lastHDT.getFullYear();

        console.log("lastHourDateTime: " + lastHDT);
        console.log("hr " + lastHour);
        console.log("Date " + lastDate);
        console.log("Month " + lastMonth);
        console.log("Year: " + lastYear);



        data.append("date[start_month]", lastMonth);
        data.append("date_start_month", lastMonth);
        data.append("date[start_day]", lastDate);
        data.append("date_start_day", lastDate);
        data.append("date[start_year]", lastYear);
        data.append("date_start_year", lastYear);
        data.append("date[start_hour]", lastHour);
        data.append("date_start_hour", lastHour);

        data.append("date[end_month]", lastMonth);
        data.append("date_end_month", lastMonth);
        data.append("date[end_day]", lastDate);
        data.append("date_end_day", lastDate);
        data.append("date[end_year]", lastYear);
        data.append("date_end_year", lastYear);
        data.append("date[end_hour]", lastHour);
        data.append("date_end_hour", lastHour);

        data.append("function", "pack");
        data.append("zone", "--");

        var dictUserRate = {}

        request.open("POST", "/labor_tracking/uph_drilldown", true);
        request.responseType = "document";
        request.onloadend = function() {
            if(request.readyState == 4 && request.status == 200) {
                //console.log(request.responseXML);

                let xtable = request.responseXML.getElementsByTagName("table")[2];
                let xform = request.responseXML.getElementsByTagName("form")[0];
                console.log(xtable);

                var i=0;
                for(let row of xtable.rows) {
                    if (i>0) {
                        var rtUserName = row.cells[0].innerHTML.toUpperCase();
                        var rtUserRate = parseInt(row.cells[4].getElementsByTagName("b")[0].innerHTML);
                        dictUserRate[rtUserName]= rtUserRate;
                        console.log(rtUserName + ": " + dictUserRate[rtUserName]);

                    }
                    i++;
                }

                console.log("**********************");

                //for (let raterows of tabletoAddRatesTo) {
                for (var j = 1; j < tabletoAddRatesTo.rows.length; j++) {
                    //david
                    var myRow = tabletoAddRatesTo.rows[j];
                    var myUser = myRow.cells[0].innerHTML.toUpperCase();
                    if (typeof dictUserRate[myUser] == "undefined") {
                        myRate = "--";
                    } else {
                        var myRate = dictUserRate[myUser];
                    }
                    console.log(myUser + ": " + myRate);
                    let rateCell = document.createElement("td");
                    rateCell.innerHTML = myRate;
                    myRow.appendChild(rateCell);
                    rateCell.style.fontSize="20px";
                    rateCell.style.textAlign="center";

                }


            } //end if
        } //end onloadend function
        request.send(data);
    } // end of function




})();