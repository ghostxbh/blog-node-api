/**
 * Created by xbh 2019-06-17 首页业务
 */
const contentDao = require('../dao/contents-dao');
const categoryDao = require('../dao/category-dao');
const categoryService = require('../service/category-service');
const typeDao = require('../dao/type-dao');
const linksDao = require('../dao/links-dao');
const labelsDao = require('../dao/labels-dao');
const specialDao = require('../dao/special-dao');
const conf = require('../conf/resource');
const homeService = {
    //首页
    home: async () => {
        let pageNum = conf.pageUtil.pageNum;
        let pageSize = conf.pageUtil.pageSize;
        //最新评论列表文章
        let remarkList = contentDao.remarkList();
        //标签云
        let labelList = labelsDao.labelList('', conf.pageUtil.pageNum, conf.pageUtil.pageSize);
        //友链
        let linksList = linksDao.udList(1);
        //专栏
        let specialList = specialDao.specialList(null, 1, 5);
        //推荐文章
        let recommendList = contentDao.listByParam({recommend: 1, pageNum: 1, pageSize: 2});
        //文章列表（时间倒序）
        let contentList = contentDao.listByParam({orderSn: 'create_time', orderUd: 'desc', pageNum, pageSize});
        //树形分类
        let categoryList = categoryService.treeList();
        let data = await Promise.all([remarkList, labelList, linksList, specialList, recommendList, contentList, categoryList]);
        let [remarks, labels, linkses, specials, [recommends, [reTotal]], [contentArr, [cTotal]], categories] = data;
        let contents = {pageNum, pageSize};
        contents.list = contentArr;
        contents.total = cTotal.count;
        contents.totalPage = Math.ceil(cTotal.count / pageSize);
        let result = {categories, recommends, contents, specials, remarks, labels, linkses};
        return Promise.resolve(result);
    },
    //搜索
    search: async (keyword) => {
        let pageNum = conf.pageUtil.pageNum;
        let pageSize = conf.pageUtil.pageSize;
        let result = {pageNum, pageSize};
        let [list, [total]] = await contentDao.listByParam({keyword, pageNum, pageSize});
        result.totalPage = Math.ceil(total.count / pageSize);
        result.list = list;
        return Promise.resolve(result);
    },
};

module.exports = homeService;