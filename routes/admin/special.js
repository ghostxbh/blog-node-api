/**
 * Created by xbh 2019-06-20 专栏API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const specialService = require('../../service/special-service');

/**
 * @api {post} /admin/special/create 添加专栏
 * @apiGroup special
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [name] 名称
 * @apiParam {String} [description] 描述
 * @apiParam {String} [image] 图片
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
 * @apiSampleRequest /admin/special/create
 */
router.post('/create', function (req, res, next) {
    let special = req.body;
    specialService.add(special).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {delete} /admin/special/delete/{id} 删除专栏
 * @apiGroup special
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
 * @apiSampleRequest /admin/special/delete/:id
 */
router.delete('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    specialService.del(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /admin/special/update/{id} 修改专栏
 * @apiGroup special
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [name] 名称
 * @apiParam {String} [description] 描述
 * @apiParam {String} [image] 图片
 * @apiParam {Number} [contentNum] 文章数
 * @apiParam {Number} [readNum] 阅读数
 * @apiParam {Number} [sort] 排序
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
 * @apiSampleRequest /admin/special/update/:id
 */
router.put('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let special = req.body;
    specialService.modify(id, special).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {get} /admin/special/list 获取列表
 * @apiGroup special
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
 * @apiSampleRequest /admin/special/list
 */
router.get('/list', function (req, res, next) {
    let {pageNum, pageSize} = req.query;
    specialService.list(pageNum, pageSize).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/special/{id} 获取详情
 * @apiGroup special
 * @apiVersion 1.0.0
 * @apiName info
 * @apiParam {Number} [id] id
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": {json}
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /admin/special/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    specialService.detail(id).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;