# utils

```js
let { copy } = $practical;
```

## copy()

copy 目前可在用户点击时复制一段文字

copy 接受两个参数 str el。

str:需要复制的 string，必填

el:接受一个符合 querySelector 选择器的写法的 string 作为 append 挂载的元素，默认为 body，非必填

```js
let oApp = document.querySelector(".app");

oApp.onclick = function() {
  copy("testCopy"); //true
};
```
