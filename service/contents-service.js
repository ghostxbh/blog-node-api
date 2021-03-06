/**
 * Created by xbh 2019-06-13
 */
const categoryService = require('../service/category-service');
const contentsDao = require('../dao/contents-dao');
const remarkDao = require('../dao/remark-dao');
const labelsDao = require('../dao/labels-dao');
const specialDao = require('../dao/special-dao');
const typeDao = require('../dao/type-dao');
const dateFormat = require('../util/date-util');
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
        typeDao.addContentNum(typeId, 1);
        //special+1
        if (specialId) specialDao.addConten(specialId, 1);
        return contentsDao.addContent(content);
    },
    del: async (id) => {
        let [content] = await contentsDao.content(id);
        let {labels, typeId, specialId} = content;
        //标签减数
        if (labels) {
            let labelList = labels.indexOf(';') > -1 ? labels.split(';') : [labels];
            for (let i = 0; i < labelList.length; i++) {
                let [total] = await labelsDao.labelByName(labelList[i]);
                if (total.count < 1) {
                    labelsDao.addNum(labelList[i], 0);
                }
            }
        }
        //type-1
        typeDao.addContentNum(typeId, 1);
        //special-1
        if (specialId) specialDao.addConten(specialId, 1);
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
        let [[content], remarks] = await Promise.all([contentInfo, remarkList]);
        //content read +1
        contentsDao.addReadNum(id);
        //special read +1
        let specialId = content.specialId;
        if (specialId) specialDao.addRead(specialId);
        content.createTime = dateFormat(content.createTime);
        remarks.forEach(x => x.createTime = dateFormat(x.createTime, 1));
        let result = {content: content || {}, remarks: remarks || []};
        return Promise.resolve(result);
    },
    list: async (keyword, typeId, specialId, labels, pageNum, pageSize,status) => {
        let content = contentsDao.listByParam({keyword, typeId, specialId, labels, pageNum, pageSize, status});
        let [[contentList, [total]]] = await Promise.all([content]);
        let contents = {pageNum: parseInt(pageNum), pageSize: parseInt(pageSize)};
        contentList.forEach(x => x.createTime = dateFormat(x.createTime, 1));
        contents.list = contentList;
        contents.total = total.count;
        contents.totalPage = Math.ceil(total.count / pageSize);
        let result = {contents: contents};
        if (keyword) result.title = keyword;
        if (typeId) {
            let [type] = await typeDao.typeInfo(typeId);
            result.title = type.name;
        }
        if (specialId) {
            let [special] = await specialDao.special(specialId);
            result.title = special.name;
        }
        if (labels) result.title = labels;
        return Promise.resolve(result);
    },
    //点赞 +1
    addAdmire(id) {
        return contentsDao.addAdmireNum(id);
    },
    addPage: async () => {
        let [treeList, specialList] = await Promise.all([categoryService.treeList(), specialDao.specialList()]);
        return Promise.resolve({treeList, specialList});
    },
    contentInfo: async (id) => {
        let ct = contentsDao.content(id);
        let t = typeDao.typeList();
        let cs = categoryService.treeList();
        let s = specialDao.specialList();
        let [[content], [typeList,[tTotal]], treeList, specialList] = await Promise.all([ct, t, cs, s]);
        typeList.forEach(x => {
            if (content.typeId == x.id) {
                content.typeName = x.name;
                content.categoryId = x.categoryId;
            }
        });
        return Promise.resolve({treeList, specialList, content})
    },
};

module.exports = contentsService;