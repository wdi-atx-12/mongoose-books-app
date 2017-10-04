const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = global.Promise;

let db = require('./models');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', (req, res) => {
  db.Book.find({}).then((books) => {
      if (!books) {
        res.status(404).send();
      }
      res.send(books);
    }).catch((e) => {
      res.status(500).send();
    });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  let bookId = req.params.id;

  db.Book.findById(bookId).then((bookFound) => {
    if (!bookFound) {
      return res.status(404).send();
    }
    res.send(bookFound);
  }).catch((e) => {
    res.status(400).send();
  });
});

// create new book
app.post('/api/books', function (req, res) {
  let body = _.pick(req.body, ['title','author','image','releaseDate']);
  let book = new db.Book(body);

  book.save().then((book) => {
    res.send();
  }).catch((e) => {
    res.status(400).send();
  });
});

// update book
app.put('/api/books/:id', function(req,res){
  let bookId = req.params.id;
  let body = _.pick(req.body, ['title','author','image','releaseDate']);
  

  db.Book.findByIdAndUpdate(bookId, {
    $set: body,
    new: true
  }).then((updateUser) => {
    if (!updateUser) {
      return res.status(404).send();
    }
    res.send(updateUser);
  }).catch((e) => {
    res.status(400).send();
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  let bookId = req.params.id;

  db.Book.findByIdAndRemove(bookId).then((deleteBook) => {
    if (!deleteBook) {
      return res.status(404).send();
    }
    res.send(deleteBook);
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(port, function() {
  console.log('Book app listening on port ' + port);
});
