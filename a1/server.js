var express = require('express');
var path = require('path');

var logger = require('morgan');

var bodyParser = require('body-parser');

var dishes = require('./dishRouter');
var promotions = require('./promoRouter');
var leadership = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishes);
app.use('/promotions', promotions);
app.use('/leadership', leadership);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});