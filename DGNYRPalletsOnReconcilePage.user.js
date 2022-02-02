// ==UserScript==
// @name         DGNYRPalletsOnReconcilePage
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.2
// @description  Dock Received helper to give additional links to close any NYR pallets
// @author       dvglenn@
// @match        https://aftlite-na.amazon.com/dock_receive/reconcile_shorts_overages*
// @match        https://aftlite-portal.amazon.com/dock_receive/reconcile_shorts_overages*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var na;
    if(window.location.href.match("aftlite-na")) {
        na=true;
    } else {
        na=false;
    }

        let request = new XMLHttpRequest();

        request.open("GET", "/dock_receive/view_nyr_pallets", true);
        //request.open("GET", "https://aftlite-portal.amazon.com/dock_receive/view_nyr_pallets", true);
        request.responseType = "document";
        request.onloadend = function() {

            var po = "";
            var pallet = "";
            var closeURL = "";

            //Table from NYR page we retrieved separately
            //var xtable = request.responseXML.getElementsByTagName("table")[0];
            var xtable;
            if (na) {
                xtable = request.responseXML.getElementById("nyr_pallets");
            } else {
                xtable = request.responseXML.getElementsByTagName("table")[0];
            }

            //console.log("dg");
            //console.log(xtable);

            //Table from Current Dock Received page we are adding content into
            //var table = document.getElementsByTagName("table")[0];

            //for (var i = 0; i < table.rows.length; i++) {
//                     var currRow = table.rows[i];
//                     if(i%2==0) {
//                             currRow.style.background = "#FBFBFB";
//                         } else {
//                             //currRow.style.background = "#DFFFC2";
//                         }



//                     if (i==0) {
//                         var th = document.createElement("th");
//                         th.innerHTML = "Attached Pallets";
//                         currRow.appendChild(th);
//                         console.log("appended th");
//                     } else
//                     {
                        //var currPO = currRow.cells[0].getElementsByTagName("p")[0].innerHTML;
            const queryString = window.location.search;
            console.log(queryString);
            var currPO = queryString.replace("?po=", "");
            console.log(currPO);

  
//                         var td = document.createElement("td");

                         var cnt=0;

                         var closePallets = "";

                        for(let xrow of xtable.rows) {
                            if (cnt>0) {
                                //userName = row.cells[2].getElementsByTagName("a")[0].innerHTML;
                                //lastTime = row.cells[5].innerHTML.trim();
                                if (na) {
                                    pallet = xrow.cells[0].innerHTML.trim();
                                } else {
                                    pallet = xrow.cells[0].getElementsByTagName("p")[0].innerHTML;
                                }
                                console.log("Pallet: " + pallet);

                                if (na) {
                                    po = xrow.cells[1].innerHTML.trim();
                                } else {
                                    po = xrow.cells[1].getElementsByTagName("p")[0].innerHTML;
                                }
                                console.log("PO: " + po);


                                if (currPO==po) {
                                    console.log("POs match!");
                                    closeURL = xrow.cells[7].innerHTML;
                                    closeURL = closeURL.replace("Close", "Close " + pallet);
                                    //closeURL = closeURL.replace("a class", "a onclick=\"location.reload();\" target=\"nyr\" class");
                                    closeURL = closeURL.replace("rel=", "a target=\"nyr\" rel=");
                                    closePallets = closePallets + " " + closeURL;
                                    //console.log(po);
                                    //console.log(pallet);
                                    console.log(closeURL);
                                }


                            }
                            cnt++;
                        }
                        //td.innerHTML = closePallets;
                        //currRow.appendChild(td);
                        var p = document.createElement("p");
                        p.innerHTML = "Open Pallets: " + closePallets;
                        var form = document.getElementsByTagName("form")[0];
                        form.appendChild(p);

//                     }
             //}


    }
    request.send();




})();