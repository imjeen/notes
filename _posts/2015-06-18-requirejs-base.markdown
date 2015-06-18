---
layout: post
title:  "认识 requirejs"
date:   2015.06.18
---

## 前要

- 对项目模块合理地划分
- 明确模块的依赖关系

理解 [AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD) 规范定义

## 概述

RequireJS是一个工具库，主要用于客户端的模块管理。它可以让客户端的代码分成一个个模块，实现异步或动态加载，从而提高代码的性能和可维护性。它的模块管理遵守AMD规范（Asynchronous Module Definition）。

RequireJS的基本思想是，通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载。

### define方法：定义模块

1.独立模块

{% highlight javascript %}
define({
    method1: function() {},
    method2: function() {},
});
{% endhighlight %}

另一种等价的写法是，把对象写成一个函数，该函数的返回值就是输出的模块。自由度更高一点，可以在函数体内写一些模块初始化代码。

{% highlight javascript %}
define(function () {
    return {
        method1: function() {},
        method2: function() {},
    };
});
{% endhighlight %}

2.非独立模块

如果被定义的模块需要依赖其他模块，则define方法必须采用下面的格式。必须返回一个对象，供其他模块调用

{% highlight javascript %}
define(['module1', 'module2'], function(m1, m2) {
  
  // ...

   return {
        method: function() {
            m1.methodA();
            m2.methodB();
        }
    };
});
{% endhighlight %}

如果依赖的模块很多，RequireJS提供一种更简单的写法。

{% highlight javascript %}
define(
    function (require) {
        var dep1 = require('dep1'),
            dep2 = require('dep2'),
            // ....
            depN = require('depN');

            ...
    }

});
{% endhighlight %}

一个实际的例子是，通过判断浏览器是否为IE，而选择加载zepto或jQuery。

{% highlight javascript %}
define(('__proto__' in {} ? ['zepto'] : ['jquery']), function($) {
    return $;
});
{% endhighlight %}


### require方法：调用模块

require方法用于调用模块。它的参数与define方法类似。

{% highlight javascript %}
require(['foo', 'bar'], function ( foo, bar ) {
        foo.doSomething();
});
{% endhighlight %}

require 可以在define中使用，见上面非独立模块的定义。

如果服务器端采用JSONP模式，则可以直接在require中调用，方法是指定JSONP的callback参数为define。

{% highlight javascript %}
require( [ 
    "http://someapi.com/foo?callback=define"
], function (data) {
    console.log(data);
});
{% endhighlight %}

require方法允许添加第三个参数，即错误处理的回调函数。

equire对象还允许指定一个全局性的Error事件的监听函数。所有没有被上面的方法捕获的错误，都会被触发这个监听函数。

{% highlight javascript %}
requirejs.onError = function (err) {
    // ...
};
{% endhighlight %}


## 配置require.js：config方法

[CONFIGURATION OPTIONS](http://requirejs.org/docs/api.html#config)

## 插件

[LOADER PLUGINS](http://requirejs.org/docs/api.html#plugins)

## 优化器r.js

[REQUIREJS OPTIMIZER](http://requirejs.org/docs/optimization.html)

## Resource
1. 官网 [requirejs](http://requirejs.org/)
1. [RequireJS和AMD规范](http://javascript.ruanyifeng.com/tool/requirejs.html)
