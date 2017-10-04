// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var port = process.env.PORT || 3000;

//require express in our app
var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  db.Book.find(function(err, books) {
    if(err) throw err;
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  db.Book.findById(req.params.id, function(err, foundBook) {
    if(err) throw err;
    res.json(foundBook);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);

  var newBook = db.Book(getBookInfo(req.body));
  newBook.save(function(err, book) {
    if(err) throw err;
    res.json(book);
  });
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  var bookId = req.params.id;
  db.Book.findByIdAndUpdate(bookId, getBookInfo(req.body), {new: true}
    , function(err, updatedBook) {
    if(err) throw err;
    res.json(updatedBook);
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  db.Book.findByIdAndRemove(bookId, function(err, removedBook) {
    if(err) throw err;
    res.json(removedBook);
  })
});

app.listen(port, function() {
  console.log('Book app listening on port ' + port);
});

function getBookInfo(params) {
  let newBookInfo = {};
  if(params.title) { newBookInfo.title = params.title; }
  if(params.author) { newBookInfo.author = params.author; }
  if(params.image) { newBookInfo.image = params.image; }
  if(params.releaseDate) { newBookInfo.releaseDate = params.releaseDate; }
  return newBookInfo;
}
