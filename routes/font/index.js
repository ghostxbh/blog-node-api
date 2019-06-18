/**
 * Created by xbh 2019-06-11 前台API
 */
var express = require('express');
var router = express.Router();

router.use('/home', require('./home'));

module.exports = router;
