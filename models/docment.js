/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description
 */
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../util/sequelize_util');
const {INTEGER, STRING, CHAR, DATE, ENUM, JSON, TEXT, NOW} = Sequelize;

const Docment = sequelize.define('b_docment', {
    id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: STRING(255),
        allowNull: false,
        unique: 'title_app_creator',
        comment: '文档标题',
    },
    introduction: {
        type: STRING(255),
        allowNull: true,
        comment: '文档描述/摘要',
    },
    portrait: {
        type: STRING(255),
        allowNull: true,
        comment: '封面图',
    },
    sourceType: {
        type: ENUM('original', 'reprint', 'translate'),
        field: 'source_type',
        defaultValue: 'original',
        allowNull: false,
        comment: '文章来源',
    },
    appType: {
        type: STRING(10),
        field: 'app_type',
        defaultValue: 'blog',
        unique: 'title_app_creator',
        allowNull: false,
        comment: '文章来源',
    },
    content: {
        type: TEXT,
        allowNull: true,
        comment: '内容',
    },
    contentMD: {
        type: TEXT,
        field: 'content_md',
        allowNull: true,
        comment: 'markdown内容',
    },
    status: {
        type: ENUM('drafts', 'text', 'recycle'),
        defaultValue: 'text',
        allowNull: false,
        comment: '文章状态',
    },
    isCommon: {
        type: CHAR(1),
        allowNull: false,
        field: 'is_common',
        defaultValue: 0,
        comment: '是否评论',
    },
    commonNum: {
        type: INTEGER(5),
        allowNull: false,
        field: 'common_num',
        defaultValue: 0,
        comment: '评论数',
    },
    readNum: {
        type: INTEGER(5),
        allowNull: false,
        field: 'read_num',
        defaultValue: 0,
        comment: '阅读数',
    },
    supportNum: {
        type: INTEGER(5),
        allowNull: false,
        field: 'support_num',
        defaultValue: 0,
        comment: '点赞数',
    },
    labels: {
        type: STRING(255),
        allowNull: true,
        comment: '标签',
    },
    fieldSort: {
        type: INTEGER(3),
        defaultValue: -1,
        field: 'field_sort',
        allowNull: false,
        validate: {min: -1, max: 100},
        comment: '排序',
    },
    isTop: {
        type: CHAR(1),
        field: 'is_top',
        allowNull: false,
        defaultValue: '0',
        comment: '是否置顶',
    },
    isRecommend: {
        type: CHAR(1),
        field: 'is_recommend',
        allowNull: false,
        defaultValue: '0',
        comment: '是否推荐',
    },
    isEnable: {
        type: CHAR(1),
        field: 'is_enable',
        allowNull: false,
        defaultValue: '1',
        comment: '是否启用',
    },
    isJson: {
        type: CHAR(1),
        field: 'is_json',
        allowNull: false,
        defaultValue: '0',
        comment: '是否启用json配置',
    },
    jsonConfig: {
        type: JSON,
        field: 'json_config',
        allowNull: true,
        comment: 'json配置',
    },
    creator: {
        type: STRING(64),
        allowNull: true,
        unique: 'title_app_creator',
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

module.exports = Docment;

// const doc = {
//     title: 'vue开发环境搭建',
//     introduction: 'vue开发环境搭建，vue项目的新建（基于命令创建）',
//     portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564033535573&di=f62ef3aa43f99b26d1946a7547975208&imgtype=0&src=http%3A%2F%2Fimage.devopen.club%2Fcover_fix_1500_900.jpg%3FimageView2%2F2%2Fw%2F1500%2Finterlace%2F1%2Fq%2F100',
//     content: `<h2 id="h2-vue-"><a name="vue开发环境搭建(官方推荐命令)" class="reference-link"></a><span class="header-link octicon octicon-link"></span>vue开发环境搭建(官方推荐命令)</h2><p>必须有<strong>node</strong>环境</p>
//                 <pre><code>npm install -global vue-cli / cnpm install -global vue-cli
//                 </code></pre><pre><code>#创建
//                 vue init webpack vuedemo
//                 #进入项目路径
//                 cd vuedemo
//                 #安装依赖
//                 npm install / cnpm install
//                 #启动
//                 npm run dev
//                 </code></pre><blockquote>
//                 <p>2.创建&amp;启动项目（webpack-simple创建）</p>
//                 </blockquote>
//                 <pre><code>#创建
//                 vue init webpack-simple vuedemo
//                 #进入项目路径
//                 cd vuedemo
//                 #安装依赖
//                 npm install / cnpm install
//                 #启动
//                 npm run dev
//                 </code></pre><h3 id="h3-vue-cli-2-x-3-x"><a name="vue-cli 2.X升级3.X" class="reference-link"></a><span class="header-link octicon octicon-link"></span>vue-cli 2.X升级3.X</h3><blockquote>
//                 <p>1.<strong>升级3.X之前需要卸载2.X</strong></p>
//                 </blockquote>
//                 <pre><code>npm uninstall -global vue-cli
//                 </code></pre><blockquote>
//                 <p>2.安装vue-cli 3.X(以下3种命令都可以安装)</p>
//                 </blockquote>
//                 <pre><code>npm install -g @vue/cli
//                 cnpm install -g @vue/cli
//                 yarn global add @vue/cli
//                 </code></pre><blockquote>
//                 <p>3.创建&amp;启动项目</p>
//                 </blockquote>
//                 <pre><code>#创建项目
//                 vue create vuedome01
//                 #进入项目路径
//                 cd vuedemo01
//                 #启动项目
//                 npm run serve
//                 #编译项目
//                 npm run build
//                 </code></pre><h4 id="h4-ps-cnpm-"><a name="PS：cnpm的安装(淘宝镜像)" class="reference-link"></a><span class="header-link octicon octicon-link"></span>PS：cnpm的安装(淘宝镜像)</h4>`,
//     contentMD: `## vue开发环境搭建(官方推荐命令)
//                 必须有**node**环境
//
//                 \`\`\`
//                 npm install -global vue-cli / cnpm install -global vue-cli
//                 \`\`\`
//
//                 \`\`\`
//                 #创建
//                 vue init webpack vuedemo
//                 #进入项目路径
//                 cd vuedemo
//                 #安装依赖
//                 npm install / cnpm install
//                 #启动
//                 npm run dev
//                 \`\`\`
//
//                 > 2.创建&启动项目（webpack-simple创建）
//
//                 \`\`\`
//                 #创建
//                 vue init webpack-simple vuedemo
//                 #进入项目路径
//                 cd vuedemo
//                 #安装依赖
//                 npm install / cnpm install
//                 #启动
//                 npm run dev
//                 \`\`\`
//                 ### vue-cli 2.X升级3.X
//
//                 > 1.**升级3.X之前需要卸载2.X**
//
//                 \`\`\`
//                 npm uninstall -global vue-cli
//                 \`\`\`
//
//                 > 2.安装vue-cli 3.X(以下3种命令都可以安装)
//
//                 \`\`\`
//                 npm install -g @vue/cli
//                 cnpm install -g @vue/cli
//                 yarn global add @vue/cli
//                 \`\`\`
//
//                 > 3.创建&启动项目
//
//                 \`\`\`
//                 #创建项目
//                 vue create vuedome01
//                 #进入项目路径
//                 cd vuedemo01
//                 #启动项目
//                 npm run serve
//                 #编译项目
//                 npm run build
//                 \`\`\`
//
//                 #### PS：cnpm的安装(淘宝镜像)`,
//     readNum: 15,
//     isCommon: '1',
//     commonNum: 2,
//     supportNum: 50,
//     labels: 'vue;vue-cli;',
//     createTime: new Date(),
//
// };
//
// Docment.sync({
//     force: false
// }).then(() => {
//     return Docment.create(doc);
// })
