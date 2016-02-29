'use strict';

//dependencies
var pg = require('pg');
var bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10); //i think this is where colin meant when referring to 'to the top'

// var config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// }; // or use connectionString instead. //should be able to call DB_config since it is defined in server.js

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
  }
}
