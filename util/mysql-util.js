/**
 * Created by xbh 2019-06-11 mysql连接
 */

const mysql = require('mysql2');
const conf = require('../conf/mysql-connection');

const config = {
    connectionLimit: 5,
    host: conf.host,
    user: conf.username,
    password: conf.password,
    port: conf.port,
    database: conf.database_usercenter,
    multipleStatements: true
};
let conn;
const Mysql = {
    getPool: () => {
        //确认读写数据库
        if (conn) {
            return conn;
        } else {
            conn = mysql.createPool(config);
            console.log(new Date(), '已创建连接池');
            return conn;
        }
    },
    excute: (sql, ps) => {
        return new Promise((resolve, reject) => {
            let pool = Mysql.getPool();
            pool.getConnection((err, conn) => {
                conn.query(sql, ps, (e, v, f) => {
                    if (e) {
                        console.log(e);
                        reject(e);
                    } else {
                        resolve(v);
                    }
                    conn.release();
                });
            });
        });
    },
    //事务执行
    transExcute: (sql, ps) => {
        return new Promise((resolve, reject) => {
            let pool = Mysql.getPool();
            pool.getConnection((err, conn) => {
                conn.beginTransaction(e => {
                    if (e) return reject('开启事务失败');
                    else {
                        conn.query(sql, ps, (e, v, f) => {
                            if (e) {
                                return conn.rollback(() => {
                                    reject('插入失败数据回滚');
                                })
                            } else {
                                conn.commit((e) => {
                                    if (e) {
                                        reject('事务提交失败');
                                    } else {
                                        resolve(v);
                                    }
                                });
                            }
                            conn.release();
                        });
                    }
                });
            });
        });
    },
};

module.exports = Mysql;
