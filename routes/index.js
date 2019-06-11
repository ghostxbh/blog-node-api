var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/font', require('./font/index'));
router.use('/admin', require('./admin/index'));

module.exports = router;
