/**
 * Created by xbh 2019-06-12
 */
const typeDao = require('../dao/type-dao');
const dataUtil = require('../util/date-util');
const typeService = {
    add(type) {
        return typeDao.addType(type);
    },
    del(id) {
        return typeDao.delType(id);
    },
    modify(id, type) {
        type.id = id;
        return typeDao.modifyType(type);
    },
    addContentNum(id) {
        return typeDao.addContentNum(id);
    },
    list: async (pageNum, pageSize) => {
        let result = {pageNum: parseInt(pageNum), pageSize: parseInt(pageSize)};
        let [list, [total]] = await typeDao.typeList(pageNum, pageSize);
        result.total = total.count;
        result.totalPage = Math.ceil(total.count / pageSize);
        list.forEach(x => x.createTime = dataUtil(x.createTime, 1));
        result.list = list;
        return Promise.resolve(result);
    },
    cateList(categoryId) {
        return typeDao.categoryList(categoryId)
    },
};
module.exports = typeService;