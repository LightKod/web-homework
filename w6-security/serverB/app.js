var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var filmRoutes = require('./src/routes/film.route.js')
const AuthMiddleware = require('./src/middlewares/auth.js')
var app = express();
// app.use(cors())



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', AuthMiddleware,filmRoutes);
const port = 3002
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
module.exports = app;
