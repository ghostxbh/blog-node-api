/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description Label model
 */
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../util/sequelize_util');
const {INTEGER, STRING, DATE} = Sequelize;

const Label = sequelize.define('b_label', {
    id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: STRING(60),
        allowNull: false,
        comment: '标签名',
    },
    num: {
        type: INTEGER(5),
        allowNull: false,
        defaultValue: 0,
        comment: '数量',
    },
    createTime: {
        type: DATE,
        allowNull: false,
        field: 'create_time',
        comment: '创建时间',
    },
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Label;

// const msg = [
//     {
//         title: 'Java指南',
//     },
//     {
//         title: 'NodeJs',
//     },
//     {
//         title: 'VueJs',
//     },
//     {
//         title: '程序人生',
//     },
// ];
//
// msg.forEach(x => {
//     Category.sync({
//         force: false
//     }).then(() => {
//         x.createTime = new Date();
//         return Category.create(x);
//     })
// })

