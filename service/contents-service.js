/**
 * Created by xbh 2019-06-13
 */
const contentsDao = require('../dao/contents-dao');
const remarkDao = require('../dao/remark-dao');
const labelsDao = require('../dao/labels-dao');
const specialDao = require('../dao/special-dao');
const typeDao = require('../dao/type-dao');
const contentsService = {
    //admin
    add: async (content) => {
        let {typeId, specialId, labels} = content;
        let labelList = labels.indexOf(';') > -1 ? labels.split(';') : [labels];
        //增加标签
        for (let i = 0; i < labelList.length; i++) {
            let [total] = await labelsDao.labelByName(labelList[i]);
            if (total.count < 1) {
                labelsDao.addLabel(labelList[i]);
                labelsDao.addNum(labelList[i]);
            }
        }
        //type+1
        typeDao.addContentNum(typeId);
        //special+1
        if (specialId) specialDao.addConten(specialId);
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
        let specialList = specialDao.specialList(null, 1, 5);
        let [content, remarks, labels, specials] = await Promise.all([contentInfo, remarkList, labelList, specialList]);
        //content read +1
        contentsDao.addReadNum(id);
        //special read +1
        let specialId = content.specialId;
        if (specialId) specialDao.addRead(specialId);
        let result = {content: content || {}, remarks: remarks || [], labels: labels || [], specials: specials || []};
        return Promise.resolve(result);
    },
    list: async (typeId, pageNum, pageSize) => {
        let contentList = contentsDao.listByParam({typeId, pageNum, pageSize, status: 1});
        let labelList = labelsDao.labelList();
        let specialList = specialDao.specialList(null, 1, 5);
        let [[contentArr, [total]], labels, specials] = await Promise.all([contentList, labelList, specialList]);
        let contents = {pageNum, pageSize};
        contents.list = contentArr;
        contents.total = total.count;
        contents.totalPage = Math.ceil(total.count / pageSize);
        let result = {contents: contents || {}, labels: labels || [], specials: specials || []};
        return Promise.resolve(result);
    },
    //点赞 +1
    addAdmire(id) {
        return contentsDao.addAdmireNum(id);
    },
};

module.exports = contentsService;