const head = require('./config/head.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  title: 'CNJM | DOCUMENT',
  description: '即便是风，吹过也留下一片清凉',
  base: "/blog/",
  dest: "blog",
  markdown: {
    lineNumbers: true
  },
  head,
  themeConfig
}