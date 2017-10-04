var mongoose = require("mongoose");
require('dotenv').config();

// connect mongoose to your Mongo DB here
mongoose.connection.openUri(process.env.DB_CONN);
var Books = require('books');

// add exports here
module.exports.Book = require("books.js");
