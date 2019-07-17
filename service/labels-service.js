/**
 * Created by xbh 2019-06-20
 */
const labelsDao = require('../dao/labels-dao');
const dataUtil = require('../util/date-util');
module.exports = {
    add(name) {
        return labelsDao.addLabel(name);
    },
    del(id) {
        return labelsDao.delLabel(id);
    },
    modify(id, label) {
        label.id = id;
        return labelsDao.modifyLabel(label);
    },
    all() {
        return labelsDao.labelAll();
    },
    list: async (pageNum, pageSize) => {
        let result = {pageNum: parseInt(pageNum), pageSize: parseInt(pageSize)};
        let [list, [total]] = await labelsDao.labelList(1, pageNum, pageSize);
        result.total = total.count;
        result.totalPage = Math.ceil(total.count / pageSize);
        list.forEach(x => x.createTime = dataUtil(x.createTime, 1));
        result.list = list;
        return Promise.resolve(result);
    },
};