var express = require('express');
var router = express.Router();
const Curd = require('./../models/curd');
const User = require('./../models/user');

// 登录
router.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(`${username}尝试登录`);
    Curd.count(User, {
        username,
        password
    }, (doc) => {
        if (!doc) {
            res.json({
                code: 1,
                msg: '用户名或密码错误'
            });
        } else {
            req.session.username = username;
            console.log(`${username}登录成功`);
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
    req.session.destroy(function (err) {
        if (err) {
            res.send(err)
        }
        res.clearCookie('sessionKey');
        res.redirect('/admin');
    });
});

// 用户列表
router.post('/manager/list', (req, res, next) => {
    Curd.getList({
        model: User,
        filter: req.body.filter || {
            type: {
                $ne: 0
            }
        },
        options: req.body.options || {},
        projection: Object.assign({
            password: 0
        }, req.body.projection || {}),
        callback: (err, doc) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '获取成功',
                    data: doc
                })
            }
        }
    });
});
module.exports = router;