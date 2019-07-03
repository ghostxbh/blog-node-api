/**
 * Created by xbh 2019-06-11 type CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,name,content_num,create_time,category_id';
module.exports = {
    //增
    addType(type) {
        let {name, categoryId} = type;
        let addTime = new Date();
        let sql = `insert into b_type(name,create_time,category_id)values(?,?,?)`;
        return Mysql.excute(sql, [name, addTime, categoryId]);
    },
    //删
    delType(id) {
        let sql = `delete from b_type where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyType(type) {
        let {id, name, contentNum, categoryId} = type;
        let set = '';
        if (name) set += `name='${name}',`;
        if (contentNum) set += `content_num=${contentNum},`;
        if (categoryId) set += `category_id=${categoryId}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_type set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //文章数+1
    addContentNum(id) {
        let sql = `update b_type set content_num=content_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //查
    typeList() {
        let sql = `select ${field} from b_type`;
        return Mysql.excute(sql);
    },
    typeInfo(id) {
        let sql = `select ${field} from b_type where id=?`;
        return Mysql.excute(sql, [id]);
    },
    //分类列表
    categoryList(categoryId) {
        let sql = `select ${field} from b_type where category_id=?`;
        return Mysql.excute(sql, [categoryId]);
    },
};
