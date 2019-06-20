/**
 * Created by xbh 2019-06-18 文章API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const contentService = require('../../service/contents-service');

/**
 * @api {get} /font/content/list 文章列表
 * @apiGroup font-content
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {Number} [typeId] 类型ID
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
 * @apiSampleRequest /font/content/list
 */
router.get('/list', function (req, res, next) {
    let {typeId, pageNum, pageSize} = req.query;
    contentService.list(typeId, pageNum, pageSize).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /font/content/admire/{id} 点赞
 * @apiGroup font-content
 * @apiVersion 1.0.0
 * @apiName admire
 * @apiParam {Number} [id] 文章ID
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
 * @apiSampleRequest /font/content/admire/:id
 */
router.put('/admire/:id', function (req, res, next) {
    let {id} = req.params;
    contentService.addAdmire(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

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

module.exports = router;