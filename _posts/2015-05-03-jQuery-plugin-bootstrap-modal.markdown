---
layout: post
title:  "bootstrap modal模块的源码解读"
date:   2015.05.13
---

最近开发的后台管理系统，使用Bootstrap框架来快速开发和迭代，用起来可谓一气呵成。不过这只是在使用的层面上来讲的，再往其深层的源码分析来看，有太多值得学习的东西。今天就以modal模块来讲吧。

Bootstrap的js模块是强依赖于jQuery的，在这里我们可以看到jQuery的插件开发的标准写法，可以这么说，Bootstrap讲它发挥得淋漓尽致。我想以后在项目的开发中也可以这样开发jQuery插件。


- jQuery版本检测

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

- 检测jQuery是否引入或定义

{% highlight javascript %}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);
{% endhighlight %}

- 作用域：

+(function(){ /* code... */ })(jQuery);

可以看到Bootrap的每个作用域前都要 "+" 符合，这个是避免多个插件拼接时报错。js解析器本身就具有自动加分号的功能。
区别函数声明和函数表达式，要注意的是声明总是被提前的，作用域由立即执行函数组成，也就是一条函数表达式，并传入参数。

> 在function前面加！、+、 -甚至是逗号等到都可以起到函数定义后立即执行的效果，而（）、！、+、-、=等运算符，都将函数声明转换成函数表达式，消除了javascript引擎识别函数表达式和函数声明的歧义，告诉javascript引擎这是一个函数表达式，不是函数声明，可以在后面加括号，并立即执行函数的代码。


- 构造函数和原型链

外部可以访问到原型链上的所有方法，有别于使用对象字面量来存储私有变量和函数。

- jQuery 插件写法

{% highlight javascript %}
// 向jQuery原型中添加你的插件代码，用“pluginName”作为插件的函数名称。
$.fn.pluginName = function(options) {
    var opts = $.extend({}, defaults, options || {});

    // 遍历匹配的元素||元素集合，并返回this，以便进行链式调用。
    return this.each(function() {
        // 此处可通过this来获得每个单独的元素(jQuery对象)
        var $this = $(this);
       // ...
    });
};
{% endhighlight %}

- 巧妙使用HTML自定义 data-*

将对象数据缓存在data-*属性上，方便读取数据。同时不会在js文件注入太多代码。

- 事件命名空间

事件的命名空间，其实jQuery的[event.namespace](http://api.jquery.com/event.namespace/)只支持一级命名空间。这里只不过是Bootstrap的命名规范使层次和模块更清晰，能够巧妙地被trigger等触发。

- 事件委托

关于jQuery将事件绑定在document文档对象上的好处，就是js事件代理的优点，性能上做了一个[测试比较](http://jsperf.com/juewerewio)。

- 防止冲突

jQuery ($) 是全局变量，插件定义的 $.fn.modal 是不受作用域限制的，如果在别的地方也用来同样名字的插件，后面的就会覆盖前面的。所以这里的定义了 
$.fn.modal.noConflict 方法。

- Bootstrap作用域外如何使用模块

查找jQuery源码中也没有对于大写开头的Constructor的定义。所以这里的Constructor只是一个普通属性.
$.fn.modal.Constructor = Modal  通过将作用域内的Modal类赋值给jQuery的Modal对象的Constructor属性，在IIFE作用域外也可以使用Modal类。调用方式：var Modal = $.fn.Modal.Constructor  

- 单元测试

// TODO 有待研究
QUnit + PhantomJS 

---

优秀的代码

{% highlight javascript %}
+function ($) {
  'use strict';

   var Modal = function (element, options) {};

   Modal.prototype.toggle = function (_relatedTarget) {};

   Modal.prototype.show = function (_relatedTarget) {};

   // ...


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })
 }(jQuery);
{% endhighlight %}

[Bootstrap.modal.js](https://github.com/twbs/bootstrap/blob/master/js/modal.js)
