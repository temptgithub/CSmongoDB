const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();
let http = require("http").Server(app);
let dbConnect = "mongodb+srv://todoappuser:123456todoappuser@cluster0-zqlnr.mongodb.net/test?retryWrites=true";

mongoose.connect(dbConnect, { useNewUrlParser: true }, (error) => {
	if (error) {
		console.log("There was an error connecting to MongoDB", error);
	}else {
		console.log("Successfully connected to MongoDB");
	}
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static("client/"));

const port = 3000;
http.listen(port);

console.log("Express is now running on port " + port);

// End of static code.

let Schema = mongoose.Schema;

let todoSchema = new Schema({
	username: String,
	title: String,
	description: String,
	priority: String, // Change back to number when properly converted.
	dueDate: String, // Use JavaScript Date object. Change back to number when properly converted.
	status: Boolean,
	list: String
});

let todoModel = new mongoose.model("notes", todoSchema);

// A post handler for creating notes
app.post("/createNote", (request, response) => {
	console.log("Request sends the following: ", request.body);
	
	// Creates a new mongoose object for a new note
	let newNote = new todoModel({
		username: request.body.username,
		title: request.body.title,
		description: request.body.description,
		priority: request.body.priority,
		dueDate: request.body.dueDate,
		status: request.body.status,
		list: null
	});
	
	// Save note to MongoDB.
	newNote.save((error) => {
		responseState(error, response, 200);
	});	
});

// A post handler for reading notes from the db and sending them to the front end.
app.post("/readNotes", (request, response) => {
		
	// Searches the MongoDB database and gets all the notes.
	todoModel.find({}, (error, results) => {
		responseState(error, response, {notes: results});
	});
	
});

// A post handler for deleting a note from the database.
app.post("/deleteNote", (request, response) => {
	
	// Make sure the request was sent by a valid user.
	
	// Searches the MongoDB by an ID, and deletes this document.
	todoModel.findByIdAndDelete(request.body._id, (error, results) => {
		responseState(error, response, {deleted: results});
	});

});

app.post("/updateNote", (request, response) => {

	let propertiesToUpdate = {
		username: request.body.username,
		title: request.body.title,
		description: request.body.description,
		priority: request.body.priority,
		dueDate: request.body.dueDate,
		status: request.body.status,
		list: null
	};

	todoModel.findByIdAndUpdate(request.body._id, propertiesToUpdate, (error, results) => {
		responseState(error, response, {updated: results});
	});

});



function responseState(error, response, send) {
	console.log("responseState fired");
	if (error) {
		console.log("Something happened with mongoose.", error);
		response.sendStatus(500);
	} else {
		//console.log(typeof send);
		if (typeof send == "number") {
		//console.log("responding with sendStatus", send)
			response.sendStatus(send);
		} else if (typeof send == "object") {
			response.send(send);
		}
	}

}
