const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../util/sequelize_util');

const Category = sequelize.define('b_category', {
    id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: 'source_type_title',
        comment: '标题',
    },
    sourceType: {
        type: Sequelize.STRING(10),
        field: 'source_type',
        allowNull: false,
        defaultValue: 'blog',
        unique: 'source_type_title',
        comment: '来源类型',
    },
    docType: {
        type: Sequelize.STRING(10),
        field: 'doc_type',
        allowNull: false,
        defaultValue: 'markdown',
        comment: '文档类型',
    },
    status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'normal',
        comment: '状态',
    },
    isEnable: {
        type: Sequelize.STRING(1),
        field: 'is_enable',
        allowNull: false,
        defaultValue: '1',
        comment: '是否启用',
    },
    priority: {
        type: Sequelize.STRING(1),
        defaultValue: '1',
        allowNull: false,
        comment: '等级',
    },
    sort: {
        type: Sequelize.INTEGER(3),
        defaultValue: -1,
        allowNull: false,
        validate: {min: -1, max: 100},
        comment: '排序',
    },
    remark: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '备注',
    },
    isJson: {
        type: Sequelize.STRING(1),
        field: 'is_json',
        allowNull: false,
        defaultValue: '0',
        comment: '是否启用json配置',
    },
    jsonConfig: {
        type: Sequelize.TEXT,
        field: 'json_config',
        allowNull: true,
        comment: 'json配置',
    },
    creator: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: '创建人',
        normal: true,
    },

    createTime: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'create_time',
        comment: '创建时间',
    },
    updator: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: '修改人',
    },
    updateTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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

const msg = [
    {
        title: 'Java指南',
    },
    {
        title: 'NodeJs',
    },
    {
        title: 'VueJs',
    },
    {
        title: '程序人生',
    },
];

msg.forEach(x => {
    Category.sync({
        force: false
    }).then(() => {
        x.createTime = new Date();
        return Category.create(x);
    })
})

