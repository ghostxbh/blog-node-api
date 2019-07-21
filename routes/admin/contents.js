/**
 * Created by xbh 2019-06-12 文章API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const contentsService = require('../../service/contents-service');

/**
 * @api {post} /admin/contents/create 添加文章
 * @apiGroup contents
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [title] 标题
 * @apiParam {String} [introduction] 摘要
 * @apiParam {String} [images] 缩略图
 * @apiParam {String} [source] 来源
 * @apiParam {String} [labels] 标签
 * @apiParam {String} [content] 内容
 * @apiParam {Number} [status] 文章状态 -1为草稿，1为正文，2为回收站
 * @apiParam {Number} [typeId] 类别
 * @apiParam {Number} [specialId] 专栏
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
 * @apiSampleRequest /admin/contents/create
 */
router.post('/create', function (req, res, next) {
    let contents = req.body;
    contentsService.add(contents).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {delete} /admin/contents/delete/{id} 删除文章
 * @apiGroup contents
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
 * @apiSampleRequest /admin/contents/delete/:id
 */
router.delete('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    contentsService.del(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /admin/contents/update/{id} 修改文章
 * @apiGroup contents
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [title] 标题
 * @apiParam {String} [introduction] 摘要
 * @apiParam {String} [images] 缩略图
 * @apiParam {String} [source] 来源
 * @apiParam {String} [labels] 标签
 * @apiParam {String} [content] 内容
 * @apiParam {Number} [top] 置顶
 * @apiParam {Number} [recommend] 推荐
 * @apiParam {Number} [status] 文章状态 -1为草稿，1为正文，2为回收站
 * @apiParam {Number} [typeId] 类别
 * @apiParam {Number} [specialId] 专栏
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
 * @apiSampleRequest /admin/contents/update/:id
 */
router.put('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let contents = req.body;
    contentsService.modify(id, contents).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {get} /admin/contents/addpage 新增页面列表
 * @apiGroup contents
 * @apiVersion 1.0.0
 * @apiName addpage
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
 * @apiSampleRequest /admin/contents/addpage
 */
router.get('/addpage', function (req, res, next) {
    contentsService.addPage().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/contents/remarkList 获取最近评论列表
 * @apiGroup contents
 * @apiVersion 1.0.0
 * @apiName remarkList
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
 * @apiSampleRequest /admin/contents/remarkList
 */
router.get('/remarkList', function (req, res, next) {
    contentsService.remarkList().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/contents/{id} 文章详情
 * @apiGroup contents
 * @apiVersion 1.0.0
 * @apiName info
 * @apiParam {Number} [id] id
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": {}
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /admin/contents/:id
 */
router.get('/:id', function (req, res, next) {
    contentsService.contentInfo(req.params.id).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/contents/list 文章列表
 * @apiGroup contents
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
 * @apiSampleRequest /admin/contents/list
 */
router.post('/list', function (req, res, next) {
    let {keyword, typeId, specialId, labels, pageNum, pageSize} = req.body;
    contentsService.list(keyword, typeId, specialId, labels, pageNum, pageSize).then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports = router;