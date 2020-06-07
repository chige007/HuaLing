var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/login');
});
router.get('/index', function (req, res, next) {
     res.redirect(301, '/admin/index/home');
});
router.get('/index/:module', function (req, res, next) {
    if (req.session.username) {
        res.render('admin/index', {
            username: req.session.username,
            module: req.params.module
        });
    } else {
        req.session.destroy(function (err) {
            if (err) {
                res.send(err)
            }
            res.clearCookie('sessionKey');
            res.redirect('/admin');
        });
    }
});
// router.get('/module/:module', function (req, res, next) {
//     if (req.session.username) {
//         if (req.params.module == 'home')
//             res.render('admin/home');
//         if (req.params.module == 'manager')
//             res.render('admin/manager/list');
//         if (req.params.module == 'news')
//             res.render('admin/news/list');
//     } else {
//         res.render('error', {
//             error: {
//                 status: 601
//             },
//             message: '无权查看'
//         });
//     }
// });



module.exports = router;