/**
 * Created by xbh 2019-06-20
 */
const linksDao = require('../dao/links-dao');
const dataUtil = require('../util/date-util');
module.exports = {
    add(link) {
        return linksDao.addLink(link);
    },
    del(id) {
        return linksDao.delLink(id);
    },
    modify(id, link) {
        link.id = id;
        return linksDao.modifyLink(link);
    },
    list: async (status, pageNum, pageSize) => {
        let result = {pageNum: parseInt(pageNum), pageSize: parseInt(pageSize)};
        let [list, [total]] = await linksDao.manageList(status, pageNum, pageSize);
        result.total = total.count;
        result.totalPage = Math.ceil(total.count / pageSize);
        list.forEach(x => x.createTime = dataUtil(x.createTime, 1));
        result.list = list;
        return Promise.resolve(result);
    },
};