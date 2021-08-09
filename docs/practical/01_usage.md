# 使用方法

## Npm

```js
npm install cnjm-practical

import practical from 'cnjm-practical'
```

practical 包含所有的可用方法

::: tip 提示
practical 可自定

推荐使用 npm 引入使用，这将可以配合 babel-plugin-lodash 等方法按需引入使用
:::

## CDN

```js
// 使用前通过script引入注意x.x.x 为版本号，文档更新时最新版本为1.0.2，最新版本情义npm为准
// https://www.npmjs.com/package/cnjm-practical
<script src="https://cdn.jsdelivr.net/npm/cnjm-practical@x.x.x/dist/cnjm-practical.js"></script>
// other
<script>
    console.log($practical);
</script>
```

\$practical 包含所有的可用方法

::: warning 警告
\$practical 为 cnjm-practical.js 保留的全局变量，请勿冲突。
:::
