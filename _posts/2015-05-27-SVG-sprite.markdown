---
layout: post
title:  "SVG Sprite"
date:   2015.05.27
---

## Introduction

SVG, 即可缩放矢量图形（Scalable Vector Graphics）。SVG 使用 XML（Extensible Markup Language,简称XML） 格式定义图像。

只涉及用SVG来替换iconfont的知识，SVG是如何被放入HTML文件中（四种方式）。
SVG 文件可通过以下标签嵌入 HTML 文档：< embed>、< object> 或者 < iframe>。
SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。

在[icomoon](icomoon.io)可以找到并导出iconfont字体和SVG等文件，由于字体文件的诸多缺陷，SVG成了不二之选：


## SVG优势

随着高清屏幕的普及，相比使用png等位图而言，使用SVG等矢量图形是一种全新的设计方式。更重要的是相比位图而言，SVG有着无可比拟的优势。这里我总结一下SVG具体的一些优势：

1. SVG是矢量图形文件，可以随意改变大小，而不影响图标质量。
2. 可以用CSS样式来自由定义图标颜色，比如颜色/尺寸等效果。
3. 所有的SVG可以全部在一个文件中，节省HTTP请求 。
4. 使用SMIL、CSS或者是javascript可以制作充满灵性的交互动画效果。
5. 由于SVG也是一种XML节点的文件，所以可以使用gzip的方式把文件压缩到很小。

那么问题来了，我们如何将SVG文件优雅地放入HTML中，首先让我们先看看有哪些方式。


在web开发中，SVG主要有下面几种使用方法：

1. 使用img和object标签直接引用svg。这种方法的缺点主要在于要求每个图标都单独保存成一个SVG文件，使用时也是单独请求的，增加了HTTP请求。
2. Inline SVG，直接把SVG写入 HTML 中，这种方法简单直接，而且具有非常好的可调性。Inline SVG 作为HTML文档的一部分，不需要单独请求。临时需要修改某个图标的形状也比较方便。但是Inline SVG使用上比较繁琐，需要在页面中插入一大块SVG代码不适合手写，图标复用起来也比较麻烦。 
3. SVG Sprite。这里所说的Sprite技术，没错，类似于CSS中的Sprite技术。图标图形整合在一起，实际呈现的时候准确显示特定图标。其实基础的SVG Sprite也只是将原来的位图改成了SVG而已。
4. <strong>使用svg中的< symbol >元素来制作icon。</strong>

其中使用SVG来制作动画更是令人神往，由于SVG是一种类似DOM节点组成的文本文档，所以我们可以很精细的控制SVG图形的每一个部分，并且可以使用CSS3或者是javascript来制作动画效果。

## SVG < symbol>

> The symbol element is used to define graphical template objects which can be instantiated by a <use> element.

简而言之，就是用来定义SVG文件，每个symbol（带属性id）就是一个分块，通过 < use> 来引用相应的模块。

SVG 如下定义：

{% highlight SVG %}
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  
  <symbol id="beaker" viewBox="214.7 0 182.6 792">
    <!-- <path>s and whatever other shapes in here -->  
  </symbol>
  
  <symbol id="shape-icon-2" viewBox="0 26 100 48">
    <!-- <path>s and whatever other shapes in here -->  
  </symbol>
  
</svg>
{% endhighlight %}

HTML 对应地引用：

{% highlight HTML %}
<svg class="icon">
  <use xlink:href="#shape-icon-1" />
</svg>

<svg class="icon">
  <use xlink:href="#shape-icon-2" />
</svg>
{% endhighlight %}

由于浏览器安全策略限制的原因，我们不能在本地直接打开html文件来预览我们引用的svg文件，需要以服务器的形式来打开.

### IE浏览器（包括IE11）不兼容外联SVG文件

目前IE浏览器（包括IE11）不支持优雅的外联SVG文件，所以IE下只能将SVG相关的定义放在body标签里。除了后台程序引入外，还可以通过js插入svg节点。

{% highlight javascript %}
var ajax = new XMLHttpRequest();
ajax.open("GET", "../SVG/mytest.svg", true);
ajax.onload = function(e) {
    document.body.insertAdjacentHTML("afterBegin", ajax.responseText);
}
ajax.send();
{% endhighlight %}

最后，从一开始我们就说过，SVG 是使用XML格式定义图像的，所以可以修改、合并压缩SVG文件。

illustrator，在线站点，或icomoon导出等方式修改SVG；通过Grunt或gulp等工具的插件（如 [grunt-svgstore](https://github.com/FWeinb/grunt-svgstore/)实现，这里略。

## Resource

1. [SVG 简介](http://www.w3cschool.cc/svg/svg-intro.html)
2. [使用SVG中的Symbol元素制作Icon](http://isux.tencent.com/16292.html)
3. [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)
4. [SVG `symbol` a Good Choice for Icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
5. [未来必热：SVG Sprite技术介绍](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)