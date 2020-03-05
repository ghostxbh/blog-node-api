/**
 * Created by xbh 2019-06-12 分类API
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const {category} = require('../../models/index');
const categoryService = require('../../service/category-service');

/**
 * @api {post} /admin/category/create 添加分类
 * @apiGroup category
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [title] 标题
 * @apiParam {String} [sourceType] 来源类型
 * @apiParam {String} [docType] 文档类型
 * @apiParam {String} [iconUrl] 图标地址
 * @apiParam {String} [status] 状态
 * @apiParam {String} [isEnable] 是否启用
 * @apiParam {String} [priority] 等级
 * @apiParam {Number} [lastMaster] 上级
 * @apiParam {Number} [fieldSort] 排序
 * @apiParam {String} [remark] 备注
 * @apiParam {String} [isJson] 是否启用json配置
 * @apiParam {String} [jsonConfig] json配置
 * @apiParam {String} [jsonConfig] json配置
 * @apiParam {String} [creator] 创建人
 * @apiParam {String} [updator] 修改人
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
 * @apiSampleRequest /admin/category/create
 */
router.post('/create', async function (req, res, next) {
    const data = req.body;
    data.createTime = new Date();
    try {
        await category.create(data);
        return res.json(result.success(null));
    } catch (e) {
        console.log(e);
        return res.json(result.exceptionFailed(e.message));
    }
});

/**
 * @api {delete} /admin/category/delete/{id} 删除分类
 * @apiGroup category
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
 * @apiSampleRequest /admin/category/delete/:id
 */
router.delete('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    categoryService.del(id).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {put} /admin/category/update/{id} 修改分类
 * @apiGroup category
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /admin/category/update/:id
 */
router.put('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let category = req.body;
    categoryService.modify(id, category).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/category/list 获取列表
 * @apiGroup category
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
 * @apiSampleRequest /admin/category/list
 */
router.get('/list', function (req, res, next) {
    categoryService.list().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;
