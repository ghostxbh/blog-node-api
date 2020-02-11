# blog-node-api 博客/文档API

## Dependency
- [Node.js](http://nodejs.cn/)
- [Express](http://www.expressjs.com.cn/)
- [Mysql2](https://github.com/sidorares/node-mysql2) 
- [apidoc](http://apidocjs.com/)
- [sequelize](https://github.com/sequelize/sequelize/)
- [log4js](http://github.com/log4js-node/log4js-node/)

## Deploy
1. 数据库工具执行`document`下的`.sql`文件
2. 修改`conf/mysql-connection.json`的数据连接信息
3. 运行
    - 本地运行 使用ide直接运行，或者在项目目录下执行`node /bin/blog-node-api`脚本
    - 守护运行 使用pm2运行，`pm2 start blog-node-api`
    - 容器运行 使用docker运行，脚本执行`sh DockerBash.sh`
4. 启动测试
    - 首页接口访问[home](http://127.0.0.1:8100/font/home)
