var mongoose = require("mongoose");
require('dotenv').config();
mongoose.connection.openUri(process.env.DB_CONN);

// add exports here
module.exports.Book = require("./book.js");
