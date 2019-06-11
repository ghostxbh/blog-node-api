/**
 * Created by xbh 2019-06-11 管理API
 */
var express = require('express');
var router = express.Router();

router.use('/font', require('./font/index'));
router.use('/admin', require('./admin/index'));

module.exports = router;
