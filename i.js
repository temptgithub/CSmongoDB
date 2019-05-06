
const express = require("express");    // this is all you need for a server

const app = express();    // variable run as a function

const bodyParser = require("body-parser");

const fs = require("fs");

const mongoose = require("mongoose");


let http = require("http").Server(app);  //class with a Server Method that accepts express server as variable intake

app.use("/", express.static("./client") ); // serving the files on client-this is in reference to the html?

// app.use("/secretfolder", express.static("private/") );   // setting up different static directory roots -  routing to different folder

// following two lines are for body parser to understand objects thru post requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));





const port =3000;

const connection = "mongodb+srv://nodeuser:123456nodeuser@cluster0-oc6sg.mongodb.net/test?retryWrites=true";



app.listen(port);



/*

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://practiceUser:<password>@mongopractice-matuh.mongodb.net/test?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {

  const collection = client.db("test").collection("devices");

  // perform actions on the collection object

  client.close();

});

*/


mongoose.connect(connection, (error) => {

  if (error) {

      console.log(`Failed to connect to database ${error}`);

  } else {

      console.log(`Successfully connected to database`);



  }



});             // connects to internet



mongoose.Promise = global.Promise;  // js built in class to understand what promise is

//copies js promise to Mongoose


let db = mongoose.connection;  // defining the database as a variable

// turning on the database connection, bind connects btwn objects eg console w/ err txt msgs

//on and connect are mongol methods

db.on('error', console.error.bind(console, "MongoDB connection error: "));

//nosql how to save an objects uses js class to organize things

// grabs a copy of the empty Mongoose package class





//grabs copy of message schema class



let Schema = mongoose.Schema;

// customizes our empty class innto a custom class and stored i mySchema.

// making columns for rows



// customizes our empty class into a custom class and stored in mySchema

let messageSchema = new mongoose.Schema({

    reallyCoolProp: String,
    user: String,
    message: String,
    timestamp: Number

//    let unixtime =   Math.round(new Date("2019").getTime()/1000);

} );



// model lets us create a new database with the name messages and only allows the messageSchema

let messageModel = new mongoose.model("messages", messageSchema);



//Post handler





app.post("/saveMessage", (req,res)=> {

    //    console.log(req.body.message);

    let date = new Date();  // classes
    let allMessages;   // to have it just in this scope of the post handler

	  console.log(req.body.user);

    // build new object

    let newMessage = new messageModel({

        reallyCoolProp: "very important",  // if not in schema it wont go into database
        user: req.body.user,
        message: req.body.message,
        timestamp: date.getTime() //server's time

    });



    newMessage.save((error)=> {

      if (error) {

          console.log("there was an issue with mongoose",error);
          res.sendStatus(500);

      } else {

           console.log("document saved and will find");



           // look for message that starts with w or h /^w|^h/

           // if you use findOne instead it looks for the first one the oldest

           //  messageModel.find({}, (error, results)   will find all eg select *

//             messageModel.find({message: /^w|^h/}, (error, results) => {

            messageModel.find({}, (error, results) => {

              allMessages = results;

  //               console.log(results);  // id property of object allMessages index 3

               console.log(allMessages[1]._id,"test");
               console.log(allMessages, "line 110");

              let objectToDelete = allMessages[1]._id;

              messageModel.findByIdAndDelete(objectToDelete, (error,results) => {
                  console.log(error,results);
                  console.log(`the 4th item in the database was deleted`);
              });

              let objectToUpdate = allMessages[0]._id;

      				messageModel.findByIdAndUpdate( objectToUpdate, {user: "Phone"}, (error, results) => {
      					console.log(error, results);
      					console.log("The 1 first item was updated.");

      				});



      			 });



           res.sendStatus(200);

         }

       });

});

// find method to find specific element in database



//searching for message hi! in the schema

//results is what met search criteria of  hi!

  //messageModel.find({message: "hi!"}, (error, results)=> {

  //  console.log(results.toString());

  //});





//});











/*

let usersSchema = new mongoose.Schema(

{

     // method to make row unique in database starts w/ underscore in mongoldb

    "userid": String,

    "firstName": String,

    "lastName": String,

    "age": Number,

    "isActive": Boolean

}

);

*/





// to tell mongoose what collections to be saved in ... what to store where

//let usersModel = new mongoose.model("users", usersSchema);

// creating the first data for the mongol document

/*

let myFirstUser = new usersModel(

{

  userId: "TheGas",

  "firstName": "Lafarius",

  lastName: 24,

  isActive: true

}

);



myFirstUser.save((error) => {



  if (error) {

    console.log(`There was an error saving your document! `);

  } else {

    console.log(`Your document was successfully saved to the database! `);

  }









});

*/

//



