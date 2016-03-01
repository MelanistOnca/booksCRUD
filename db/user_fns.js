'use strict';

//dependencies
var pg = require('pg');
var bcrypt = require('bcrypt');

//this looks to be necessary for login/sessions
var session = require('express-session');

var salt = bcrypt.genSaltSync(10); //i think this is where colin meant when referring to 'to the top'

// var path = require('path');
// var usersRoute = require( path.join( __dirname, 'routes/users') );



if( process.env.DATA_ENV === 'production' ) {
  var DB_config = process.env.DATABASE_URL;
} else if( process.env.DATA_ENV === 'development' ){
  var DB_config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};
} else {
  console.log('DB_config is messed up');
}

module.exports.getUsers = (req, res, next) => {
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM users ORDER BY id', (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      res.users = results.rows;
      next();
    });
  });
};

function createSecure(email, password, callback){
  //has password entered at signup
  bcrypt.genSalt( (err,salt) => {
    bcrypt.hash(password, salt, (err,hash) => {
      //this callback saves the user to DB with hash'd pw
      callback(email, hash);
    });
  });
};

module.exports.createUser = (req, res, next) => {
  createSecure(req.body.email, req.body.password, saveUser);

  function saveUser(email, hash) {
    // Get a Postgres client from the connection pool
    pg.connect(DB_config, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      var query = client.query("INSERT INTO users (email, password_digest, first_name, last_name, zip) VALUES ($1, $2, $3, $4, $5);",
        [email, hash, req.body.first_name, req.body.last_name, req.body.zip], function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          next()
      });
    });
  };
};


module.exports.loginUser = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, 'that was email');
  console.log(password, 'that was password');
  //find user by email entered on login screen
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }
    console.log(email, 'that was email after pg.connect in loginUser');
    console.log(password, 'that was password after pg.connect in loginUser');
    var query = client.query('SELECT * FROM users WHERE email LIKE ($1);', [email], (err, results) => {
      done();
      console.log(email, 'that was email after query=client.query in loginUser');
      console.log(password, 'that was password after query=client.query in loginUser');
      //the above logs never run
      if (err) {
        console.error('Error with query', err);
      }

      if (results.rows.length === 0) {
          res.status(204).json({success: false, data: 'no account matches that password'})
        } else if ( bcrypt.compareSync(password, results.rows[0].password_digest) ) {
          res.rows = results.rows[0];
          // console.log(email, 'that was email after else if in loginUser');
          // console.log(password, 'that was password after else if in loginUser');
          next();
        }
    });
  });
};

// usersRoute.post('/login', db.loginUser, (req, res) => {
//     req.session.user = res.rows
//
//     // when you redirect you must force a save due to asynchronisity
//     // https://github.com/expressjs/session/issues/167 **
//     // "modern web browsers ignore the body of the response and so start loading
//     // the destination page well before we finished sending the response to the client."
//
//     req.session.save(function() {
//       res.redirect('/')
//     })
// })
