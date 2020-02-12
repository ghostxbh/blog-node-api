/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description Special model
 */
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../util/sequelize_util');
const {INTEGER, STRING, CHAR, DATE, ENUM, JSON, NOW} = Sequelize;

const Special = sequelize.define('b_special', {
    id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: STRING(255),
        allowNull: false,
        comment: '专栏标题',
    },
    introduction: {
        type: STRING(255),
        allowNull: true,
        comment: '专栏描述',
    },
    portrait: {
        type: STRING(255),
        allowNull: true,
        comment: '封面图',
    },
    docNum: {
        type: INTEGER(5),
        allowNull: false,
        field: 'doc_num',
        defaultValue: 0,
        comment: '文章数',
    },
    readNum: {
        type: INTEGER(5),
        allowNull: false,
        field: 'read_num',
        defaultValue: 0,
        comment: '阅读数',
    },
    fieldSort: {
        type: INTEGER(3),
        defaultValue: -1,
        field: 'field_sort',
        allowNull: false,
        validate: {min: -1, max: 100},
        comment: '排序',
    },
    isEnable: {
        type: CHAR(1),
        field: 'is_enable',
        allowNull: false,
        defaultValue: '1',
        comment: '是否启用',
    },
    labels: {
        type: STRING(255),
        allowNull: true,
        comment: '标签',
    },
    creator: {
        type: STRING(64),
        allowNull: true,
        comment: '创建人',
    },
    createTime: {
        type: DATE,
        allowNull: false,
        field: 'create_time',
        comment: '创建时间',
    },
    updator: {
        type: STRING(64),
        allowNull: true,
        comment: '修改人',
    },
    updateTime: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: 'update_time',
        comment: '修改时间',
        get() {
            return moment(this.getDataValue('timestamp').format('YYYY-MM-DD HH:mm:ss'));
        }
    },
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Special;
