"use strict";
console.log("File Detected");
// below are jquery
$(document).ready(function() {
console.log( "jquery is loaded after document ready from index.html");

    $("#request-button").click(()=> {
      let dataToSendToServer = {"data": "hello server"};
        //$.post("location","data",callback function)
        //$.post("http://localhost:3000,"retrieveList","hello server",function(){
        //  console.log("the server  has responded")   // below using es6 notation
        //making a post request
          $.post("http://localhost:3000/",dataToSendToServer, (response) => {
            console.log("the server  has responded");
            console.log("the server sent the following:", response);

          });

    });


});  // jquery sending a string to the Server


console.log("script finished");
