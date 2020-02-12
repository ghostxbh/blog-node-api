/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description Link model
 */
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../util/sequelize_util');
const {INTEGER, STRING, CHAR, DATE, ENUM, JSON, NOW} = Sequelize;

const Link = sequelize.define('b_link', {
    id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: STRING(255),
        allowNull: false,
        comment: '链接',
    },
    name: {
        type: STRING(60),
        allowNull: false,
        comment: '友链名',
    },
    contact: {
        type: JSON,
        allowNull: true,
        comment: '联系方式',
    },
    remark: {
        type: STRING(255),
        allowNull: true,
        comment: '备注',
    },
    hopCount: {
        type: INTEGER(5),
        allowNull: false,
        field: 'hop_count',
        defaultValue: 0,
        comment: '跳转数',
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
    status: {
        type: ENUM('unaudited', 'normal', 'blacklist'),
        allowNull: false,
        defaultValue: 'unaudited',
        comment: '状态',
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

module.exports = Link;
