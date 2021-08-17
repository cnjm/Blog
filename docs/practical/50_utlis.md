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

## cloneDeep()

深拷贝

```js
cloneDeep(obj);
```

## uaCheck()

判断当前 ua

支持以下，返回 true 或者 false

Windows

MacOS

Linux

Android

IOS

Mobile

Tablet

WeChat

IPhone

IPad

```js
uaCheck("Windows");
```

## regToFen()

regToFen 可元转分 接受两个参数 yuan digit

yuan:需要转换的值，可以是数字或可 Number 转换的字符串

digit:非必填，默认 100 即元转分。这将决定数字进位。

```js
console.log(regToFen("300.25", 1000)); // 300250
console.log(regToFen(300.25, 100)); // 30025
```

## regToYuan()

regToYuan 可分转元 接受两个参数 fen digit

fen:需要转换的值，可以是数字或可 Number 转换的字符串

digit:非必填，默认 100 。这将决定数字精度，不在范围内将舍弃。

```js
console.log(regToYuan(0.2, 1000)); //0.002
console.log(regToYuan(5000.22)); //50
```
