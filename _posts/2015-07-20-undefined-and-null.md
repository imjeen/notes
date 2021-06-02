---
layout: post
category : javascript
title: undefined 和 null
tagline: "原创"
---

## 前言

javascript 数据类型包括： 原始类型（数值、字符串和布尔值）与 合成类型 （对象、函数和数组），以及两个特殊值 `undefined` 和 `null`

## 相似点

undefined 和 null 都是表示“无”，在if语句或布尔值转换时含义类似。

	if(undefined){ /* ... */ }
	if(null){ /* ... */ }

## 历史原因

1995年JavaScript诞生时，最初像Java一样，只设置了null作为表示"无"的值。根据C语言的传统，null被设计成可以自动转为0。
但是，JavaScript的设计者Brendan Eich，觉得这样做还不够，有两个原因。

- 首先，null像在Java里一样，被当成一个对象。但是，JavaScript的数据类型分成原始类型和合成类型两大类，Brendan Eich觉得表示"无"的值最好不是对象。
- 其次，JavaScript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误。

因此，Brendan Eich又设计了一个undefined。他是这样区分的：null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。

但是，这样的区分在实践中很快就被证明不可行。目前，null和undefined基本是同义的，只有一些细微的差别。

## 用法和含义

	typeof undefinded // "undefined"

	typeof null // "object"

	Number(undefined) // NaN
	Number(null) // 0

### undefined

下面的情况会返回 undefined 值：

- 变量被声明了，但没有赋值时，就等于undefined。

- 调用函数时，应该提供的参数没有提供，该参数等于undefined。

- 对象没有赋值的属性，该属性的值为undefined。

- 函数没有返回值时，默认返回undefined。

### null

在 JavaScript 内部有一些使用场景（比如声明原型链的终结点 Object.prototype = null），但是大多数情况下都可以使用 undefined 来代替。

## 补充

由于全局变量 undefined 只是保存了 undefined 类型实际值的副本， 因此对它赋新值不会改变类型 undefined 的值。

然而，为了方便其它变量和 undefined 做比较，我们需要事先获取类型undefined 的值。

为了避免可能对 undefined 值的改变，一个常用的技巧是使用一个传递到匿名包装器的额外参数。 在调用时，这个参数不会获取任何值。

	var undefined = 123;
	(function(something, foo, undefined) {
	    // 局部作用域里的 undefined 变量重新获得了 `undefined` 值

	})('Hello World', 42);

另外一种达到相同目的方法是在函数内使用变量声明。

	var undefined = 123;
	(function(something, foo) {
	    var undefined;
	    ...

	})('Hello World', 42);

这里唯一的区别是，在压缩后并且函数内没有其它需要使用 var 声明变量的情况下，这个版本的代码会多出 4 个字节的代码。

##  参考

- [数据类型](http://javascript.ruanyifeng.com/grammar/basic.html#toc9)
- javascript 秘密花园 [undefined 和 null](http://bonsaiden.github.io/JavaScript-Garden/zh/#core.undefined)

