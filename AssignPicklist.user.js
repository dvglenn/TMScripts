// ==UserScript==
// @name         AssignPicklist
// @namespace    https://github.com/jgray0705/UserScripts
// @version      0.5
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

    let arrPickList = PickListString.split(" ");
      // add 1 to include spaces
    let lenPickListID = (arrPickList[0].length+1);

    console.log("Picklist length: " + lenPickListID);

    var AssignList;



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

    let buttonCopy3 = document.createElement("button");
    buttonCopy3.innerHTML = "Copy 3";
    buttonCopy3.onclick = function() {
        const NumberOfIDToCopy = 3;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        //console.log(NumberOfIDToCopy);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        console.log(r);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        window.getSelection.toString();
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    let buttonCopy4 = document.createElement("button");
    buttonCopy4.innerHTML = "Copy 4";
    buttonCopy4.onclick = function() {
        const NumberOfIDToCopy = 4;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        console.log(NumberOfIDToCopy);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    let buttonCopy5 = document.createElement("button");
    buttonCopy5.innerHTML = "Copy 5";
    buttonCopy5.onclick = function() {
        const NumberOfIDToCopy = 5;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        console.log(NumberOfIDToCopy);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 7;
    let buttonCopy7 = document.createElement("button");
    buttonCopy7.innerHTML = "Copy 7";
    buttonCopy7.onclick = function() {
        const NumberOfIDToCopy = 7;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 8;
    let buttonCopy8 = document.createElement("button");
    buttonCopy8.innerHTML = "Copy 8";
    buttonCopy8.onclick = function() {
        const NumberOfIDToCopy = 8;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 10;
    let buttonCopy10 = document.createElement("button");
    buttonCopy10.innerHTML = "Copy 10";
    buttonCopy10.onclick = function() {
        const NumberOfIDToCopy = 10;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 14;
    let buttonCopy14 = document.createElement("button");
    buttonCopy14.innerHTML = "Copy 14";
    buttonCopy14.onclick = function() {
        const NumberOfIDToCopy = 14;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 20;
    let buttonCopy20 = document.createElement("button");
    buttonCopy20.innerHTML = "Copy 20";
    buttonCopy20.onclick = function() {
        const NumberOfIDToCopy = 20;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }

    //NumberOfIDToCopy = 25;
    let buttonCopy25 = document.createElement("button");
    buttonCopy25.innerHTML = "Copy 25";
    buttonCopy25.onclick = function() {
        const NumberOfIDToCopy = 25;
        var r = document.createRange();
        const nodePickList = document.getElementById("idPickList").childNodes[0];
        r.setStart(nodePickList, 0);
        r.setEnd(nodePickList, lenPickListID*NumberOfIDToCopy);
        //r.selectNode(document.getElementById("idPickList"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        AssignList = PickListString.substring(0,lenPickListID*NumberOfIDToCopy);
        window.open("/picklist_group/create?AssignList="+AssignList.trim().replace(/ /g, "x"));
    }



    if(i>3){
        idSpan.appendChild(buttonCopy3);
    }
    if(i>4){
        idSpan.appendChild(buttonCopy4);
    }
    if(i>5){
        idSpan.appendChild(buttonCopy5);
    }
    if(i>7){
        idSpan.appendChild(buttonCopy7);
    }
    if(i>8){
        idSpan.appendChild(buttonCopy8);
    }
    if(i>10){
        idSpan.appendChild(buttonCopy10);
    }
    if(i>14){
        idSpan.appendChild(buttonCopy14);
    }
    if(i>20){
        idSpan.appendChild(buttonCopy20);
    }
    if(i>25){
        idSpan.appendChild(buttonCopy25);
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


function createCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime()+(' + cookieTime + '*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
}

})();




