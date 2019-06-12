/**
 * Created by xbh 2019-06-12 标签CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,name,num,create_time';
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
    //+1
    addNum(id) {
        let sql = `update b_labels set num=num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //查
    labelList() {
        let sql = `select ${field} from b_labels`;
        return Mysql.excute(sql);
    },
};