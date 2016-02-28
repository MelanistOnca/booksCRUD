'use strict';

var pg = require('pg');

// var config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// }; // or use connectionString instead. //should be able to call DB_config since it is defined in server.js

module.exports.getBooks = (req, res, next) => {
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM books ORDER BY id', (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      res.books = results.rows;
      next();
    });
  });
};

//this function will not currently be callable by users, add this functionality after login.
module.exports.createBook = (req, res, next) => {
  console.log('createBook called');
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }
    console.log(req.body, 'that was req.body');
    client.query('INSERT INTO books (title, description, cover) VALUES ($1,$2,$3) RETURNING id', [req.body.title, req.body.description, req.body.cover], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      console.log(req.body, 'that was req.body');
      console.log(results.rows, 'that was results.row');
      res.books = results.rows;
      next();
    });
  });
  console.log('createbook ran');
};

module.exports.getSingleBook = (req, res, next) => {
  console.log(req.body, 'this was req.body');
  console.log(req.params.id, 'this was req.params.id');
  console.log(req.params.bID, 'that was req.params.bID');
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM books WHERE id=$1', [req.params.bID], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      console.log(results.rows);
      res.books = results.rows;
      next();
    });
  });
};
