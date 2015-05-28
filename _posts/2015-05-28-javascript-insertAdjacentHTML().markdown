---
layout: post
title:  "javascript Element.insertAdjacentHTML()"
date:   2015.05.28
---

## 概述

insertAdjacentHTML() 将指定的文本解析为 HTML 或 XML，然后将结果节点插入到 DOM 树中的指定位置处。该方法不会重新解析调用该方法的元素，因此不会影响到元素内已存在的元素节点。从而可以避免额外的解析操作，比直接使用 innerHTML 方法要快。

## 语法

element.insertAdjacentHTML(position, text);

position 是相对于 element 元素的位置，并且只能是以下的字符串之一：

- beforebegin - 在 element 元素的前面。
- afterbegin - 在 element 元素的第一个子节点前面。
- beforeend - 在 element 元素的最后一个子节点后面。
- afterend - 在 element 元素的后面。

text 是字符串，会被解析成 HTML 或 XML，并插入到 DOM 树中。

位置名称示意：

{% highlight HTML %}
<!-- beforebegin -->
<section>
<!-- afterbegin -->

内容...

<!-- beforeend -->
</section>
<!-- afterend -->
{% endhighlight%}

## javascript VS. jQuery

{% highlight HTML %}
<!--  After -->

<!-- JQUERY -->
$(el).after(htmlString);
<!-- IE8+ -->
el.insertAdjacentHTML('afterend', htmlString);

<!-- Append -->

<!-- JQUERY -->
$(parent).append(el);
<!-- IE8+ -->
parent.appendChild(el);

<!-- Before -->

<!-- JQUERY -->
$(el).before(htmlString);
<!-- IE8+ -->
el.insertAdjacentHTML('beforebegin', htmlString);

{% endhighlight%}

## Resource

1. [MDN - Element.insertAdjacentHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
2. [jQuery free](http://youmightnotneedjquery.com/)