---
layout: post
title: CSS3伪元素::section
date: 2014.11.12
categories: jekyll update
---

## 前言
伪元素 ::selection 用来定义反选的样式，（W3C规范） 如：

```
::-moz-selection{  
 color: white;  
 background: hotpink;  
}  
::selection{  
 color: white;  
 background: hotpink;  
} 

```

## 前景
除了 IE6-8，其他现代浏览均支持这段CSS。Firefox 是唯一一个需要 -moz 前缀的浏览器。
>::selection 被广泛地应用，但它却不属于W3C规范的一部分。
W3C规范的说法：
>This section intentionally left blank. (This section previously defined a ::selection pseudo-element.)   
>本节特意留空（本节曾经用来定义伪元素::selection）

## 使用 ::selection 时的一些 Tips
尽管 ::selection 的未来岌岌可危，但依然有很多人喜欢它。当然也有一些人认为它搞乱了浏览器应当独立控制的一些东西。不过，还是有一些 Tips 值得我们了解：

- ::selection 可以使用的属性有： color，background，background-color，text-shadow；
- 虽然 background 可以使用，但 background-image 却是不能使用的；
- 因为 ::selection 并不是标准的伪元素和无望进入规范的前景， Firefox 可能永远不会支持无 -moz 前缀的语法；
- ::selection 必须使用双冒号，因为 CSS3 规范中要求所有新增的伪元素都必须使用双冒号的语法结构，这是为了跟伪类区分开来（伪类使用单冒号，如：a:hover）

## 结论
如果喜欢 ::selection，就大胆的用吧。若有一天浏览器不再支持这个伪元素了，也不要有任何的惊讶


原文： [What’s the Status of the ::selection Pseudo-element?](http://www.impressivewebs.com/status-selection-pseudo-element/)

## 参考
- 1. [伪元素 ::selection 的现状与未来](http://note.rpsh.net/posts/2013/08/27/the-now-and-future-of-selection-pseudo-element)