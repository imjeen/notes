---
layout: post
category : javascript
title: 类数组对象(Array-like Object)
tagline: "原创"
---

## overview

**字符串**，**arguments**和**DOM元素集**都可以看做类似数组的对象，即 "类数组"，有数字键和length属性。但不具有数组的所有特性。如无法使用push和pop等方法，以及length也不是动态变化的。

## 自定义类数组

对象a具有数字键和length属性，如：

	var a = {
	    0:'a',
	    1:'b',
	    2:'c',
	    length:3
	};

以下是对类数组对象的length的定义：

> So what exactly makes an object “array-like”? The basic contract of
> an array object amounts to two simple rules.
>
> - It has an integer length property in the range 0...2^32 – 1.
> - The length property is greater than the largest index of the object.
>
> An index is an integer in the range 0...2^32 – 2 whose string representation
> is the key of a property of the object.

关键一点是： lenght属性一定要大于对象的最大数字键的值。否则在以下转化为数组后表现就不正常了。

	b = {1: "a", 2: "b", 4: "c", length: 3}

	[].reduce.call(b, function(x, y){ return x+y;}); // 'ab'

以及：

	b = {1: "a", 2: "b", 4: "c", length: 5}

	[].reduce.call(b, function(x, y){ return x+y;}); // 'abc'

## 类数组对象转换为数组

将类数组进行转换成数组，一般常见的例子是对类数组arguments的转换：

	Array.prototype.slice.call(arguments);

当然可以通过forEach方法遍历arguments:

	// for循环
	function logArgs() {
	    for (var i=0; i<arguments.length; i++) {
	        console.log(i+'. '+arguments[i]);
	    }
	}

	// forEach方法
	function logArgs() {
	    Array.prototype.forEach.call(arguments, function (elem, i) {
	        console.log(i+'. '+elem);
	    });
	}

从上面可以知道， 实现 Array.prototype 的某些函数方法(slice()等)来调用 `Function.prototype.call()` 实现类数组的转换。

其中`Array.prototype.concat()` 方法是无法将非数组连接起来的（再次强调array-like不是数组）；字符串被创建后length以及字符是不可变的。

## reference

- [类似数组的对象](http://javascript.ruanyifeng.com/grammar/object.html#toc7)
- [JavaScript 里的类数组对象](http://segmentfault.com/a/1190000002648510)
- [JavaScript 的怪癖 8：“类数组对象”](http://www.html-js.com/article/1619)
- [Array - Array generic methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)