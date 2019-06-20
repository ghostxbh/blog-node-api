/**
 * Created by xbh 2019-06-20
 */
const labelsDao = require('../dao/labels-dao');
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
    list(pageNum, pageSize) {
        return labelsDao.labelList('', pageNum, pageSize);
    },
};