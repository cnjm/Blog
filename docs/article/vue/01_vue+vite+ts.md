## 初始化项目

将从零到壹构建一个 vite+vue3+Antd 的后台管理项目

以求实现：

### yarn 创建项目

```shell
yarn create @vitejs/app
```

1. 输入项目名称
2. 选择 vue
3. 选择 vue-ts

```shell
cd project-name
yarn dev
```

最基本的项目已经启动

### vscode 安装插件、禁用插件，配置`prettier` `eslint`

vscode 安装`prettier`、`Eslint`、`Volar`禁用 vue2 的 Vetur

建议工作区设置

```shell
yarn add prettier --dev

yarn add eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue --dev

yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev
```

1. 新建.prettierrc

基本就对着[prettier 官方文档](https://prettier.io/docs/en/options.html) 进行配置的，具体含义在这查吧

```js
{
  "eslintIntegration": true,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "trailingComma": "none",
  "arrowParens": "always",
  "proseWrap": "never",
  "vueIndentScriptAndStyle": true,
  "htmlWhitespaceSensitivity": "strict",
  "endOfLine": "lf"
}
```

2. 新建.eslintrc.js

[eslint 官方文档](https://eslint.org/docs)

[eslint-plugin-vue](https://eslint.vuejs.org/rules/)

配置 eslintrc

```js
// https://eslint.org/docs
module.exports = {
  // 限定根目录
  root: true,
  // vue官方提ESLint 插件 eslint-plugin-vue提供了 parser 和 rules。
  // parser 为 vue-eslint-parser
  parser: "vue-eslint-parser",
  // 解析器选项
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 指定启用环境
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  globals: {},
  // 启用推荐的规则
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    // 'prettier/@typescript-eslint',
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 未使用变量直接error 且忽略名称以下划线开头的变量
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "space-before-function-paren": "off",
    // 警告除配置的大小写之外的自定义事件名称
    "vue/custom-event-name-casing": "off",
    // 防止<script setup>使用的变量<template>被标记为未使用
    "vue/script-setup-uses-vars": "error",
    // 强制属性顺序
    "vue/attributes-order": "off",
    // 每个文件是否只有一个组件
    "vue/one-component-per-file": "off",
    // 标签的右括号之前强制换行
    "vue/html-closing-bracket-newline": "off",
    // 限制每行的最大属性/属性数以提高可读性
    "vue/max-attributes-per-line": "off",
    // 需要在多行元素的内容前后换行
    "vue/multiline-html-element-content-newline": "off",
    // 需要在单行元素的内容前后换行
    "vue/singleline-html-element-content-newline": "off",
    // 在模板中的自定义组件上强制执行属性命名样式
    "vue/attribute-hyphenation": "off",
    // 此规则要求为每个未标记为required（Boolean道具除外）的道具设置默认值
    "vue/require-default-prop": "off",
    // 消除自我分配
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
```

想要玩转这些配置，估计都得有个配置工程师了(手动狗头)

### 取消一些可能的没必要的文件比如 node_modules，dist 等校验可以通过`.eslintignore`已经`.prettierignore` 文件对应设置，用法跟 gitignore 相同

至于 git 提交前要校验通过啥的才能提交这些就另行搞了

始终觉得代码纯靠自觉，何况编辑器已经做的很好(保存时自动校验修复报 error)，都已经有了提示为什么还想要直接提交，对吧。

可以加个 scripts 脚本，提交之前可以尝试--fix 自动修复，有无法修复的修复后再提交

```json
"lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\" --fix"
```
