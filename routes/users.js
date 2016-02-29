'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/user_fns');

var users = express.Router();
var bodyParser = require('body-parser'); //i think this is unnecessary since it's in server.js, but following tutorial.



var notImplement = (req,res) => {
  res.send( req.method + ' this method is not yet implemented for users')
}

//get
router
  .get('/', db.getUsers, (req,res) => {
    res.render('users/uindex', {users:res.users})
  })

//user signup
router
  .get('/new_user', /*db.newUser,*/ (req,res) => {
    res.render('users/new_user_signup')
  } )
  .post('/', db.createUser, (req, res) => {
    res.redirect(303,'/');
  }) //works. redirects to 'index' page
 
//post
router.post('/', /*getusersfromSQL, */ notImplement)

//delete
router.delete('/', /*getusersfromSQL, */ notImplement )

//put???
router.put('/', /*getusersfromSQL, */ notImplement )





module.exports = router;
