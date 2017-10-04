// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var port = process.env.PORT || 3000;

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');
const mongoose = require('mongoose');
var db = require('./models')

// require('dotenv').config() // RE-ADD THIS

//mongoose connection
// mongoose.connection.openUri(process.env.DB_CONN);

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////

// var books = [
//   {
//     _id: 15,
//     title: "The Four Hour Workweek",
//     author: "Tim Ferriss",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
//     release_date: "April 1, 2007"
//   },
//   {
//     _id: 16,
//     title: "Of Mice and Men",
//     author: "John Steinbeck",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
//     release_date: "Unknown 1937"
//   },
//   {
//     _id: 17,
//     title: "Romeo and Juliet",
//     author: "William Shakespeare",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
//     release_date: "Unknown 1597"
//   }
// ];


var newBookUUID = 18;







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
  db.Book.find(function(err, books){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book -- DONE
app.get('/api/books/:id', function (req, res) {
  var bookId = req.params.id;
  db.Book.findOne({_id: bookId}, function(err, foundUser) {
    res.json(foundUser);
  })
  console.log('books show', req.params);
  // for(var i=0; i < books.length; i++) {
  //   if (books[i]._id === req.params.id) {
  //     res.json(books[i]);
  //     break; // we found the right book, we can stop searching
  //   }
  // }
});

// create new book
app.post('/api/books', function (req, res) {
  var newBook = db.Book({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });

  newBook.save(function(err, book) {
    res.send(`book created: ${book}`)
  });

  console.log('books create', req.body);
  // var newBook = req.body;
  // newBook._id = newBookUUID++;
  // books.push(newBook);
  // res.json(newBook);
});

// update book
app.put('/api/books/:id', function(req,res){
  var bookId = req.params.id;
  var updateBook = {
    title: req.body.title
  };

  db.Book.findByIdandUpdate({_id: bookId}, updateBook, (err, updatedBook) => {
    res.json(updatedBook);
  })
  // console.log('books update', req.params);
//   var bookId = req.params.id;
//   // find the index of the book we want to remove
//   var updateBookIndex = books.findIndex(function(element, index) {
//     return (element._id === parseInt(req.params.id)); //params are strings
//   });
//   console.log('updating book with index', deleteBookIndex);
//   var bookToUpdate = books[deleteBookIndex];
//   books.splice(updateBookIndex, 1, req.params);
//   res.json(req.params);
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  var bookId = req.params.id;
  db.Book.findOneAndRemove({_id: bookId}, function(err, deleteBook) {
    res.json(deleteBook);
  });
  console.log('books delete', req.params);
//   var bookId = req.params.id;
//   // find the index of the book we want to remove
//   var deleteBookIndex = books.findIndex(function(element, index) {
//     return (element._id === parseInt(req.params.id)); //params are strings
//   });
//   console.log('deleting book with index', deleteBookIndex);
//   var bookToDelete = books[deleteBookIndex];
//   books.splice(deleteBookIndex, 1);
//   res.json(bookToDelete);
});


// START THE APP
app.listen(port, function() {
  console.log('Book app listening on port ' + port);
});
