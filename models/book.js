var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
     title: String,
     author: String,
     image: String,
     releaseDate: Date
 });

 var Book = mongoose.model('Book', BookSchema);

 module.exports = Book;
