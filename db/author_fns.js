'use strict';

var pg = require('pg');

var config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}; // or use connectionString instead.


//var connectionString ='postgres://Cthulu:' + process.env.DB_PASSWORD + '@localhost/moviehaus';
