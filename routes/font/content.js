/**
 * Created by xbh 2019-06-18 文章API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const contentService = require('../../service/contents-service');

/**
 * @api {get} /font/content/{id} 文章
 * @apiGroup font-content
 * @apiVersion 1.0.0
 * @apiName content
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /font/content/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    contentService.content(id).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /font/content/remark/{num} 评论列表
 * @apiGroup font-content
 * @apiVersion 1.0.0
 * @apiName remark
 * @apiParam {Number} [num] 页数
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
 * @apiSampleRequest /font/content/remark/:num
 */
router.get('/remark/:num', function (req, res, next) {
    let {num} = req.params;
    contentService.content(id).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;