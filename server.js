// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var port = process.env.PORT || 3000;

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//requires all exported models of the directory
var db = require('./models');

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
    if(err){
      console.log("index error: "+ err);
      res.sendStatus(500);
    }
    res.json(books);
  }); 
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var id = req.params.id;
  db.Book.findById(id, function(err, foundBook){
    res.json(foundBook);
  })
});

// create new book
app.post('/api/books', function (req, res) {
  var newBook = db.Book({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    releaseDate: req.body.releaseDate
  })

  newBook.save(function(err,book){
    res.send(`New book added: ${book}`);
  })
});

// update book
app.put('/api/books/:id', function(req,res){
  var id = req.params.id;
  var bookUpdate={
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    releaseDate: req.body.releaseDate
  }
  db.Book.findByIdAndUpdate(id, bookUpdate,{return:true}, function(err,update){
    res.json(update);
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  var id = req.params.id;

  db.Book.findByIdAndRemove(id, function(err,deleted){
    res.json(deleted);
  })

});


app.listen(port, function() {
  console.log('Book app listening on port ' + port);
});
