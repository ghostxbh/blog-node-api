/**
 * Created by xbh 2019-06-11 文章CRUD
 */
const Mysql = require('../util/mysql-util');
const field = 'b_contents.id,b_contents.title,b_contents.introduction,' +
    'b_contents.images,b_contents.source,b_contents.content,b_contents.content_md as contentMd,' +
    'b_contents.read_num as readNum,' +
    'b_contents.remark_num as remarkNum,b_contents.top,b_contents.recommend,' +
    'b_contents.update_time as updataTime,b_contents.create_time as createTime,' +
    'b_contents.status,b_contents.type_id as typeId,b_contents. special_id as specialId,' +
    'b_contents.labels,b_contents.admire_num as admireNum';
module.exports = {
    //增
    addContent(contents) {
        let addTime = new Date();
        let {title, introduction, images, source, content, contentMd, status, typeId, specialId, labels} = contents;
        let sql = 'insert into b_contents (title,introduction,images,' +
            'source,content,content_md,create_time,status,type_id,special_id,labels)' +
            'values(?,?,?,?,?,?,?,?,?,?,?)';
        return Mysql.excute(sql, [title, introduction, images, source, content, contentMd, addTime, status ? status : null, typeId ? typeId : null, specialId ? specialId : null, labels]);
    },
    //删
    delContent(id) {
        let sql = `delete from b_contents where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //改
    modifyContent(contents) {
        let {id, title, introduction, images, source, content, contentMd, top, recommend, status, typeId, specialId, labels} = contents;
        let set = '';
        if (title) set += `title='${title}',`;
        if (introduction) set += `introduction='${introduction}',`;
        if (images) set += `images='${images}',`;
        if (source) set += `source='${source}',`;
        if (content) set += `content='${content}',`;
        if (contentMd) set += `content_md='${contentMd}',`;
        if (top) set += `top=${top},`;
        if (recommend) set += `recommend=${recommend},`;
        if (status) set += `status=${status},`;
        if (typeId) set += `type_id=${typeId},`;
        if (specialId) set += `special_id=${specialId},`;
        if (labels) set += `labels=${labels}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update b_contents set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //阅读量+1
    addReadNum(id) {
        let sql = `update b_contents set read_num=read_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //评论+1
    addRemarkNum(id) {
        let sql = `update b_contents set remark_num=remark_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //点赞+1
    addAdmireNum(id) {
        let sql = `update b_contents set admire_num=admire_num+1 where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    content(id) {
        let sql = `select ${field},ct.name as typeName,s.name as specialName from b_contents left join b_type ct on b_contents.type_id=ct.id left join b_special s on b_contents.special_id=s.id where b_contents.id=?`;
        return Mysql.excute(sql, [id]);
    },
    //标签、专栏、类别列表
    listByParam(param) {
        let {keyword, typeId, specialId, labels, top, recommend, status, orderSn, orderUd, pageNum, pageSize} = param;
        let where = 'where 1=1';
        if (keyword) where += ` and (c.title like '%${keyword}%' or c.introduction like '%${keyword}%')`;
        if (typeId) where += ` and c.type_id=${typeId}`;
        if (specialId) where += ` and c.special_id=${specialId}`;
        if (labels) where += ` and c.labels like '%${labels}%'`;
        if (top) where += ` and top=${top}`;
        if (recommend) where += ` and recommend=${recommend}`;
        if (status) where += ` and status=${status}`;
        let order = '';
        if (orderSn && orderUd) order += `order by c.${orderSn} ${orderUd}`;
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select c.id,c.title,c.introduction,c.source,c.images,c.admire_num as admireNum,c.status,c.create_time as createTime,c.read_num as readNum,c.remark_num as remarkNum,t.name as typeName from b_contents c left join b_type t on c.type_id=t.id ${where} ${order} ${limit};`;
        let count = `select count(*) as count from b_contents c ${where};`;
        return Mysql.excute(sql + count);
    },
    //最近评论文章10条
    remarkList() {
        let order = 'order by b.create_time desc';
        let limit = 'limit 5';
        let sql = `select c.id,c.title,c.images,c.create_time as createTime,c.read_num as readNum from b_contents c left join b_remark b on c.id=b.content_id ${order} ${limit}`;
        return Mysql.excute(sql);
    },
};