## 原型

### 原型在哪

首先认识一点，在 `JavaScript` 中万物皆对象，但并非所有对象都有 `prototype` 属性。

实际上只有**函数(包括构造函数)对象会有 `prototype` 属性，同时 `prototype` 也是一个对象**。

```js
function Aa() {}
console.log(Aa.prototype);
```

### 原型是什么

原型对象包含应该由**特定引用类型的实例**共享的属性和方法

### 为什么使用原型

在原型上定义的属性和方法可以被对象实例共享

```js
function Aa() {}
Aa.prototype.test = "哈哈";

let a1 = new Aa();
let a2 = new Aa();

console.log(a1.test); //哈哈
console.log(a2.test); //哈哈
```

_此处直接赋值到原型不同于在构造函数中直接赋值给对象实例。_

### 如何理解原型

在上述例子中，添加的属性或者其他的方法都是直接添加到 `Aa` 的 `prototype` 属性上的，而构造函数内是什么都没有的。

而所有实例共享 `prototype` 属性，因而这也使得所有实例可以共享同样的属性和方法。

默认情况下，所有原型对象自动获得一个名为 `constructor` 的属性，指回与之关联的构造函数。

也就是说 `Aa.prototype.constructor`指向`Aa`

```js
console.log(Aa.prototype.constructor === Aa); //true
```

执行下面代码，可以看到，实例中只有 `[[Prototype]]` 属性，实质上 `[[Prototype]]` 指针会被赋值为构造函数的原型对象

在 Firefox、Safari 和 Chrome 会在每个对象上暴露**proto**属性，

通过这个属性可以访问对象的原型

```js
function Aa() {}
Aa.prototype.test = "哈哈";
let a1 = new Aa();
console.log(a1); //{[[Prototype]]: Object}
```

要理解原型，最关键要的点在于理解**实例和原型有直接关系，但实例和构造函数没有直接关系**
