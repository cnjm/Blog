# 数组方法

## fill()

```js
const arr = new Array(5).fill("c");
console.log(arr); //["c", "c", "c", "c", "c"]
```

es6 中的 Array.prototype.fill()可以用一个固定值填充数组中从起始索引到终止索引中的全部元素。

这个方法包含三个参数：value， start，end。

value 即该固定值，start 与 end 分别为起始索引与终止索引，这两个参数可以省略，左闭右开。

## toString()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.toString()); //Banana,Orange,Apple,Mango
```

自动把数组转换为字符串

::: tip
所有 JavaScript 对象都拥有 toString() 方法。
:::

## join()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.join(" * ")); //Banana * Orange * Apple * Mango
```

类似 toString()

可以规定分隔符将所有数组元素结合为一个字符串

## pop()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.pop()); //Mango
```

从数组中删除最后一个元素,并返回该元素

## push()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.push("Kiwi")); //5
```

从数组最后添加一个元素,并返回该数组的长度

## shift()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.shift()); //Banana
```

从数组中删除第一个元素,并返回该元素

## unshift()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.unshift("Lemon")); //5
```

从数组开头添加元素,并返回该数组的长度

## splice()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
//在包含下标为2的位置往后删除1个项，并插入"Lemon", "Kiwi"
console.log(fruits.splice(2, 1, "Lemon", "Kiwi")); //Apple
```

可用于向数组添加新项,并返回一个包含已删除项的数组

第一个参数（2）定义了应添加新元素的位置（拼接）。

第二个参数（0）定义应删除多少元素。

其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

## concat()

```js
let arr1 = ["Cecilie", "Lone"];
let arr2 = ["Emil", "Tobias", "Linus"];
let arr3 = ["Robin", "Morgan"];
let myChildren = arr1.concat(arr2, arr3); //将arr1、arr2 与 arr3 连接在一起
```

concat() 方法不会更改现有数组。它总是返回一个新数组。

concat() 方法可以使用任意数量的数组参数

concat() 方法也可以将值作为参数：

## slice()

```js
let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let citrus = fruits.slice(1); // ["Orange", "Lemon", "Apple", "Mango"]
```

slice() 方法用数组的某个片段切出新数组

slice() 可接受两个参数，比如 (1, 3),不包括 3

如果结束参数被省略，比如第一个例子，则 slice() 会切出数组的剩余部分

```js
let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let citrus = fruits.slice(1, 3); //["Orange", "Lemon"]
```
