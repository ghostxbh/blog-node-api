/**
 * Created by xbh 2019-06-11 分类CRUD
 */
const Mysql = require('../util/mysql-util');
const field = 'id,name,create_time as createTime';
module.exports = {
    //增
    addCate(category) {
        let date = new Date();
        let {name} = category;
        let sql = `insert into b_category (name,create_time) values (?,?)`;
        return Mysql.excute(sql, [name, date]);
    },
    //删
    delCate(id) {
        let sql = `delete from b_category where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyCate(category) {
        let {id, name} = category;
        let set = '';
        if (id) set += `id=${id},`;
        if (name) set += `name='${name}'`;
        let sql = `update b_category set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //查
    categories() {
        let sql = `select ${field} from b_category`;
        return Mysql.excute(sql);
    },
};