var express = require('express');
var router = express.Router();
const Curd = require('./../models/curd');
const News = require('./../models/news');

// 新增
router.post('/add', (req, res, next) => {
    req.body.status = 0;
    Curd.save({
        model: News,
        data: req.body,
        callback: (err, doc) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: '保存失败',
                    data: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '保存成功',
                    data: doc
                })
            }
        }
    });
});

// 修改
router.post('/update', (req, res, next) => {
    Curd.update({
        model: News,
        filter: req.body.filter,
        data: req.body.data,
        callback: (err, doc) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: '修改失败',
                    data: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '修改成功',
                    data: doc
                })
            }
        }
    });
});

// 新闻列表
router.post('/list', (req, res, next) => {
    Curd.getList({
        model: News,
        filter: req.body.filter || {},
        options: req.body.options || {},
        projection: req.body.projection || {},
        callback: (err, doc, count) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '获取失败',
                    data: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '获取成功',
                    data: {
                        rows: doc,
                        total: count
                    }
                });
            }
        }
    });
});

// 删除新闻
router.post('/delete', (req, res, next) => {
    Curd.remove({
        model: News,
        filter: req.body,
        callback: (err, doc) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '删除失败',
                    data: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功',
                    data: doc
                });
            }
        }
    });
});

// 发布新闻
router.post('/publish', (req, res, next) => {
    Curd.update({
        model: News,
        filter: req.body.filter,
        data: req.body.data,
        callback: (err, doc) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '删除失败',
                    data: err
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功',
                    data: doc
                });
            }
        }
    });
});

module.exports = router;