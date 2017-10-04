const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: Date,
 });

var Book = mongoose.model('Book', BookSchema);

// export Book from this file
// make this available to our other files
module.exports = Book;
