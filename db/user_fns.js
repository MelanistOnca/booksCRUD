'use strict';

var pg = require('pg');

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
