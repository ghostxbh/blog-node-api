/**
 * Created by xbh 2019-06-12 资源CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,title,content,url,images,create_time,status';
module.exports = {
    //增
    addResource(resource) {
        let {title, content, url, images} = resource;
        let addTime = new Date();
        let sql = `insert into b_resource(title,content,url,images,create_time)values(?,?,?,?,?)`;
        return Mysql.excute(sql, [title, content, url, images, addTime]);
    },
    //删
    delResource(id) {
        let sql = `delete from b_resource where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyResource(resource) {
        let {title, content, url, images, status} = resource;
        let set = '';
        if (title) set += `title='${title}',`;
        if (content) set += `content='${content}',`;
        if (url) set += `url='${url}',`;
        if (images) set += `images='${images}',`;
        if (status) set += `status=${status}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_resource set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //列表
    resourceList(status, pageNum, pageSize) {
        let where = 'where 1=1';
        if (status) where += ` and status=${status}`;
        let order = `order by create_time desc`;
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from b_resource ${where} ${order} ${limit}`;
        return Mysql.excute(sql, [status]);
    },
};