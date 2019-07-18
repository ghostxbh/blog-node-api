/**
 * Created by xbh 2019-06-12
 */
const typeDao = require('../dao/type-dao');
const categoryService = require('../service/category-service');
const dataUtil = require('../util/date-util');
const typeService = {
    add(type) {
        return typeDao.addType(type);
    },
    del: async (id) => {
        let [type] = await typeDao.typeInfo(id);
        if (type.contentNum > 0) return Promise.resolve({affectedRows: 0});
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
        let [[list, [total]], cateList] = await Promise.all([typeDao.typeList(pageNum, pageSize), categoryService.list()]);
        result.total = total.count;
        result.totalPage = Math.ceil(total.count / pageSize);
        list.forEach(x => x.createTime = dataUtil(x.createTime, 1));
        result.list = list;
        result.cateList = cateList;
        return Promise.resolve(result);
    },
    cateList(categoryId) {
        return typeDao.categoryList(categoryId)
    },
};
module.exports = typeService;