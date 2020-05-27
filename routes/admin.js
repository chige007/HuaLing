var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/login');
});
router.get('/login', function(req, res, next) {
    res.render('admin/login');
});
router.get('/index/:module', function(req, res, next) {
    console.log(req.params.module);
    if(req.session.username){
        res.render('admin/index', {
            username: req.session.username,
            module: req.params.module
        });
    }else{
        res.redirect("/admin/login?noSession=1");
    }
});

module.exports = router;
