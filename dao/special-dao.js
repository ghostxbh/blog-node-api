/**
 * Created by xbh 2019-06-12 专栏CRUD
 */
const Mysql = require('../util/mysql-util');
let field = 'id,name,description,image,content_num,read_num,sort,create_time';
module.exports = {
    //增
    addSpecial(special) {
        let {name, description, image} = special;
        let addTime = new Date();
        let sql = `insert into b_special(name,description,image,create_time)values(?,?,?,?)`;
        return Mysql.excute(sql, [name, description, image, addTime]);
    },
    //删
    delSpecial(id) {
        let sql = `delete from b_special where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifySpecial(special) {
        let {name, description, image, contentNum, readNum, sort} = special;
        let set = '';
        if (name) set += `name='${name}',`;
        if (description) set += `description='${description}',`;
        if (image) set += `image='${image}',`;
        if (contentNum) set += `content_num=${contentNum},`;
        if (readNum) set += `read_num=${readNum},`;
        if (sort) set += `sort=${sort}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_special set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //文章数+1
    addConten(id) {
        let sql = `update b_special set content_num=content_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //阅读+1
    addRead(id) {
        let sql = `update b_special set read_num=read_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //列表
    specialList(keyword, pageNum, pageSize) {
        let where = 'where 1=1';
        if (keyword) where += ` and(name like '%${keyword}%' or description like '%${keyword}%')`;
        let order = `order by create_time desc`;
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from b_special ${where} ${order} ${limit}`;
        return Mysql.excute(sql, [status]);
    },
};