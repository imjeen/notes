---
layout: post
title: CSS3 flexbox -- 使用 CSS 弹性盒
permalink: CSS3
date: 2014.11.25
categories: update
tags: CSS3
---
## 前言

CSS3 弹性盒（ Flexible Box 或 flexbox），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。

弹性盒中的子元素通过在各个方向放置就可以以弹性的尺寸适应父元素的显示区域。由于子元素的显示顺序和它们在代码中 的顺序是独立的，通过使用弹性盒，定位子元素变得更加简单，复杂的布局也能够使用更清晰的代码更简单的实现。

## 弹性盒概念

### 弹性盒布局名词

虽然弹性盒布局的讨论中自由地使用了如水平轴、内联轴和垂直轴、块级轴的词汇，仍然需要一个新的词汇表来描述这种模型。参考下面的图形来学习后面的词汇。图形显示了弹性容器有一个值为row的属性flex-direction，其意义在于包含的子元素相互之间会根据书写模式和文本流方向在主轴上水平排列，即从左到右。

![flexbox]({{ site.url }}/images/flex_terms.png)

- **弹性容器**

    弹性子元素的父元素。 通过设置display 属性的值为flex 或 inline-flex将其定义为弹性容器。

- **弹性子元素**

    弹性容器的每一个子元素变为一个弹性子元素。弹性容器直接包含的文本变为匿名的弹性子元素。

- **轴**

    每个弹性盒布局以两个轴来排列。弹性子元素沿着主轴依次相互排列。侧轴垂直于主轴。

    - 属性 flex-direction 定义主轴方向。
    - 属性 justify-content 定义了弹性子元素如何在当前线上沿着主轴排列。
    - 属性 align-items 定义了弹性子元素如何在当前线上沿着侧轴排列。
    - 属性 align-self 覆盖父元素的align-items属性，定义了单独的弹性子元素如何沿着侧轴排列。

- **方向**

    弹性容器的主轴开始、主轴结束和侧轴开始、侧轴结束边缘代表了弹性子元素排列的起始和结束位置。它们具体取决于由writing-mode（从左到右、从右到左等等）属性建立的向量中的主轴和侧轴位置。

    - 属性 order 将元素依次分组，并决定谁先出现。
    - 属性 flex-flow 是属性 flex-direction 和 flex-wrap 的简写，用于排列弹性子元素。

- **行**

    弹性子元素根据 flex-wrap 属性控制的侧轴方向（在这个方向上可以建立垂直的新线），既可以是一行也可以是多行排列。

- **尺寸**

    弹性子元素宽高可相应地等价于主尺寸和侧尺寸，它们都分别取决于弹性容器的主轴和侧轴。

    - min-height 和 min-width 属性的初始值为新增关键字 auto。
    - 属性 flex 是 flex-basis，flex-grow 和 flex-shrink 的缩写，代表弹性子元素的伸缩性。

## 浏览器兼容性

- [Browser Support](http://css-tricks.com/snippets/css/a-guide-to-flexbox/#browser-support)
- [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes#.E6.B5.8F.E8.A7.88.E5.99.A8.E5.85.BC.E5.AE.B9.E6.80.A7)

## Examples

    <ul class="flex-container">
      <li class="flex-item">1</li>
      <li class="flex-item">2</li>
      <li class="flex-item">3</li>
      <li class="flex-item">4</li>
      <li class="flex-item">5</li>
      <li class="flex-item">6</li>
    </ul>

    .flex-container {
      padding: 0;
      margin: 0;
      list-style: none;
      
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      
      -webkit-flex-flow: row wrap;
      justify-content: space-around;
    }

    .flex-item {
      background: tomato;
      padding: 5px;
      width: 200px;
      height: 150px;
      margin-top: 10px;
      
      line-height: 150px;
      color: white;
      font-weight: bold;
      font-size: 3em;
      text-align: center;
    }



## 参考
1. [学习CSS布局-flexbox](http://zh.learnlayout.com/flexbox.html)
2. [MDN: 使用 CSS 弹性盒](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes)
3. [A Complete Guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
4. [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)