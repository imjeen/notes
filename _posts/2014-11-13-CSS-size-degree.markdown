---
layout: post
title: css 长度和角度单位
date: 2014.11.13
categories: update
---
## 前言

## 长度单位
![字体单位](../../../../images/size.jpg)

### px
- px为单位

### em
em为单位、百分比%为单位

“em”就是一个相对值，而且是一个相对于父元素的值，其真正的计算公式是：
1 ÷ 父元素的font-size × 需要转换的像素值 = em值

以<body>的"font-size"为基准
任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。
那么 12px=0.75em，10px=0.625em

为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，
这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。 


em有如下特点：

1. em的值并不是固定的；
2. em会继承父级元素的字体大小。

所以我们在写CSS的时候，需要注意两点：

1. body选择器中声明Font-size=62.5%；
2. 将你的原来的px数值除以10，然后换上em作为单位；
3. 重新计算那些被放大的字体的em数值。避免字体大小的重复声明。 

也就是避免1.2 * 1.2= 1.44的现象。比如说你在#content中声明了字体大小为1.2em，那么在声明p的字体大小时就只能是1em，而不是1.2em, 因为此em非彼em，它因继承#content的字体高而变为了1em=12px。

但是12px汉字例外，就是由以上方法得到的12px(1.2em)大小的汉字在IE中并不等于直接用12px定义的字体大小，而是稍大一点。这个问题 Jorux已经解决，只需在body选择器中把62.5%换成63%就能正常显示了。原因可能是IE处理汉字时，对于浮点的取值精确度有限。不知道有没有其他的解释
rem为单位

### rem
CSS3引进的新单位。在W3C官网上是这样描述rem的——“font size of the root element” 。
参考点：相对于根元素<html>

---

- em

    em为相对长度单位，相对于当前对象内文本的字体尺寸(font-size)。比如：Web页面中body的文字大小在用户浏览器下默认渲染是16px，所以，此时的1em = 16px;

- in

    英寸（Inches）。绝对长度单位。

    1in = 2.54cm = 25.4 mm = 72pt = 6pc = 96px

- pt

    点（Points）。绝对长度单位。

    1in = 2.54cm = 25.4 mm = 72pt = 6pc = 96px


## 角度单位

- deg

    度（Degress）。一个圆共360度

    90deg = 100grad = 0.25turn 

- grag

    梯度（Gradians）。一个圆共400梯度

    90deg = 100grad = 0.25turn 

- turn

    转、圈（Turns）。一个圆共1圈

    90deg = 100grad = 0.25turn

- rad

    弧度（Radians）。一个圆共2π弧度

    90deg = 100grad = 0.25turn

## 参考
 - 1.[css学习归纳总结](http://segmentfault.com/blog/trigkit4/1190000000800711#articleHeader12)
 - 2.[CSS3的REM设置字体大小](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)