const express = require("express");
const mongoose = require("mongoose");

const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");

app.use("/", express.static("./client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = 3000;
const connection = "mongodb+srv://nodeuser:123456nodeuser@cluster0-oc6sg.mongodb.net/test?retryWrites=true";
http.listen(port);
console.log("Express is now running.");

mongoose.connect(connection, (error) => {
	if (error) {
		console.log("There was an error with Mongoose", error);
	} else {
		console.log("Connection successful");
	}
});

// Copies JS Promise to mongoose.
mongoose.Promise = global.Promise;

let db = mongoose.connection;

// Tells mongoose what to do with MongoDB errors and also tells it to send it to the JS console.
db.on('error', console.error.bind(console, "MongoDB connection error: "));

// Grabs a copy of the empty Mongoose Schema class.
let Schema = mongoose.Schema;

// Customizes our empty class into a custom class and stored in mySchema.
let messageSchema = new mongoose.Schema({
	user: String,
	message: String,
	timestamp: Number
});

// Model lets us create a new database with the name messages and only allows the messageSchema types in this database.
let messageModel = new mongoose.model("messages", messageSchema);



// Post handler
app.post("/saveMessage", (req, res) => {

	let date = new Date();
	let allMessages;
	
	console.log(req.body.user);

	let newMessage = new messageModel({
		reallyCoolProp: "very important",
		user: req.body.user,
		message: req.body.message,
		timestamp: date.getTime()
	});

	newMessage.save((error) => {
		if (error) {
			console.log("There was an issue with Mongoose", error);
			res.sendStatus(500);
		} else {
			console.log("Document saved");
			
			
			messageModel.find({}, (error, results) => {
				console.log(results);	
				allMessages = results;
				
				console.log(allMessages[3]._id);
				
				let objectToDelete = allMessages[3]._id;
				
				messageModel.findByIdAndDelete(objectToDelete, (error, results) => {
					console.log(error, results);
					console.log("The 4th item in the database was delete!");
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