'use strict';

var pg = require('pg');

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

module.exports.deleteSingleBook = (req, res, next) => {
  console.log(req.params.bID, 'that was req.params.bID for deleteSingleBook');
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('DELETE FROM books WHERE id = $1', [req.params.bID], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      next();
    });

  });

};

module.exports.updateSingleBook = (req, res, next) => {
  console.log(req.body, req.params.bID, 'this was req.body and req.params for updateSingleBook before update');
  pg.connect(DB_config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('UPDATE books SET title = $1, description = $2, cover = $3 WHERE id = $4 RETURNING *', [req.body.title, req.body.description, req.body.cover, req.params.bID], (err, results) => {
      console.log(req.body, req.params.bID, 'this was req.body and req.params.bID for updateSingleBook after update');
      done();

      if (err) {
        console.error('Error with query', err);
      }
      console.log(results.rows, 'that was results.rows after update');
      res.books = results.rows;
      next();
    });

  });

};
