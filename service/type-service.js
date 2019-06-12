/**
 * Created by xbh 2019-06-12
 */
const typeDao = require('../dao/type-dao');

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
    addContentNum(id){
        return typeDao.addContentNum(id);
    },
    list(){
        return typeDao.typeList();
    },
    cateList(categoryId){
        return typeDao.categoryList(categoryId)
    },
};
module.exports = typeService;