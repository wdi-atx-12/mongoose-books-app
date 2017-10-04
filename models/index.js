var mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');

// connect mongoose to your Mongo DB here
require("dotenv").config();
mongoose.connect.openUri(process.env.DB_CONN);

// add exports here
module.exports.Book = ('./book.js');

//App SETUP
