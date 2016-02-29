'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/user_fns');

var users = express.Router();
var bodyParser = require('body-parser'); //i think this is unnecessary since it's in server.js, but following tutorial.
// var session = require('express-session');
// var pgSession = require('connect-pg-simple')(session);



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


router
  .get('/login', (req,res) => {
    res.render('users/login')
  })
  .post('/login', db.loginUser, (res, req) => {
    console.log(res.rows, 'that was res.rows in users_fns.js'); //res.rows returns undefined
    req.session.user = res.rows;
    // when you redirect you must force a save due to asynchronisity
    // https://github.com/expressjs/session/issues/167 **
    // "modern web browsers ignore the body of the response and so start loading
    // the destination page well before we finished sending the response to the client."

    req.session.save( () => { res.redirect('/') } );
  })
//post
router.post('/', /*getusersfromSQL, */ notImplement)

//delete
router.delete('/', /*getusersfromSQL, */ notImplement )

//put???
router.put('/', /*getusersfromSQL, */ notImplement )





module.exports = router;
