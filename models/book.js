var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  release_date: String
})

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
