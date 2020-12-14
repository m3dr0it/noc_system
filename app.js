var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var siteRouter = require('./routes/site');
var beamRouter = require('./routes/beam');
var partnerRouter = require('./routes/partner');
var serviceRouter = require('./routes/service');
var modemRouter = require('./routes/modem')
var svnoRouter = require('./routes/svno')
var statusRouter = require('./routes/status')
var dailyReport = require('./routes/dailyReport')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/site',siteRouter);
app.use('/beam',beamRouter);
app.use('/partner',partnerRouter);
app.use('/service',serviceRouter)
app.use('/status',statusRouter)
app.use('/modem',modemRouter)
app.use('/svno',svnoRouter)
app.use('/status',statusRouter)
app.use('/dailyreport',dailyReport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
