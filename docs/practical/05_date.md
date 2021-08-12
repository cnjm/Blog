# date

```js
let { format, diff, storage } = $practical.date;
```

## format()

这个方法包含三个参数：date,format,isUTC

date 必须为数字或字符串或 Date 对象,是当前需要转换的时间。

format 必须为字符串,表示需要转换的格式，其中 YYYY/YY 表示 4/2 位数年，HH,hh 表示 24 时/12 时制，A/a 表示 AM、PM;

MM,DD,mm,ss,S 一次为月份，天，分秒，毫秒；位数区分是否补 0

isUTC 为布尔值，表示是否使用标准时间，可选

eg:

```js
console.log(format(new Date(), "YYYY-MM-D:HH:mm:ss")); // 2021-08-9:17:42:36
console.log(format(new Date(), "A-YYYY-MM-DD:hh")); // PM-2021-08-09:05
console.log(format(new Date(), "YY年MM月DD日hh时mm分ss秒SSS毫秒")); // 21年08月09日05时42分36秒457毫秒
```

::: tip
所有 JavaScript 对象都拥有 toString() 方法。
:::

## diff()

diff 接受四个参数：startTime,endTime,format,func

| 字段      |                            类型 | 必填 |        说明        |
| --------- | ------------------------------: | :--: | :----------------: |
| startTime |        string \| number \| Date |  是  |      开始时间      |
| endTime   |        string \| number \| Date |  是  |      结束时间      |
| format    | Y \| M \|D \| h \| m \| s \| ms |  是  |    单位默认 ms     |
| func      |                        function |  否  | 可传入对数值的处理 |

```js
console.log(diff(1609434061000, new Date(), "Y")); //1
console.log(diff(1609434061000, new Date(), "D")); //224
console.log(diff(1609434061000, new Date(), "", (num) => Math.ceil(num))); //19323249254
```

::: tip 提示
对于数值的处理默认为 Math.round，如果需要不同的处理，比如使用 ceil 你可以使 func 为：

(num) => Math.ceil(num)
:::
