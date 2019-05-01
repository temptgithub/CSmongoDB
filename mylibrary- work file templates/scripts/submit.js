"use strict";  // submit.js is front end
console.log("File Detected");
// below are jquery
$(document).ready(function() {
console.log( "jquery is loaded after document ready from index.html");

    $("#save").click(()=> {
      console.log("something");

      let value = $("#number").val();


      let dataToSendToServer = {"userNumber": value};
        //$.post("location","data",callback function to do stuff)
        //$.post("http://localhost:3000,"retrieveList","hello server",function(){
        //  console.log("the server  has responded")   // below using es6 notation
        //making a post request with name of numberSaver ajax  shorthand below for post
          $.post("http://localhost:3000/numberSaver",dataToSendToServer, (dataRecievedInResponse) => {
            console.log("the number was sent to the server");
            //console.log("the server sent the following:", data);
            console.log("We receive", dataRecievedInResponse);

           let nn = Object.values(dataRecievedInResponse);

           $("#status").html("<p>  Congrats your number submitted to server </p>");
            //let num = nn.sort((a, b) => (a.currentNumbers > b.currentNumbers) ? 1 : -1);
            let num = nn.reverse();
           $("#status").html(`<p>   your numbers are:  ${num} </p> `);
// array = array.reverse();
//for (let i = 0;i <array.length;i++) {
// $("history".append("<p> + (i + 1) + ") " + array[i] + "</p>");
//}





          });

    });


});  // jquery sending a string to the Server


console.log("script finished");
