/**
 * Created by xbh 2019-06-12 文章类型API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const typeService = require('../../service/type-service');

/**
 * @api {get} /font/type/list 获取列表
 * @apiGroup fontType
 * @apiVersion 1.0.0
 * @apiName list
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
 * @apiSampleRequest /font/type/list
 */
router.get('/list', function (req, res, next) {
    typeService.list().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {get} /font/type/categoryList 文章类型列表
 * @apiGroup fontType
 * @apiVersion 1.0.0
 * @apiName categoryList
 * @apiParam {Number} [categoryId] 分类ID
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
 * @apiSampleRequest /font/type/categoryList
 */
router.get('/categoryList', function (req, res, next) {
    let {categoryId} = req.query;
    typeService.cateList(categoryId).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;