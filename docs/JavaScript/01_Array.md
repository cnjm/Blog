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

## pop()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
console.log(fruits.pop()); //Mango
```
从数组中删除最后一个元素,并返回该元素

## push()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
console.log(fruits.push("Kiwi")); //5
```
从数组最后添加一个元素,并返回该数组的长度

## shift()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
console.log(fruits.shift()); //Banana
```
从数组中删除第一个元素,并返回该元素

## unshift()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
console.log(fruits.unshift("Lemon")); //5
```
从数组开头添加元素,并返回该数组的长度

## splice()
``` js
let fruits = ["Banana", "Orange","Apple", "Mango"];
//在包含下标为2的位置往后删除1个项，并插入"Lemon", "Kiwi"
console.log(fruits.splice(2, 1, "Lemon", "Kiwi")); //Apple
```
可用于向数组添加新项,并返回一个包含已删除项的数组

第一个参数（2）定义了应添加新元素的位置（拼接）。

第二个参数（0）定义应删除多少元素。

其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。