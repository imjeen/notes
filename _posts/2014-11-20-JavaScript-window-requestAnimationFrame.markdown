---
layout: post
title: requestAnimationFrame
date: 2014.11.20
categories: update
---

## 前言

相当一部分的浏览器的显示频率是16.7ms。这也是为何setTimeout的定时器值推荐最小使用16.7ms的原因（16.7 = 1000 / 60, 即每秒60帧）。

## 概述

window.requestAnimationFrame()这个方法是用来在页面重绘之前，通知浏览器调用一个指定的函数，以满足开发者操作动画的需求。这个方法接受一个函数为参，该函数会在重绘前调用。

注意: 如果想得到连贯的逐帧动画，函数中必须重新调用 requestAnimationFrame()。

如果你想做逐帧动画的时候，你应该用这个方法。这就要求你的动画函数执行会先于浏览器重绘动作。通常来说，被调用的频率是每秒60次，但是一般会遵循W3C标准规定的频率。如果是后台标签页面，重绘频率则会大大降低。

回调函数只会被传入一个DOMHighResTimeStamp参数，这个参数指示当前被 requestAnimationFrame 序列化的函数队列被触发的时间。因为很多个函数在这一帧被执行，所以每个函数都将被传入一个相同的时间戳，尽管经过了之前很多的计算工作。这个数值是一个小数，单位毫秒，精确度在 10 µs。

- 语法

        // Firefox 23 / IE10 / Chrome / Safari 7 (incl. iOS)
        requestID = window.requestAnimationFrame(callback);
        // Firefox < 23
        requestID = window.mozRequestAnimationFrame(callback);                
        // Older versions Chrome/Webkit 
        requestID = window.webkitRequestAnimationFrame(callback); 

- 参数

    callback
    在每次需要重新绘制动画时,会调用这个参数所指定的函数。这个回调函数会收到一个参数，这个 DOMHighResTimeStamp 类型的参数指示当前时间距离开始触发 requestAnimationFrame 的回调的时间。

- 返回值
    requestID 是一个长整型非零值,作为一个唯一的标识符.你可以将该值作为参数传给 window.cancelAnimationFrame() 来取消这个回调函数。

- 例子

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
        var start = null;
        var d = document.getElementById('SomeElementYouWantToAnimate');
        function step(timestamp) {
          var progress;
          if (start === null) start = timestamp;
          d.style.left = Math.min(progress/10, 200) + "px";
          if (progress < 2000) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);


## requestAnimationFrame 与 CSS3

- CSS3动画不能应用所有属性

    使用CSS3动画可以改变高宽，方位，角度，透明度等等。但是，就像六道带土也有弱点一样，CSS3动画也有属性鞭长莫及。比方说scrollTop值。如果我们希望返回顶部是个平滑滚动效果，就目前而言，CSS3似乎是无能为力的。此时，还是要JS出马，势必，我requestAnimationFrame大人就可以大放异彩，万众瞩目啦

- CSS3支持的动画效果有限

    由于CSS3动画的贝塞尔曲线是一个标准3次方曲线（详见：[贝塞尔曲线与CSS3动画、SVG和canvas的基情](http://www.zhangxinxu.com/wordpress/2013/08/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF-cubic-bezier-css3%E5%8A%A8%E7%94%BB-svg-canvas/)），因此，只能是：Linear, Sine, Quad, Cubic, Expo等，但对于Back, Bounce等缓动则只可观望而不可亵玩焉。




## 参考
1. [MDN: window.requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window.requestAnimationFrame)
2. [拥有更好性能的requesAnimationFrame](http://html-js.com/article/2372)
3. [张鑫旭: CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
4. [segmentfault: requestAnimationFrame Web中写动画的另一种选择](http://segmentfault.com/a/1190000000514843)