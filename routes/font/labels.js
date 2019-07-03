/**
 * Created by xbh 2019-07-03
 */
var express = require('express');
var router = express.Router();
const result = require('../../util/result-util');
const labelService = require('../../service/labels-service');
/**
 * @api {get} /font/label/all 所有标签
 * @apiGroup font-label
 * @apiVersion 1.0.0
 * @apiName all
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
 * @apiSampleRequest /font/label/all
 */
router.get('/all', function (req, res, next) {
    labelService.all().then(data => {
        if (data) res.json(result.success(data));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


module.exports=router;