/**
 * Created by xbh 2019-06-12
 */
const categoryDao = require('../dao/category-dao');
const typeDao = require('../dao/type-dao');
const categoryService = {
    add(category) {
        return categoryDao.addCate(category);
    },
    del(id) {
        return categoryDao.delCate(id);
    },
    modify(id, category) {
        category.id = id;
        return categoryDao.modifyCate(category);
    },
    list() {
        return categoryDao.categories();
    },
    treeList: async () => {
        let cateList = await categoryDao.categories();
        for (let i = 0; i < cateList.length; i++) {
            cateList[i].children = await typeDao.categoryList(cateList[i].id);
        }
        return Promise.resolve(cateList);
    },
};
module.exports = categoryService;