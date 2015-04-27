---
layout: post
title: jQuery API - jQuery()
date: 2015.01.20
category: update
---

## 概要

返回匹配的元素集合，无论是通过在DOM的基础上传递的参数还是创建一个HTML字符串。

## jQuery构造函数

jQuery对象本质上是一个构造函数，主要作用是返回jQuery对象的实例。

（1）CSS选择器作为参数

（2）DOM对象作为参数

（3）HTML代码作为参数

如果直接在jQuery构造函数中输入HTML代码，返回的也是jQuery实例。
与从CSS选择器生成的jQuery实例完全一样。唯一的区别就是，它对应的DOM结构不属于当前文档。

    $('<li class="greet">test</li>')
    //或者
    $( '<li>', {
      html: 'test',
      'class': 'greet'
    });

通常来说，上面第二种写法是更好的写法。

    $('<input class="form-control" type="hidden" name="foo" value="bar" />')

// 相当于

    $('<input/>', {
        class: 'form-control',
        type: 'hidden',
        name: 'foo',
        value: 'bar'
    })

// 或者

    $('<input/>')
    .addClass('form-control')
    .attr('type', 'hidden')
    .attr('name', 'foo')
    .val('bar')

（4）第二个参数

默认情况下，jQuery将文档的根元素（html）作为寻找匹配对象的起点。如果要指定某个网页元素（比如某个div元素）作为寻找的起点，可以将它放在jQuery函数的第二个参数。


## jQuery构造函数返回的结果集

jQuery的核心思想是“先选中某些网页元素，然后对其进行某种处理”（find something, do something），也就是说，先选择后处理，这是jQuery的基本操作模式。所以，绝大多数jQuery操作都是从选择器开始的，返回一个选中的结果集。

（1）length属性

jQuery对象返回的结果集是一个类似数组的对象，包含了所有被选中的网页元素。查看该对象的length属性，可以知道到底选中了多少个结果。

（2）下标运算符

jQuery选择器返回的是一个类似数组的对象。但是，使用下标运算符取出的单个对象，并不是jQuery对象的实例，而是一个DOM对象。

    $('li')[0] instanceof jQuery // false
    $('li')[0] instanceof Element // true

（4）get方法

jQuery实例的get方法是下标运算符的另一种写法。

    $('li').get(0) instanceof Element // true

（6）each方法，map方法

两个方法用于遍历结果集，对每一个成员进行某种操作。
本身有两个参数，第一个是当前元素在集合中的位置，第二个是当前元素对应的DOM对象。

- each方法没有返回值
- map方法返回一个新的jQuery对象。


## $(document).ready()

$(document).ready方法接受一个函数作为参数，将该参数作为document对象的DOMContentLoaded事件的回调函数。也就是说，当页面解析完成（即下载完</html>标签）以后，在所有外部资源（图片、脚本等）完成加载之前，该函数就会立刻运行。

    // 简写为
    $(function() {
      console.log( 'ready!' );
    });


## $.noConflict方法

jQuery使用美元符号（$）指代jQuery对象。某些情况下，其他函数库也会用到美元符号，为了避免冲突，$.noConflict方法允许将美元符号与jQuery脱钩。

    <script src="other_lib.js"></script>
    <script src="jquery.js"></script>
    <script>$.noConflict();</script>

上面代码就是$.noConflict方法的一般用法。在加载jQuery之后，立即调用该方法，会使得美元符号还给前面一个函数库。这意味着，其后再调用jQuery，只能写成jQuery.methond的形式，而不能用$.method了。

## 参考
1. [jQuery()](http://www.css88.com/jqapi-1.9/jQuery/)、[jQuery API](http://api.jquery.com/jquery/)
2. [jQuery](http://javascript.ruanyifeng.com/jquery/basic.html)