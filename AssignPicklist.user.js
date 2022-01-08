// ==UserScript==
// @name         AssignPicklist
// @namespace    https://github.com/jgray0705/UserScripts
// @version      0.3
// @description  Print out pick list IDs for Manual bigs assignments
// @author       dvglenn@
// @match        https://aftlite-portal.amazon.com/list_picklist/view_picklists*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let table = window.location.href.match("aftlite-na") ? document.querySelectorAll("table")[1] : document.querySelectorAll("table")[0];

    var PickListString = "";
    var i=0;
    for(let row of table.rows) {
        if(i>0) {
            PickListString = PickListString + row.cells[0].innerText;
            PickListString = PickListString + " ";
        }
        i=i+1;
    }

    var idSpan = document.createElement("span");
    var idPickList = document.createElement("div");
    //idSpan.appendChild(idPickList);
    //idSpan.style.padding = "10px 10px 10px 10px";
    idPickList.id = "idPickList";
    const newContent = document.createTextNode(PickListString);
    //idPickList.appendChild(newContent);
    //document.body.appendChild(idSpan);

    let button = document.createElement("button");
    button.innerHTML = "Copy All";
    button.onclick = function() {
        var r = document.createRange();
        r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.open("/picklist_group/create");
    }

    let buttonCopy14 = document.createElement("button");
    buttonCopy14.innerHTML = "Copy 14";
    buttonCopy14.onclick = function() {
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, 112);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.open("/picklist_group/create");
    }

    let buttonCopy7 = document.createElement("button");
    buttonCopy7.innerHTML = "Copy 7";
    buttonCopy7.onclick = function() {
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, 55);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.open("/picklist_group/create");
    }

    if(i>7){
        idSpan.appendChild(buttonCopy7);
    }
    if(i>14){
        idSpan.appendChild(buttonCopy14);
    }
    idSpan.appendChild(button);
    idPickList.appendChild(newContent);
    idSpan.appendChild(idPickList);



    //document.body.after(button);

    idSpan.style.padding = "20px 20px 20px 20px";
    document.body.appendChild(idSpan);

    //document.getElementById("idPickList").style.padding = "10px 3px 10px 10px";
    //var p = document.createElement("p");
    //document.body.appendChild(p);

})();




