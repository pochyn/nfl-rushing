var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var rushingRoute = require('./routes/rushing');

var app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rushing', rushingRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
