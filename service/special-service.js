/**
 * Created by xbh 2019-06-20
 */
const specialDao = require('../dao/special-dao');
const dataUtil = require('../util/date-util');
module.exports = {
    add(special) {
        return specialDao.addSpecial(special);
    },
    del: async (id) => {
        let [special] = await specialDao.special(id);
        if (special.contentNum > 0) return Promise.resolve({affectedRows: 0});
        return specialDao.delSpecial(id);
    },
    modify(id, special) {
        special.id = id;
        return specialDao.modifySpecial(special);
    },
    detail: async (id) => {
        let [special] = await specialDao.special(id);
        if (special) special.createTime = dataUtil(special.createTime, 1);
        return Promise.resolve(special);
    },
    list: async (pageNum, pageSize) => {
        let list = await specialDao.specialList('', pageNum, pageSize);
        list.forEach(x => x.createTime = dataUtil(x.createTime, 1));
        return Promise.resolve(list);
    },
};