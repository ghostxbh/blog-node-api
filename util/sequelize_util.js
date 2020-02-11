const Sequelize = require('sequelize');
const conf = require('../conf/mysql-connection');
const sequelize = new Sequelize(conf.database_usercenter, conf.username, conf.password, {
    host: conf.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
});

module.exports = sequelize;
