// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var port = process.env.PORT || 3000;

//require express in our app
var express = require('express'),
bodyParser = require('body-parser'),
mongoose 	= require('mongoose');


// generate a new express app and call it 'app'
var app = express();

//mongoose connection

var DB = require('./models');

//var User = require('./models/user');

app.set('views','./views');
app.set('view engine', 'ejs');

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


////////////////////
//  DATA
///////////////////

var books = [
	{
		_id: 15,
		title: "The Four Hour Workweek",
		author: "Tim Ferriss",
		image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
		release_date: "April 1, 2007"
	},
	{
		_id: 16,
		title: "Of Mice and Men",
		author: "John Steinbeck",
		image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
		release_date: "Unknown 1937"
	},
	{
		_id: 17,
		title: "Romeo and Juliet",
		author: "William Shakespeare",
		image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
		release_date: "Unknown 1597"
	}
];


var newBookUUID = 18;



function GetObjectFromKeyValuePairs(pairs)
{
	var tmp = {};

	for(var key in pairs)
		if(key[0] !== "_")
			tmp[`${key}`] = `${pairs[key]}`;
	return tmp;
}



////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
	res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
	// send all books as JSON response
	console.log('books index');
	DB.Book.find({}, (err, allBooks) => {
		if (err) throw err;
		res.json({users: allBooks})
	});
});

// get one book
app.get('/api/books/:id', function (req, res) {
	// find one book by its id
	console.log('books show', req.params);
	DB.Book.findOne({_id: req.params.id}, (err, fBook) => {
		res.json(fBook);
	});
});

// create new book
app.post('/api/books', function (req, res) {
	// create new book with form data (`req.body`)
	console.log('books create', req.body);
	var newBook = DB.Book(GetObjectFromKeyValuePairs(req.body));
	newBook.save((err,user) => {
		res.send(newBook);
	});
});

// update book
app.put('/api/books/:id', function(req,res){
	var changeBook = GetObjectFromKeyValuePairs(req.body);
	console.log('books update', req.params.id);
	DB.Book.findOneAndUpdate({_id: req.params.id}, changeBook, {new:true}, (err, fBook) => {
		res.json(changeBook);
	});
});

// delete book
app.delete('/api/books/:id', function (req, res) {
	// get book id from url params (`req.params`)
	console.log('books delete', req.params);

	DB.Book.findOneAndRemove({_id: req.params.id}, (err, fBook) => {
		res.json(fBook);
	});
});



app.listen(port, function() {
	console.log('Book app listening on port ' + port);
});
