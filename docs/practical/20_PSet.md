# url

```js
let { PSet } = $practical.storage;

//展示示例
let arr1 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let arr2 = new Set([1, 2, 3, 7, 8, 9, 10]);
let arr3 = new Set([4, 5, 6]);
const pset = new PSet();
```

## PSet()

一个继承 Set 的类，拓展了一些方法，源于红宝书第四版关于 Set 的介绍部分，写的很好，我看的它里面传参啥的有点问题，改了一下

所有方法默认接受 Set 数据类型，如果希望数组，可以再封装下

```js
const munion = (a, b) => {
  const result = pset.union(new Set(a), new Set(b));
  return [...result];
};
```

### union

union 返回两个或更多集合的并集

```js
// 如果需要数组返回，可以使用扩展原酸或Arrar.from()
console.log([...pset.union(arr2, arr3)]); // [1, 2, 3, 7, 8, 9, 10, 4, 5, 6]
```

### intersection

intersection 返回两个或更多集合的交集

```js
console.log(pset.intersection(arr1, arr2)); // Set(6) {1, 2, 3, 7, 8, 9}
```

### difference

difference 返回两个集合的差集 a - b;

```js
console.log(pset.difference(arr1, arr2));
```

### symmetricDifference

symmetricDifference 返回两个集合的对称差集

```js
console.log(pset.symmetricDifference(arr1, arr2)); // Set(4) {4, 5, 6, 10}
```

### cartesianProduct

cartesianProduct 返回两个集合（数组对形式）的笛卡儿积

必须返回数组集合，因为笛卡儿积可能包含相同值的对

```js
console.log(pset.cartesianProduct(arr2, arr3)); // Set(21) {Array(2), Array(2), Array(2), Array(2), Array(2), …}
```

### powerSet

powerSet 返回一个集合的幂集

```js
console.log(pset.powerSet(arr3));
// 0: Set(0)
// value: Set(0) {}
// 1: Set(1)
// value: Set(1) {4}
// 2: Set(1)
// value: Set(1) {5}
// 3: Set(2)
// value: Set(2) {4, 5}
// 4: Set(1)
// value: Set(1) {6}
// 5: Set(2)
// value: Set(2) {4, 6}
// 6: Set(2)
// value: Set(2) {5, 6}
// 7: Set(3)
// value: Set(3) {4, 5, 6}
```
