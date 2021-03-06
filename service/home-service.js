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
        let recommend = contentDao.listByParam({recommend: 1, pageNum: 1, pageSize: 4});
        //文章列表（时间倒序）
        let contentList = contentDao.listByParam({ status:1, orderSn: 'create_time', orderUd: 'desc', pageNum, pageSize});
        let [[recommends, [rtotal]], [contentArr, [cTotal]]] = await Promise.all([recommend, contentList]);
        let contents = {pageNum, pageSize};
        contentArr.forEach(x => x.createTime = dateFormat(x.createTime));
        contents.list = contentArr;
        contents.total = cTotal.count;
        contents.totalPage = Math.ceil(cTotal.count / pageSize);
        let result = {recommends, contents};
        return Promise.resolve(result);
    },
    //右侧栏
    rightSidebar: async () => {
        //最新评论列表文章
        let remarkList = contentDao.remarkList();
        //标签云
        let labelList = labelsDao.labelList('', conf.pageUtil.pageNum, conf.pageUtil.pageSize);
        //友链
        let linksList = linksDao.udList(1);
        //专栏
        let specialList = specialDao.specialList(null, 1, 5);
        let data = await Promise.all([remarkList, labelList, linksList, specialList]);
        let [remarks, [labels, [labelTotal]], links, specials] = data;
        if (remarks) remarks.forEach(x => x.createTime = dateFormat(x.createTime));
        if (specials) specials.forEach(x => x.createTime = dateFormat(x.createTime));
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