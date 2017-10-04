const mongoose 	= require('mongoose');

var Book = mongoose.model('Book',new mongoose.Schema({
	title: 			String,
	author:  		String,
	image:  		String,
	releaseDate: 	Date
}));

module.exports = Book;
