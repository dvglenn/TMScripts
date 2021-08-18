// ==UserScript==
// @name         DGDockReceivedNYRPallets
// @namespace    https://github.com/dvglenn/TMScripts
// @version      0.1
// @description  Dock Received helper to give additional links to close any NYR pallets
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/dock_receive/view_received
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        let request = new XMLHttpRequest();

        request.open("GET", "/dock_receive/view_nyr_pallets", true);
        request.responseType = "document";
        request.onloadend = function() {

            var po = "";
            var pallet = "";
            var closeURL = "";

            //Table from NYR page we retrieved separately
            var xtable = request.responseXML.getElementsByTagName("table")[0];
            //Table from Current Dock Received page we are adding content into
            var table = document.getElementsByTagName("table")[0];

            for (var i = 0; i < table.rows.length; i++) {
                    var currRow = table.rows[i];
                    if(i%2==0) {
                            currRow.style.background = "#FBFBFB";
                        } else {
                            //currRow.style.background = "#DFFFC2";
                        }



                    if (i==0) {
                        var th = document.createElement("th");
                        th.innerHTML = "Attached Pallets";
                        currRow.appendChild(th);
                        console.log("appended th");
                    } else
                    {
                        var currPO = currRow.cells[0].getElementsByTagName("p")[0].innerHTML;
                        console.log(currPO);
                        var td = document.createElement("td");

                        var cnt=0;

                        var closePallets = "";

                        for(let xrow of xtable.rows) {
                            if (cnt>0) {
                                //userName = row.cells[2].getElementsByTagName("a")[0].innerHTML;
                                //lastTime = row.cells[5].innerHTML.trim();
                                pallet = xrow.cells[0].getElementsByTagName("p")[0].innerHTML.trim();
                                po = xrow.cells[1].getElementsByTagName("p")[0].innerHTML.trim();


                                if (currPO==po) {
                                    console.log("POs match!");
                                    closeURL = xrow.cells[7].innerHTML;
                                    closeURL = closeURL.replace("Close", "Close " + pallet);
                                    closeURL = closeURL.replace("a class", "a onclick=\"location.reload();\" target=\"nyr\" class");
                                    closePallets = closePallets + " " + closeURL;
                                    //console.log(po);
                                    //console.log(pallet);
                                    console.log(closeURL);
                                }


                            }
                            cnt++;
                        }
                        td.innerHTML = closePallets;
                        currRow.appendChild(td);

                    }
             }


    }
    request.send();




})();