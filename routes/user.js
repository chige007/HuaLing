var express = require('express');
var router = express.Router();
const Curd = require('./../models/curd');
const User = require('./../models/user');

// 登录
router.post('/login', function(req, res, next) {
    console.log('post: /login');
    var username = req.body.username;
    var password = req.body.password;
    Curd.count(User, {
        username, password
    }, (doc) => {
        if(!doc){
             res.json({
                 code: 1,
                 msg: '用户名或密码错误'
             });
        }else{
            req.session.username = username;
            res.json({
                code: 200,
                msg: '登录成功',
                data: {}
            });
        }
    });
});

// 登出
router.get('/logout', (req, res, next) => {
    req.session.destroy(function(err) {
        if(err){
            res.send(err)
        }
        res.clearCookie('hualing');
        res.redirect('/admin/login');
    });
});

module.exports = router;
