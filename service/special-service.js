/**
 * Created by xbh 2019-06-20
 */
const specialDao = require('../dao/special-dao');

module.exports = {
    add(special) {
        return specialDao.addSpecial(special);
    },
    del(id) {
        return specialDao.delSpecial(id);
    },
    modify(id, special) {
        special.id = id;
        return specialDao.modifySpecial(special);
    },
    list(pageNum, pageSize) {
        return specialDao.specialList('', pageNum, pageSize);
    },
};