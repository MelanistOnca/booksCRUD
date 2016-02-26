pry = require('pryjs');
/*global require __dirname process*/

'use strict';

if(!process.env.NODE_ENV){
require('dotenv').config();
}

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var massagesRouter = require('./routes/massages');
var masseuistsRouter = require('./routes/masseuists');

var app = express();

if( process.env.NODE_ENV === 'development' ){
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/massages', massagesRouter);
app.use('/masseuists', masseuistsRouter);


app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
