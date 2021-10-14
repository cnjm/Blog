## 常用运算

一些 js 常用到的计算方法

### 数组合并

```js
let newArr = arr1.concat(arr2, arr3);
// or
let newArr = [...arr1, ...arr2];
```

### 数组去重

```js
let newArr = [...new Set(arr)]; // 元素引用类型元素，则同样是浅拷贝
// or
let newArr = Array.from(new Set(arr));
// Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
```

### 筛选元素

```js
let newArr = arr.filter((item) => item >= 5);
```

### 清除另一个数组元素有相同的元素

即 arr 排除掉 remove_arr 中的元素

```js
let newArr = arr.filter((x) => !remove_arr.some((item) => x === item));
```

::: tip
[practical PSet](https://gitee.com/c_jiaming/practical) 采用 Set 的常用的取集封装
:::

### 取交集

```js
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
let arr2_set = new Set(arr2);

// use Set
let newArr = arr1.filter((item) => arr2_set.has(item));

// use includes
let newArr = arr1.filter((item) => arr2.includes(item));
```

### 取补集

```js
//各自补集，
let one = arr1.filter((val) => {
  return !(arr2.indexOf(val) > -1);
});
let two = arr2.filter((val) => !(arr1.indexOf(val) > -1));
let sum = [...one, ...two]; //各自都有的将不会存在
console.log(sum);
```

### 差集

arr1 中存在而 arr2 没有的

```js
let arr1 = [1, 2];
let arr2 = [3, 4];
let diff = arr1.filter((val) => arr2.indexOf(val) === -1);
console.log(diff);
```

### 标题

```js
```

### 标题

```js
```

### 标题

```js
```
