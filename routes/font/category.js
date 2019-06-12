/**
 * Created by xbh 2019-06-12 分类API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const categoryService = require('../../service/category-service');

/**
 * @api {get} /font/category/list 获取列表
 * @apiGroup fontCategory
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
 * @apiSampleRequest /font/category/list
 */
router.get('/list', function (req, res, next) {
    categoryService.list().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /font/category/treeList 获取树形列表
 * @apiGroup fontCategory
 * @apiVersion 1.0.0
 * @apiName treeList
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
 * @apiSampleRequest /font/category/treeList
 */
router.get('/treeList', function (req, res, next) {
    categoryService.treeList().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;