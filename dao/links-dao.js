/**
 * Created by xbh 2019-06-12 友链CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,name,click_num,contact,remark,create_time';
module.exports = {
    //增
    addLink(link) {
        let {url, name, contact, remark} = link;
        let addTime = new Date();
        let sql = `insert into b_links(url,name,contact,remark,create_time)values(?,?,?,?,?)`;
        return Mysql.excute(sql, [url, name, contact, remark, addTime]);
    },
    delLink(id) {
        let sql = `delete from b_links where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyLink(link) {
        let {id, url, name, clickNum, contact, remark, sort, status} = link;
        let set = '';
        if (url) set += `url='${url}',`;
        if (name) set += `name='${name}',`;
        if (clickNum) set += `click_num=${clickNum},`;
        if (contact) set += `contact='${contact}',`;
        if (remark) set += `remark='${remark}',`;
        if (sort) set += `sort=${sort},`;
        if (status) set += `status=${status}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_links set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //跳转+1
    addClickNum(id) {
        let sql = `update b_links set click_num=click_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //管理列表
    manageList() {
        let sql = `select ${field} from b_links`;
        return Mysql.excute(sql);
    },
    //上下架列表
    udList(status) {
        let sql = `select ${field} from b_links where status=? order by sort asc`;
        return Mysql.excute(sql, [status]);
    },
};