//for debugging
pry = require('pryjs');


'use strict';

//require dotenv when in development environment
if(!process.env.NODE_ENV){
require('dotenv').config();
}

//required stuff/dependencies
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//routing vars
var booksRoute = require( path.join( __dirname, 'routes/books') );
var usersRoute = require( path.join( __dirname, 'routes/users') );
var authorsRoute = require( path.join( __dirname, 'routes/authors') );

// var genresRoute = require( path.join( __dirname, 'routes/genres') ); //dont actually think i'll need this.

var app = express();

//DB config for db function files
DB_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

// placeholder route function


//determine logger version
if( process.env.NODE_ENV === 'development' ){
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

//parseyness
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );

//allow more than get or post
app.use(methodOverride('_method'));

//set view stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//render homepage
app.get('/', (req, res) => {
  res.render('index');
});



app.use('/books', booksRoute);
app.use('/users', usersRoute);
app.use('/authors', authorsRoute);


app.listen(process.env.PORT, function() {
  console.log(`Your server is running on port ${process.env.PORT}, hope you can catch it!`);
});

module.exports.DB_config;
