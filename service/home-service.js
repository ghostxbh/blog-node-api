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
const dateFormat = require('../util/date-util');
const homeService = {
    //首页
    home: async () => {
        let pageNum = conf.pageUtil.pageNum;
        let pageSize = conf.pageUtil.pageSize;
        //推荐文章
        let recommend = contentDao.listByParam({recommend: 1, pageNum: 1, pageSize: 1});
        //文章列表（时间倒序）
        let contentList = contentDao.listByParam({orderSn: 'create_time', orderUd: 'desc', pageNum, pageSize});
        let [[[recommends]], [contentArr, [cTotal]]] = await Promise.all([recommend, contentList]);
        let contents = {pageNum, pageSize};
        contentArr.forEach(x => x.createTime = dateFormat(x.createTime));
        contents.list = contentArr;
        contents.total = cTotal.count;
        contents.totalPage = Math.ceil(cTotal.count / pageSize);
        let result = {recommend: recommends, contents};
        return Promise.resolve(result);
    },
    rightSidebar: async () => {
        //最新评论列表文章
        let remarkList = contentDao.remarkList();
        //标签云
        let labelList = labelsDao.labelList('', conf.pageUtil.pageNum, conf.pageUtil.pageSize);
        //友链
        let linksList = linksDao.udList(1);
        //专栏
        let specialList = specialDao.specialList(null, 1, 5);
        let [remarks, labels, links, specials] = await Promise.all([remarkList, labelList, linksList, specialList]);
        remarks.forEach(x => x.createTime = dateFormat(x.createTime));
        specials.forEach(x => x.create_time = dateFormat(x.create_time));
        let result = {remarks, labels, links, specials};
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