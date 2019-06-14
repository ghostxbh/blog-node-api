/**
 * Created by xbh 2019-06-13
 */
const contentsDao = require('../dao/contents-dao');

const contentsService = {
    add(content) {
        return contentsDao.addContent(content);
    },
    del(id) {
        return contentsDao.delContent(id);
    },
    modify(id, content) {
        content.id = id;
        return contentsDao.modifyContent(content);
    },
    remarkList(){
        return contentsDao.remarkList();
    },
};

module.exports = contentsService;