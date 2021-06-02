---
layout: post
category : javascript
title: 类型判断(typeof、instanceof、toString)
tagline: "原创"
---


## overview

原始类型包括三种数据类型。

> - 数值（number）
> - 字符串（string）
> - 布尔值（boolean）

合成类型也包括三种数据类型。

> - 对象（object）
> - 数组（array）
> - 函数（function）

还有两个特殊值`null`和`undefined`

javascript中有三种方式可以确定数据类型： 
 
 - typeof 运算符 
 - instanceof 运算符
 - Object.prototype.toString()

## typeof 运算符 

原子类型字符串、数值、布尔值的typeof运算返回相应的类型值；而合成类型中只有函数的typeof运算返回‘function’，其他都返回‘object’。

两个特殊值里， typeof undefined 为 ‘undefined’，而typeof null 为 ‘object’。

## instanceof 运算符

`instanceof` 是用来判断一个对象是否为某个构造函数的实例。值得注意的是原子类型的值不是对象，所以不能用instanceof。

数组、函数和正则表达式等对象，也是`Object`对象的实例。

另外，不同window或iframe之间对象类型检测不能用instanceof。

利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。

	function Foo(options){
		if(this instanceof Foo){
			this.options = options;
		}else{
			return new Foo(options);
		}
	}

## Object.prototype.toString()

实例对象的toString方法返回一个字符串“[object Object]”，其中第二个Object表示该值的准确类型。这是一个十分有用的判断数据类型的方法。

注意：如果在 `function` 上调用`toString` 则会返回当前源代码的字符串。

结合使用function的call方法并返回相应的结果：

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 对象：返回"[object " + 构造函数的名称 + "]" 。

如下例子：

	Object.prototype.toString.call(2) // "[object Number]"
	Object.prototype.toString.call('') // "[object String]"
	Object.prototype.toString.call(true) // "[object Boolean]"
	Object.prototype.toString.call(undefined) // "[object Undefined]"
	Object.prototype.toString.call(null) // "[object Null]"
	Object.prototype.toString.call(Math) // "[object Math]"
	Object.prototype.toString.call({}) // "[object Object]"
	Object.prototype.toString.call([]) // "[object Array]"

(值得注意的是 **`null`：返回[object Null]** 和 **`undefined`：返回[object Undefined]**)

可以利用上面的特性，写出一个比typeof运算符更准确的类型判断函数。

	var type = function (o){
	    var s = Object.prototype.toString.call(o);
	        return s.match(/\[object (.*?)\]/)[1].toLowerCase();
	};

	type({}); // "object"
	type([]); // "array"
	type(5); // "number"
	type(null); // "null"
	type(); // "undefined"
	type(/abcd/); // "regex"
	type(new Date()); // "date"

	['Null',
	'Undefined',
	'Object',
	'Array',
	'String',
	'Number',
	'Boolean',
	'Function',
	'RegExp',
	'Element',
	'NaN',
	'Infinite'].forEach(function (t) {
	    type['is' + t] = function (o) {
	        return type(o) === t.toLowerCase();
	    };});

	type.isObject({}); // true
	type.isNumber(NaN); // false
	type.isElement(document.createElement('div')); // true
	type.isRegExp(/abc/); // true


## reference

- MDN [Object.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
- [Object对象](http://javascript.ruanyifeng.com/stdlib/object.html#toc8)