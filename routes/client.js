var express = require('express');
var router = express.Router();
const menus = require('./../json/menus');
const text_seven_business = require('../json/seven_business');
const text_four_commodity = require('../json/four_commodity');
const text_brand = require('../json/brand');
const text_latest_information = require('../json/latest_information');
const text_contact_us = require('../json/contact_us');
const text_cooperation_mode = require('./../json/cooperation_mode');
const text_core_value = require('./../json/core_value');
const text_development_history = require('./../json/development_history');
const text_group_business = require('./../json/group_business');
const text_home = require('./../json/home');
const text_innovate = require('./../json/innovate');
const text_personnel = require('./../json/personnel');
const text_management_team = require('./../json/management_team')

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

// 桦岭团队
router.get('/management_team/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/management_team', {
        menus,
        lang: req.params.lang,
        currentMenu: 0,
        text: text_management_team
    });
});

// 七大业务板块
router.get('/seven_business/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/seven_business', {
        menus,
        lang: req.params.lang,
        currentMenu: 1,
        text: text_seven_business
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

// 四大商品系列
router.get('/four_commodity/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/four_commodity', {
        menus,
        lang: req.params.lang,
        currentMenu: 2,
        text: text_four_commodity
    });
});

// 品牌
router.get('/brand/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/brand', {
        menus,
        lang: req.params.lang,
        currentMenu: 2,
        text: text_brand
    });
});

// 最新资讯
router.get('/latest_information/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/latest_information', {
        menus,
        lang: req.params.lang,
        currentMenu: 3,
        text: text_latest_information
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

// 加入我们
router.get('/join_us/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/join_us', {
        menus,
        lang: req.params.lang,
        currentMenu: 4,
        text: text_join_us
    });
});

// 联系我们
router.get('/contact_us/:lang(en|cn|hk)', function (req, res, next) {
    res.render('client/contact_us', {
        menus,
        lang: req.params.lang,
        currentMenu: 5,
        text: text_contact_us
    });
});


module.exports = router;