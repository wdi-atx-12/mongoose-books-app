var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
     title: String,
     author: String,
     yearPublished: Date,
     publisher: String,
     type: String

    // you should fill the rest of this in
 });
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;
