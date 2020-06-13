var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');

var clientRouter = require('./routes/client');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var newsRouter = require('./routes/news');

var app = express();

// 安装视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session 中间件
app.use(session({
    secret : 'hualing2020', // 对session id 相关的cookie 进行签名
    name: 'sessionKey',
    resave : false,
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    },
}));
app.use('/', clientRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);

// 我的日志
app.use(function(req, res, next) {
    console.log(`${req.method}: ${req.url}`);
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 捕获错误
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(res.locals.error);
    //   渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
