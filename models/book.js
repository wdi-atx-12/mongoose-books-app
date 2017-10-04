var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('dotenv').config();
mongoose.connection.openUri(process.env.DB_CONN);



var BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: String
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;

