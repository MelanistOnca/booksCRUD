'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/author_fns');


var notImplement = (req,res) => {
  res.send( req.method + ' this method is not yet implemented for authors')
}

//get
router.get('/', /*getauthorsfromSQL, */notImplement )


//post
router.post('/', /*getauthorsfromSQL, */ notImplement)

//delete
router.delete('/', /*getauthorsfromSQL, */ notImplement )

//put???
router.put('/', /*getauthorsfromSQL, */ notImplement )








module.exports = router;
