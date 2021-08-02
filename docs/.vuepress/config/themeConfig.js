const nav = require('./nav.js');
const sidebar = require('./sidebar.js');

// 主题配置
module.exports = {
  nav,
  sidebar,
  sidebarDepth: 1, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
  logo: '/logo.png',
  repo: 'cnjm', // 导航栏右侧生成Github链接
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  // algolia: {
  //   apiKey: '<API_KEY>',
  //   indexName: '<INDEX_NAME>'
  // },
  lastUpdated: '上次更新',
  docsDir: 'docs',
  editLinks: false,
  editLinkText: '编辑',
  smoothScroll: true,
  displayAllHeaders: true,
  author: {
    name: 'cnjm',
    link: 'https://github.com/cnjm',
  },
  blogger: {
    avatar: 'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103123203.jpg',
    name: 'cnjm',
    slogan: '页面仔',
  },
  social: {
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'mailto:chenjiamingcn@qq.com',
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/cnjm',
      }
    ],
  },
  footer: {
    createYear: 2021,
    copyrightInfo:
      'Copyright © 2021-2021 cnjm | MIT License',
  }
}
