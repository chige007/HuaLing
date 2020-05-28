var express = require('express');
var router = express.Router();

var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/home');
});

router.get('/adduser', function(req, res, next) {
    console.log('get: /adduser')
    let code = req.query.code;
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx353a23119b713aa3&secret=e3c0a69d6bf8370d7634ff0ea3a9b032&js_code=' + code + '&grant_type=authorization_code'
    console.log(url);
    
    https.get(url, res2 => {
        res2.setEncoding('utf8');
        let rawData = ''
        res2.on('data', (d) => {
            rawData += d;
        });
        res2.on('end', () => {
            let data = JSON.parse(rawData);
            console.log(data);
            res.json({
                result: true,
                wxid: data.openid
            })
        })
    })
})

module.exports = router;
