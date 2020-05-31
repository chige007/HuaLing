var express = require('express');
var router = express.Router();

var https = require('https');

// 首页
router.get('/', function(req, res, next) {
  res.render('client/home');
});

// 集团业务
router.get('/business', function(req, res, next) {
  res.render('client/business', {
      currentMenu: 1
  });
});


module.exports = router;