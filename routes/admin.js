var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/login');
});
router.get('/:module', function (req, res, next) {
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

module.exports = router;