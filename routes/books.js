'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/book_fns');


var notImplement = (req,res) => {
  res.send( req.method + ' this method is not yet implemented for books')
}

//get all books
// router.get('/', /*getBooksfromSQL, */notImplement )
router
  .get('/', db.getBooks, (req,res) => {
    res.render('books/bindex', {books:res.books});
  });

//get single book

//post (add) new book
//users should not be able to access this unless logged in.
router
  .get('/new_Book', (req,res) => {
    res.render('books/new_book', {
      book: {
        title:'',
        description:'',
        cover:''
      }
    });
  })
  .post('/new_Book', db.createBook,
  (req, res) => {
    res.redirect(303,`../${res.books[0].id}`);// ../ID gets me to books/ID
    // (res,req) => res.send('post happened at /new_book') )
  })
  // .delete('/new_Book', /*getBooksfromSQL, */ notImplement ) //nonsensical
  .put('/new_Book', /*getBooksfromSQL, */ notImplement )


router
  .get('/:bID', db.getSingleBook, (req,res) => {

    res.render('books/this_book', {book:res.books})
  })//select this book from books table
  //needs function that selects the correct information from books, authors, genres, and returns it to page.


//delete
router.delete('/', /*getBooksfromSQL, */ notImplement )

//put???
router.put('/', /*getBooksfromSQL, */ notImplement )

module.exports = router;
