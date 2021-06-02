---
layout: post
category : javascript
title: 数值(Number)，字符串(String)和布尔值(Boolean)
tagline: "原创"
---

## Overview

对三种基本类型（原子类型）数值(Number)，字符串(String)和布尔值(Boolean)进一步认识。

javascript 中涉及到小数数值计算总是那么地不可信。这里介绍和记录下基本的数值计算接口，以及相关的类型转换。具体可以到 MDN中查看。其中，内置对象 Math， 为数学常量和数学函数提供了属性和方法。

同时，讲述相关自动类型转换的实质。

## 数值计算相关

### 全局函数parseFloat(string) 和 parseInt(string, radix)

- `parseFloat()` 函数将参数中指定的字符串解析成为一个浮点数字并返回.
- `parseInt()` 函数将给定的字符串以指定基数（radix/base）解析成为整数。

### Number.prototype.toFixed()

`toFixed(digits)` 函数使用定点表示法来格式化一个数。**返回值为字符串**

### Math内置对象中常用方法

- `Math.round(x)`: 返回四舍五入后的整数.
- `Math.random()`: 返回0到1之间的伪随机数.
- `Math.floor(x)`: 返回小于x的最大整数。
- `Math.ceil(x)`: 返回x向上取整后的值.
- `Math.abs(x)`: 返回x的绝对值.
- `Math.max([x[,y[,…]]])`: 返回0个到多个数值中最大值.
- `Math.min([x[,y[,…]]])`: 返回0个到多个数值中最小值.
- `Math.pow(x,y)`: 返回x的y次幂.

## 数值和字符串的转换

### 换成数值

#### 原始类型值 => 数值

Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。

	Number(undefined) // NaN
	Number(null) // 0
	
	Number('42 cats') // NaN
	// 自动过滤一个字符串前导和后缀的空格
	Number('\t\v\r12.34\n ') // 12.34


#### 对象 => 数值

没被重写时，`Object.prototype.valueOf()` 返回 [object Object]

> 1. 先调用对象自身的`valueOf`方法，如果该方法返回原始类型的值（数值、字符串和布尔值），则直接对该值使用Number方法，不再进行后续步骤。
> 
> 2. 如果valueOf方法返回复合类型的值，再调用对象自身的`toString`方法，如果toString方法返回原始类型的值，则对该值使用Number方法，不再进行后续步骤。
> 
> 3. 如果toString方法返回的是复合类型的值，则报错。

### 换成字符串

#### 原始类型值 => 字符串

	String(undefined) // "undefined"
	String(true) // "true"

#### 对象 => 字符串

没被重写时，`Object.prototype.toString()` 返回 [object type]，其中type表示一个对象类型。

> 1. 先调用`toString`方法，如果toString方法返回的是原始类型的值，则对该值使用String方法，不再进行以下步骤。
> 
> 2. 如果toString方法返回的是复合类型的值，再调用`valueOf`方法，如果valueOf方法返回的是原始类型的值，则对该值使用String方法，不再进行以下步骤。
> 
> 3. 如果valueOf方法返回的是复合类型的值，则报错。

### 换成布尔值

#### 原始类型值 => 布尔值

	Boolean(NaN) // false
	Boolean(0) // false

#### 对象 => 布尔值

所有对象的布尔值都是true，甚至连false对应的布尔对象也是true。

	Boolean([]) // true
	Boolean({}) // true


## 自动转换

- 自动转换布尔值： if条件部分
- 自动转换为字符串： 主要发生在加法运算时
- 自动转换为数值：除了加法运算符有可能把运算子转为字符串，其他运算符都会把两侧的运算子自动转成数值。还包括一元算术运算符——正号和负号

加法运算符的类型转化：

- 运算子之中存在字符串： 都会被自动转为字符串，然后执行字符串连接运算
- 两个运算子都为数值或布尔值： 布尔值转为数值（true为1，false为0）
- 运算子之中存在对象：


	1 + [1,2]　// "11,2"


先调用[1,2].valueOf()，结果还是数组[1,2]本身，则继续调用[1,2].toString()，结果字符串“1,2”，所以最终结果为字符串“11,2”。


## Reference


- [数据类型转换](http://javascript.ruanyifeng.com/grammar/conversion.html)
