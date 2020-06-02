var express = require('express');
var router = express.Router();
const menus = require('./../json/menus');

var https = require('https');

// 首页
router.get('/', function(req, res, next) {
  res.render('client/home', {
    menus,
    lang: 'cn'
  });
});

// 首页
router.get('/:lang', function(req, res, next) {
  res.render('client/home', {
    menus,
    lang: req.params.lang
  });
});

// 集团业务
router.get('/business/:lang', function(req, res, next) {
  res.render('client/business', {
      menus,
      lang: req.params.lang,
      currentMenu: 1
  });
});

// 核心价值
router.get('/core_value/:lang', function(req, res, next) {
  res.render('client/core_value', {
      menus,
      lang: req.params.lang,
      currentMenu: 0
  });
});


module.exports = router;