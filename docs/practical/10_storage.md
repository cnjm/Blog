# storage

```js
let { get, getAll, set, setAll, clear, que } = $practical.storage;
```

所有操作失败统一返回 false,set 成功返回 true，get 成功返回相应数据。

## set()

这个方法接受两个参数：key,value

key 必须为字符串,作为存储的 key。

value 支持 object、string、array 无需手动序列化

```js
set("str", "str_value");
set("arr", [{ obj_key: 123456 }, [1, 2, 3]]);
```

## setAll()

接受一个参数 object

将分别对该 object 的 key ，value 值进行存储，value 支持 object、string、array

```js
setAll({ key1: "string", key2: { c: 1321 }, key3: [1, 2] });
```

## get()

这个方法包含两个个参数：key

key 必须为字符串,作为查询存储的 key。

subscript 可以是 string 或者 number 当

如果存储的 value 是一个 json 对象，会返回该对象下 subscript 属性对应的值

如果存储的 value 是一个 json 数组，subscript 是一个字符串，会遍历数组寻找子元素中为 json 对象并且该对象属性 和 subscript 相等 的 对应的值

如果无法匹配会尝试使用 Number()将 subscript 转化为数字获取 value 的 subscript 下标的值并返回

```js
// key:account
// value:[{key1:123456},{key2:"654321"}]
get("account"); //[{key1:123456},{key2:"654321"}]
```

## getAll()

获取当前域的所有存储内容，并返回一个包含所有 key:value 的 object，value 支持 object、string、array 的序列化字符串

```js
getAll();
```

## clear()

清空所有，接受一个字符串 key 可以指定清除

```js
clear(key); //仅清除该key
clear();
```

## que()

当你需要维护一个比如账号列表此类有序的列表时，你可能需要他

que 接受一个 options 对象参数；

| 字段     |                        类型 |      必填       |           说明           |  默认值  |
| -------- | --------------------------: | :-------------: | :----------------------: | :------: |
| method   |         get \| set \| clear |       否        |         操作方法         |   get    |
| key      |                      string |       是        |      存储对象的 key      |    -     |
| subKey   |            string \| number | set \| clear 是 | get 时不传则获取整个数组 |    -     |
| value    |    string \| number \| json |     set 是      |  subkey 所需的 value 值  |    -     |
| position | original \| unshift \| push |       否        |         original         | original |

```js
// 假设原有一个这样的数组
set("account", [
  { key1: 123456, a: "aaa" },
  { key2: "654321" },
  { key3: "9999" },
]);

// 获取该数组中首个 key1 的josn对象
console.log(que({ method: "get", key: "account", subKey: "key1" }));
// {key1:123456,a:"aaa"}

// 设置该数组中首个 key1 的josn对象
console.log(
  que({
    method: "set",
    key: "account",
    subKey: "key2",
    value: { text: "value可以是一个json" },
    position: "unshift",
  })
);
// [{"key2":{"text":"value可以是一个json"}},{"key1":123456,"a":"aaa"},{"key3":"9999"}]

// 删除数组中 下标是0 的元素
console.log(que({ method: "clear", key: "account", subKey: 0 }));
// 删除数组中 首个 key1 的元素
console.log(que({ method: "clear", key: "account", subKey: "key1" }));
```
