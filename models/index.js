var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = 'mongodb://sleeptightiger:jamesleer@ds161164.mlab.com:61164/books';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// connect mongoose to your Mongo DB here
//mongoose.connection.openUri(process.env.DB_CONN);
// add exports here
module.exports.Book = require("./book.js");
