# url

```js
let { paramToObj } = $practical.storage;
```

## paramToObj()

这个方法接受一个标准的 url 链接字符串

返回?后的参数的 json 对象

```js
console.log(
  url.paramToObj(
    "http://cdn.jsdelivr.net/npm/cnjm-practical@1.0.2/dist/index.html?a=1&b=2"
  )
); //{a: "1", b: "2"}
```
