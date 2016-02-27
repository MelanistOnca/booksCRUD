'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/book_fns');


var notImplement = (req,res) => {
  res.send( req.method + ' this method is not yet implemented for books')
}

//get
// router.get('/', /*getBooksfromSQL, */notImplement )
router
  .get('/', db.getBooks, (req,res) => {
    res.render('books/bindex', {books:res.books})
  })

//post
router.post('/', /*getBooksfromSQL, */ notImplement)

//delete
router.delete('/', /*getBooksfromSQL, */ notImplement )

//put???
router.put('/', /*getBooksfromSQL, */ notImplement )

module.exports = router;
