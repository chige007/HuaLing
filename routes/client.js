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

// 核心价值
router.get('/core_value/:lang', function(req, res, next) {
    res.render('client/core_value', {
      menus,
      lang: req.params.lang,
      currentMenu: 0
  });
});

// 发展历程
router.get('/development_history/:lang', function(req, res, next) {
    res.render('client/development_history', {
        menus,
        lang: req.params.lang,
        currentMenu: 0
    });
});

// 创新
router.get('/innovate/:lang', function(req, res, next) {
    res.render('client/innovate', {
        menus,
        lang: req.params.lang,
        currentMenu: 3
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

// 合作模式
router.get('/cooperation_mode/:lang', function(req, res, next) {
  res.render('client/cooperation_mode', {
      menus,
      lang: req.params.lang,
      currentMenu: 1
  });
});

// 新闻中心
router.get('/information_center/:lang', function(req, res, next) {
    res.render('client/information_center', {
        menus,
      lang: req.params.lang,
      currentMenu: 2
  });
});


module.exports = router;