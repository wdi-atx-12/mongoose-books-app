var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema ({
  title: 'string',
  author: 'string',
  image: 'string',
  releaseDate: 'string'
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
