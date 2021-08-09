# date

## format()

这个方法包含三个参数：date,format,isUTC

第一个参数必须为数字或字符串或 Date 对象,是当前需要转换的时间。

第一个参数必须为字符串,表示需要转换的格式，其中 YYYY/YY 表示 4/2 位数年，HH,hh 表示 24 时/12 时制，A/a 表示 AM、PM;

MM,DD,mm,ss,S 一次为月份，天，分秒，毫秒；位数区分是否补 0

isUTC 是布尔值，表示是否使用标准时间，可选

eg:

```js
console.log(format(new Date(), "YYYY-MM-D:HH:mm:ss")); // 2021-08-9:17:42:36
console.log(format(new Date(), "A-YYYY-MM-DD:hh")); // PM-2021-08-09:05
console.log(format(new Date(), "YY年MM月DD日hh时mm分ss秒SSS毫秒")); // 21年08月09日05时42分36秒457毫秒
```

::: tip
所有 JavaScript 对象都拥有 toString() 方法。
:::
