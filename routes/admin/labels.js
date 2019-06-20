/**
 * Created by xbh 2019-06-12 标签API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const labelsService = require('../../service/labels-service');

/**
 * @api {post} /admin/labels/create 添加标签
 * @apiGroup labels
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [name] 名称
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
 * @apiSampleRequest /admin/labels/create
 */
router.post('/create', function (req, res, next) {
    let name = req.body.name;
    labelsService.add(name).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {delete} /admin/labels/delete/{id} 删除标签
 * @apiGroup labels
 * @apiVersion 1.0.0
 * @apiName delete
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
 * @apiSampleRequest /admin/labels/delete/:id
 */
router.delete('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    labelsService.del(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /admin/labels/update/{id} 修改标签
 * @apiGroup labels
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [num] 文章数
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
 * @apiSampleRequest /admin/labels/update/:id
 */
router.put('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let labels = req.body;
    labelsService.modify(id, labels).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/labels/list 获取列表
 * @apiGroup labels
 * @apiVersion 1.0.0
 * @apiName list
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
 * @apiSampleRequest /admin/labels/list
 */
router.get('/list', function (req, res, next) {
    let {pageNum, pageSize} = req.query;
    labelsService.list(pageNum, pageSize).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;