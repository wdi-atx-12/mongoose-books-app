const mongoose 	= require('mongoose');

require('dotenv').config();

mongoose.connection.openUri(process.env.DB_CONN);

//require('./models')
module.exports.Book = require("./book.js");
