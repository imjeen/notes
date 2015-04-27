---
layout: post
title: CSS3 Gradients
date: 2014-11-02
categories: jekyll update
---

## 定义
CSS3 定义了两种类型的渐变（gradients）：

* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
* 径向渐变（Radial Gradients）- 由它们的中心定义

兼容前缀；-webkit-、-moz- 或 -o- 

### CSS3 线性渐变
语法 ：`background: linear-gradient(direction, color-stop1, color-stop2, ...);` 
    为了创建一个线性渐变，您必须至少定义两种颜色结点。颜色结点即您想要呈现平稳过渡的颜色。同时，您也可以设置一个起点和一个方向（或一个角度）。

* 线性渐变 - 从上到下（默认情况下）

``
    #grad {
        background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
        background: linear-gradient(red, blue); /* 标准的语法 */
    }
``

* 线性渐变 - 从左到右

``
#grad {
  background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
``

* 线性渐变 - 对角

``
#grad {
  background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
}
``

#### 使用角度
如果您想要在渐变的方向上做更多的控制，您可以定义一个角度，而不用预定义方向（to bottom、to top、to right、to left、to bottom right，等等）。

角度是指水平线和渐变线之间的角度，逆时针方向计算

#### 使用多个颜色结点

#### 使用透明度（Transparency）
rgba() 函数来定义颜色结点

#### 重复的线性渐变
repeating-linear-gradient() 函数用于重复线性渐变：


---

## CSS3 径向渐变 
径向渐变由它的中心定义。

为了创建一个径向渐变，您也必须至少定义两种颜色结点。颜色结点即您想要呈现平稳过渡的颜色。同时，您也可以指定渐变的中心、形状（原型或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。

语法：'background: radial-gradient(center, shape size, start-color, ..., last-color);'

* 径向渐变 - 颜色结点均匀分布（默认情况下）

``
#grad {
  background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
  background: radial-gradient(red, green, blue); /* 标准的语法 */
}
``

* 径向渐变 - 颜色结点不均匀分布 

``
#grad {
  background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
  background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
}
``

#### 设置形状
shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。


#### 不同尺寸大小关键字的使用

size 参数定义了渐变的大小。它可以是以下四个值：

* closest-side
* farthest-side
* closest-corner
* farthest-corner


#### 重复的径向渐变
repeating-radial-gradient() 函数用于重复径向渐变：


## 参考
1. [W3C: CSS3 Gradients](http://www.w3schools.com/css/css3_gradients.asp) 或 [CSS3 渐变](http://www.w3cschool.cc/css3/css3-gradients.html)
2. [CSS3 Gradients](http://gaoli.github.io/css3-gradients.html)
3. [Cross browser, imageless linear gradients](http://lea.verou.me/2009/03/cross-browser-imageless-linear-gradients/)
4. [CSS3 Patterns, Explained](http://24ways.org/2011/css3-patterns-explained/)