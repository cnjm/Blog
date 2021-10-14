# 数组遍历

```js
const arr = [1, 2, 3];
```

## for 循环

break 将退出循环，1 后面不在打印

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    break;
  }
  console.log(arr[i]);
}
// 1
```

而 continue 只会结束当次循环，直接进入下一轮，也就是说不会打印 2，但后续仍会执行

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    continue;
  }
  console.log(arr[i]);
}
// 1 3
```

return 语句会直接退出循环所在的函数体，之后的函数体内语句也不会执行

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    return;
  }
  console.log(arr[i]);
}
console.log("循环结束");
// 1  循环结束将不会被执行打印
```

多层 for 循环 break

```js
start: for (let i = 0; i < arr.length; i++) {
  end: for (let j = 0; j < arr.length; j++) {
    if (i === 1) {
      break start; //直接结束外层循环，内层不会结束,break end时也不会退出外层循环
    }
    console.log(i, j);
  }
}
// 0 0
// 0 1
// 0 2
```

## for of

创建一个循环来迭代可迭代的对象

可遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构

break continue return 与 for 是相同效果

```js
for (let value of arr) {
  console.log(value);
}
```

## foreach

```js
arr.forEach((item, index, array) => {
  // 无返回值   不可break continue
  // return 只会终止当前循环的代码执行，并不影响比遍历
});
```

## filter()

不会改变原始数组,返回新数组,常用于筛选函数

```js
let newArr = arr.filter((item) => item > 1);
// let newArr = arr.filter((obj) => obj.status === 1);
// let newArr = arr.filter((str) => str && str.trim());
console.log(newArr);
//[ 2, 3 ]
```

## every()

每项元素执行一遍，全部 true 则返回 true，否则返回 false

```js
let cb = arr.every((item) => item > 1);
// false
```

## some()

同 every 但有一个是 true 即返回 true，并停止遍历

```js
let cb = arr.some((item) => {
  console.log(item);
  if (item == 1) {
    return true;
  } else {
    return false;
  }
});
console.log(cb); //1 true
```

## reduce()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.shift()); //Banana
```

从数组中删除第一个元素,并返回该元素

## reduceRight()

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.unshift("Lemon")); //5
```

从数组开头添加元素,并返回该数组的长度

## find()

遇到执行函数返回第一个 true，则返回该项

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
//在包含下标为2的位置往后删除1个项，并插入"Lemon", "Kiwi"
console.log(fruits.splice(2, 1, "Lemon", "Kiwi")); //Apple
```

## findIndex()

```js
let arr1 = ["Cecilie", "Lone"];
let arr2 = ["Emil", "Tobias", "Linus"];
let arr3 = ["Robin", "Morgan"];
let myChildren = arr1.concat(arr2, arr3); //将arr1、arr2 与 arr3 连接在一起
```
