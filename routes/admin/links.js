/**
 * Created by xbh 2019-06-20 友链API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const linksService = require('../../service/links-service');

/**
 * @api {post} /admin/links/create 添加友链
 * @apiGroup links
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [url] 网址
 * @apiParam {String} [name] 名称
 * @apiParam {String} [contact] 联系方式
 * @apiParam {String} [remark] 备注
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
 * @apiSampleRequest /admin/links/create
 */
router.post('/create', function (req, res, next) {
    let links = req.body;
    linksService.add(links).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {delete} /admin/links/delete/{id} 删除友链
 * @apiGroup links
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
 * @apiSampleRequest /admin/links/delete/:id
 */
router.delete('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    linksService.del(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /admin/links/update/{id} 修改友链
 * @apiGroup links
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [url] 网址
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [clickNum] 跳转数
 * @apiParam {String} [contact] 联系方式
 * @apiParam {String} [remark] 备注
 * @apiParam {Number} [sort] 排序
 * @apiParam {Number} [status] 状态：1为上架，-1为下架
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
 * @apiSampleRequest /admin/links/update/:id
 */
router.put('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let links = req.body;
    linksService.modify(id, links).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/links/list 获取列表
 * @apiGroup links
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
 * @apiSampleRequest /admin/links/list
 */
router.get('/list', function (req, res, next) {
    let {} = req.query;
    linksService.list().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;