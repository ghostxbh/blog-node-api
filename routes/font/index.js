/**
 * Created by xbh 2019-06-11 前台API
 */
var express = require('express');
var router = express.Router();

router.use('/type', require('./type'));
router.use('/category', require('./category'));

module.exports = router;
