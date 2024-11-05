var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config();
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var actorRoutes = require('./src/routes/actor.route.js') 
var filmRoutes = require('./src/routes/film.route.js')
var authRoutes = require('./src/routes/auth.route.js')
var app = express();
const sequelize = require('./src/models/index');
const User = require('./src/models/User');
const RefreshToken = require('./src/models/RefreshToken.js');

//dùng jwt
require('./src/config/passport.js')
const protectRoute = passport.authenticate('jwt', { session: false });


sequelize.sync() // `force: true` để xóa bảng nếu đã tồn tại và tạo lại
    .then(() => {
        console.log('Tables have been created.');
    })
    .catch(err => {
        console.error('Error creating tables:', err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/actor', actorRoutes);
app.use('/films',protectRoute, filmRoutes);
app.use('/auth', authRoutes);
const port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
module.exports = app;
