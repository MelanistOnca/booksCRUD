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

var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');

var app = express();

//determine logger version
if( process.env.NODE_ENV === 'development' ){
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

//parseyness
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//allow more than get or post
app.use(methodOverride('_method'));

//set view stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//render homepage
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/books', booksRouter);
app.use('/users', usersRouter);


app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
