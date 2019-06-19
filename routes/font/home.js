/**
 * Created by xbh 2019-06-17 首页API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const homeService = require('../../service/home-service');

/**
 * @api {get} /font/home 首页
 * @apiGroup font-home
 * @apiVersion 1.0.0
 * @apiName home
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": 1
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /font/home
 */
router.get('/', function (req, res, next) {
    homeService.home().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /font/home/search 搜索
 * @apiGroup font-home
 * @apiVersion 1.0.0
 * @apiName search
 * @apiParam {String} [keyword] 关键词
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": 1
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /font/home/search
 */
router.get('/search', function (req, res, next) {
    let {keyword} = req.query;
    homeService.search(keyword).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;