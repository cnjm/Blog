# 使用方法

## Npm

```js
npm install cnjm-practical

import practical from 'cnjm-practical'
```

[npm](https://www.npmjs.com/package/cnjm-practical)
practical 包含所有的可用方法

::: tip 提示
practical 可自定

推荐使用 npm 引入使用，这将可以配合 babel-plugin-lodash 等方法按需引入使用
:::

## CDN

```js
// 建议使用最新版本
<script src="https://cdn.jsdelivr.net/npm/cnjm-practical"></script>

// 以下可以指定版本引入注意x.x.x 为版本号最新版本请以npm为准
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
