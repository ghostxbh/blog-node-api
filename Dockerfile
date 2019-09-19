FROM node:12.6.0

# 创建app目录
RUN mkdir -p /app/node

# 设置工作目录
WORKDIR /app/node

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /app/node/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录
COPY . /app/node

# 暴露容器端口
EXPOSE 8100

# 启动node应用
CMD npm start
