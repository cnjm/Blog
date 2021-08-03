# 数组方法

## fill()
``` js
const arr = new Array(5).fill('c')
console.log(arr); //["c", "c", "c", "c", "c"]
```
es6中的Array.prototype.fill()可以用一个固定值填充数组中从起始索引到终止索引中的全部元素。

这个方法包含三个参数：value， start，end。

value即该固定值，start与end分别为起始索引与终止索引，这两个参数可以省略，左闭右开。

## toString()
``` js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.toString()); //Banana,Orange,Apple,Mango
```
自动把数组转换为字符串

::: tip
所有 JavaScript 对象都拥有 toString() 方法。
:::

## join()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
console.log(fruits.join(" * ")); //Banana * Orange * Apple * Mango
```
类似 toString()

可以规定分隔符将所有数组元素结合为一个字符串