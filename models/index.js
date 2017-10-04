var mongoose = require("mongoose");

// connect mongoose to your Mongo DB here

require('dotenv').config();

mongoose.connection.openUri(process.env.DB_CONN);

//require('./models')
module.exports.Book = require("./book.js");
