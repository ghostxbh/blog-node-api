/**
 * Created by xbh 2019-06-11 前台API
 */
var express = require('express');
var router = express.Router();

router.use('/font', require('./'));
router.use('/admin', require('./'));

module.exports = router;
