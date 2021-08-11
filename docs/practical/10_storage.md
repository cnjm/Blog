# storage

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

这个方法包含两个个参数：key,subscript(可选)

key 必须为字符串,作为查询存储的 key。

subscript 可以是 string 或者 number

如果存储的 value 是一个 json 对象，会返回该对象下 subscript 属性对应的值

如果存储的 value 是一个 json 数组，subscript 是一个字符串，会遍历数组寻找子元素中为 json 对象并且该对象属性 和 subscript 相等 的 对应的值

如果无法匹配会尝试使用 Number()将 subscript 转化为数字获取 value 的 subscript 下标的值并返回

```js
// key:account
// value:[{key1:123456},{key2:"654321"}]
get("account"); //[{key1:123456},{key2:"654321"}]
get("account", "key1"); //123456
get("account", "key2"); //"654321"
get("account", "key3"); //false
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
