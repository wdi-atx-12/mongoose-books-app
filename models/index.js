const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.openUri(process.env.DB_MONGO_URI);

module.exports.Book = require('./book.js');