/**
 * Created by xbh 2019-06-12 评论CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,nickname,email,url,comment,ip,agent,status,create_time,content_id';
module.exports = {
    //增
    addRemark(remark) {
        let {nickname, email, url, comment, ip, agent, contentId} = remark;
        let addTime = new Date();
        let sql = `insert into b_remark(nickname,email,url,comment,ip,agent,create_time,content_id)values(?,?,?,?,?,?,?,?)`;
        return Mysql.excute(sql, [nickname, email, url, comment, ip, agent, addTime, contentId]);
    },
    //删
    delRemark(id) {
        let sql = `delete from b_remark where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyRemark(remark) {
        let {id, nickname, email, url, comment, ip, agent, status, contentId} = remark;
        let set = '';
        if (nickname) set += `nickname='${nickname}',`;
        if (email) set += `email='${email}',`;
        if (url) set += `url='${url}',`;
        if (comment) set += `comment='${comment}',`;
        if (ip) set += `ip='${ip}',`;
        if (agent) set += `agent='${agent}',`;
        if (status) set += `status=${status},`;
        if (contentId) set += `content_id=${contentId}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_remark set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //列表
    remarkList(status, fied, param, contentId, pageNum, pageSize) {
        let where = 'where 1=1';
        if (status) where += ` and status=${status}`;
        if (fied && param) where += ` and ${fied} like '%${param}%'`;
        if (contentId) where += ` and content_id=${contentId}`;
        let order = `order by create_time desc`;
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from b_remark ${where} ${order} ${limit}`;
        return Mysql.excute(sql, [status]);
    },
};