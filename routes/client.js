var express = require('express');
var router = express.Router();
const menus = require('./../json/menus');
const text_business = require('./../json/business');
const text_product_line = require('./../json/product_line');
const text_independent_brand = require('./../json/independent_brand');
const text_information_center = require('./../json/information_center');
const text_contact_information = require('./../json/contact_information');
const text_cooperation_mode = require('./../json/cooperation_mode');
const text_core_value = require('./../json/core_value');
const text_development_history = require('./../json/development_history');
const text_group_business = require('./../json/group_business');
const text_home = require('./../json/home');
const text_innovate = require('./../json/innovate');
const text_personnel = require('./../json/personnel');

var https = require('https');

// 首页
router.get('/', function (req, res, next) {
    res.redirect(301, '/home/en');
});

// 首页
router.get('/home/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/home', {
        menus,
        lang: req.params.lang,
        text: text_home
    });
});

// 集团业务
router.get('/group_business/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/group_business', {
        menus,
        lang: req.params.lang,
        currentMenu: 0,
        text: text_group_business
    });
});

// 核心价值
router.get('/core_value/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/core_value', {
        menus,
        lang: req.params.lang,
        currentMenu: 0,
        text: text_core_value
    });
});

// 发展历程
router.get('/development_history/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/development_history', {
        menus,
        lang: req.params.lang,
        currentMenu: 0,
        text: text_development_history
    });
});

// 七大业务板块
router.get('/business/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/business', {
        menus,
        lang: req.params.lang,
        currentMenu: 1,
        text: text_business
    });
});

// 产品线
router.get('/product_line/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/product_line', {
        menus,
        lang: req.params.lang,
        currentMenu: 1,
        text: text_product_line
    });
});

// 自主品牌
router.get('/independent_brand/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/independent_brand', {
        menus,
        lang: req.params.lang,
        currentMenu: 1,
        text: text_independent_brand
    });
});

// 合作模式
router.get('/cooperation_mode/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/cooperation_mode', {
        menus,
        lang: req.params.lang,
        currentMenu: 1,
        text: text_cooperation_mode
    });
});

// 新闻中心
router.get('/information_center/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/information_center', {
        menus,
        lang: req.params.lang,
        currentMenu: 2,
        text: text_information_center
    });
});

// 创新
router.get('/innovate/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/innovate', {
        menus,
        lang: req.params.lang,
        currentMenu: 3,
        text: text_innovate
    });
});

// 联系方式
router.get('/contact_information/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/contact_information', {
        menus,
        lang: req.params.lang,
        currentMenu: 4,
        text: text_contact_information
    });
});


module.exports = router;