---
layout: post
title:  "javascript 数值"
date:   2015.06.09
---

- 1与1.0是相等的 ( 1 === 1.0 //true )
- 1加上1.0得到的还是一个整数 ( 1+1.0 === 2 // true)

由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。


## 概述

根据国际标准IEEE 754，64位浮点数格式的64个二进制位中，第0位到第51位储存有效数字部分，第52到第62位储存指数部分，第63位是符号位，0表示正数，1表示负数。

因此，JavaScript提供的有效数字的精度为53个二进制位（IEEE 754规定有效数字第一位默认为1，再加上后面的52位），也就是说，绝对值小于等于2的53次方的整数都可以精确表示。

## 数值范围

另一方面，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）。也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数，则JavaScript能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。

## 特殊数值

### 正零和负零

严格来说，JavaScript提供零的三种写法：0、+0、-0。它们是等价的。但是，如果正零和负零分别当作分母，它们返回的值是不相等的。

### NaN

NaN (Not a Number) 表示“非数值”，是一种特殊数值，它的数据类型依然属于Number。


#### 运算规则

NaN不等于任何值，包括它本身。

由于数组的indexOf方法，内部使用的是严格相等运算符，所以该方法对NaN不成立。	

[NaN].indexOf(NaN) // -1

NaN与任何数（包括它自己）的运算，得到的都是NaN。

#### 判断NaN的方法

isNaN只对数值有效，如果传入其他值，会被先转成数值。

{% highlight javascript %}
// 使用isNaN之前，最好判断一下数据类型。
function myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
}

// 利用NaN是JavaScript之中唯一不等于自身的值这个特点，进行判断
function myIsNaN(value) {
    return value !== value;
}
{% endhighlight %}

## Infinity

Infinity表示“无穷”。除了0除以0得到NaN，其他任意数除以0，得到Infinity。

1 / -0 // -Infinity

1 / +0 // Infinity

上面代码表示，非0值除以0，JavaScript不报错，而是返回Infinity。

由于数值正向溢出（overflow）、负向溢出（underflow）和被0除，JavaScript都不报错，所以单纯的数学运算几乎没有可能抛出错误。

### 运算规则

Infinity减去或除以Infinity，得到NaN

infinity可以用于布尔运算。可以记住，Infinity是JavaScript中最大的值（NaN除外），-Infinity是最小的值（NaN除外）。	

5 > -Infinity // true

5 > Infinity // false

### isFinite函数

isFinite函数返回一个布尔值，检查某个值是否为正常值，而不是Infinity。

## 与数值相关的全局方法

### parseInt方法

parseInt方法可以将字符串或小数转化为整数(默认十进制)。如果字符串头部有空格，空格会被自动去除。

第一个参数是数值，则会将这个数值先转为10进制，然后再应用第二个参数。

parseInt的很多复杂行为，都是由八进制的前缀0引发的。因此，ECMAScript 5不再允许parseInt将带有前缀0的数字，视为八进制数。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。

### parseFloat方法

将一个字符串转为浮点数

如果字符串包含不能转化为浮点数的字符，则不再进行转化，返回已经转好的部分

parseFloat("") // NaN

这使得parseFloat的转换结果不同于Number函数。

{% highlight javascript %}
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
{% endhighlight %}

## 参考

1. [数值](http://javascript.ruanyifeng.com/grammar/number.html)