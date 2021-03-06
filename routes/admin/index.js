/**
 * Created by xbh 2019-06-11 管理API
 */
var express = require('express');
var router = express.Router();

router.use('/category', require('./category'));
router.use('/type', require('./type'));
router.use('/contents', require('./contents'));
router.use('/labels', require('./labels'));
router.use('/special', require('./special'));
router.use('/links', require('./links'));
module.exports = router;
