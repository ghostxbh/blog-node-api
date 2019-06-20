/**
 * Created by xbh 2019-06-20
 */
const linksDao = require('../dao/links-dao');
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
    list() {
        return linksDao.udList(1);
    },
};