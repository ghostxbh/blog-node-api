/**
 * Created by xbh 2019-06-19
 */
const remarkDao = require('../dao/remark-dao');
const contentDao = require('../dao/contents-dao');
module.exports = {
    add(remark) {
        let contentId = remark.contentId;
        //评论数 +1
        contentDao.addRemarkNum(contentId);
        return remarkDao.addRemark(remark);
    },
    del(id){
        return remarkDao.delRemark(id);
    },
    modify(id,remark){
        remark.id = id;
        return remarkDao.modifyRemark(remark);
    },
    list: async (contentdId, pageNum, pageSize) => {
        let result = {pageNum, pageSize};
        let [list, [total]] = await remarkDao.list(contentdId, pageNum, pageSize);
        result.totalPage = Math.ceil(total.count / pageSize);
        result.total = total.count;
        result.list = list;
        return Promise.resolve(result);
    },
};