/**
 * Created by xbh 2019-06-13
 */
const contentsDao = require('../dao/contents-dao');
const remarkDao = require('../dao/remark-dao');
const labelsDao = require('../dao/labels-dao');
const contentsService = {
    //admin
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
    remarkList() {
        return contentsDao.remarkList();
    },
    //font
    content: async (id) => {
        let contentInfo = contentsDao.content(id);
        let remarkList = remarkDao.remarkList(1, null, null, id, 1, 10);
        let labelList = labelsDao.labelList();
        let [content, remarks, labels] = await Promise.all([contentInfo, remarkList, labelList]);
        return Promise.resolve({content, remarks, labels});
    },
};

module.exports = contentsService;