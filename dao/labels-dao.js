/**
 * Created by xbh 2019-06-12 标签CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,name,num,create_time as createTime';
module.exports = {
    //增
    addLabel(name) {
        let addTime = new Date();
        let sql = `insert into b_labels(name,create_time)values(?,?)`;
        return Mysql.excute(sql, [name, addTime]);
    },
    delLabel(id) {
        let sql = `delete from b_labels where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyLabel(label) {
        let {id, name, num} = label;
        let set = '';
        if (name) set += `name='${name}',`;
        if (num) set += `num=${num}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_labels set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //+1 / -1
    addNum(name, status) {
        let sql = `update b_labels set num=num${status == 1 ? '+' : '-'}1 where name=?`;
        return Mysql.transExcute(sql, [name]);
    },
    //查数量
    labelByName(name) {
        let sql = `select count(*) as count from b_labels where name=?`;
        return Mysql.excute(sql, [name]);
    },
    labelAll() {
        let sql = `select ${field} from b_labels`;
        return Mysql.excute(sql);
    },
    //查
    labelList(orderSn, pageNum, pageSize) {
        let order = '';
        if (orderSn) order += 'order by num desc';
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from b_labels ${order} ${limit};`;
        let cSql = `select count(1) as count from b_labels;`;
        return Mysql.excute(sql + cSql);
    },
};