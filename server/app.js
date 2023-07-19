var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var routes = require('./routes/routes');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', routes);


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
  res.json('error');
});

// Connection to MongoDB
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true})
.then(()=>{ console.log("Connected to DB")})
.catch((err)=>{console.log(err.message)})

//------------------ Connection to the Server --------------------------------------//
const server = http.createServer(app);
server.listen(5000, ()=>{
  console.log("app is running on port 5000");
})

module.exports = app;
