const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  releaseDate : Date
})

var Book = mongoose.model('Book', BookSchema);

// make this availabe in our other files
module.exports = Book;


