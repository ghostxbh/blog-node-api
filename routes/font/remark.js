/**
 * Created by xbh 2019-06-20
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const remarkService = require('../../service/remark-service');

/**
 * @api {post} /font/remark/create 新增评论
 * @apiGroup font-remark
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [nickname] 昵称
 * @apiParam {String} [email] 邮箱
 * @apiParam {String} [url] 网址
 * @apiParam {String} [comment] 评论
 * @apiParam {Number} [contentId] 文章ID
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
 * @apiSampleRequest /font/remark/create
 */
router.post('/create', function (req, res, next) {
    let remark = req.body;
    remark.agent = req.headers.userAgent || null;
    //TODO ip获取
    remark.ip = '';
    remarkService.add(remark).then(data => {
        if (data) res.json(data);
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {get} /font/remark/list 评论列表
 * @apiGroup font-remark
 * @apiVersion 1.0.0
 * @apiName remark
 * @apiParam {Number} [contentId] 文章ID
 * @apiParam {Number} [pageNum] 页数
 * @apiParam {Number} [pageSize] 条数
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
 * @apiSampleRequest /font/remark/list
 */
router.get('/list', function (req, res, next) {
    let {contentId, pageNum, pageSize} = req.query;
    remarkService.list(contentId, pageNum, pageSize).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;