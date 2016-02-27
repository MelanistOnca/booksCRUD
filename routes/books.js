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

//post new book
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
    res.redirect(303,`/${res.books[0].id}`);
    // (res,req) => res.send('post happened at /new_book') )
  })
  .delete('/new_Book', /*getBooksfromSQL, */ notImplement )
  .put('/new_Book', /*getBooksfromSQL, */ notImplement )


router
  .get('/:bID', notImplement)


//delete
router.delete('/', /*getBooksfromSQL, */ notImplement )

//put???
router.put('/', /*getBooksfromSQL, */ notImplement )

module.exports = router;
