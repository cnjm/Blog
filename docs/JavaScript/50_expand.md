## 原型

### 原型在哪

首先认识一点，在 `JavaScript` 中万物皆对象，但并非所有对象都有 `prototype` 属性。

实际上只有**函数(自然包含构造函数)对象会有 `prototype` 属性，同时 `prototype` 也是一个对象**。

```js
function Aa() {}
console.log(Aa.prototype);
```

### 原型有什么

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

在 Firefox、Safari 和 Chrome 会在每个对象上暴露**proto**属性，并且可以通过这个属性访问对象的原型

```js
function Aa() {}
Aa.prototype.test = "哈哈";
let a1 = new Aa();
console.log(a1); //{[[Prototype]]: Object}
console.log(a1.__proto__ === Aa.prototype); //true
conosle.log(a1.__proto__.constructor === Aa); // true
```

要理解原型，最关键要的点在于理解**实例和原型有直接关系，但实例和构造函数没有直接关系**

通过下图可以简单看到，构造函数，原型，实例之间的关系

JavaScript 高级程序设计 第四版 图 8-1

构造函数的`prototype` 以及 `a1，a2` 两个实例的`[[Prototype]]`指向原型 Prototype 对象，而原型对象中的 constructor 又指向构造函数本身

可以看到，实例是直接指向原型对象的，因此也说明了上述观点，实例和构造函数没有直接关系。

### Object.getPrototypeOf()

`Object.getPrototypeOf()` 可以返回实例中`[[Prototype]]`的值也就是原型对象

```js
function Aa() {}
let a1 = new Aa();
console.log(Object.getPrototypeOf(a1) == Aa.prototype); // true
```

使用 Object.getPrototypeOf()可以方便地取得一个对象的原型，对于通过原型实现继承来说是非常关键的
