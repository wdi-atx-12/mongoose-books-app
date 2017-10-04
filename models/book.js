const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: String,
 });

var Book = mongoose.model('Book', BookSchema);

// export Book from this file
// make this available to our other files
module.exports = Book;


// ???
// #3 You can use the Mongo shell to check
// what's now in your database, or start
// interacting with it through the server files.
// If you got an error message above,
// FIX IT BEFORE YOU MOVE ON. If you're stuck, ask for help.??
