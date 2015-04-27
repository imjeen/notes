---
layout: post
title: JavaScript函数节流与函数去抖
date: 2014.11.15
categories: update
---

## 概念

- 函数去抖（debounce）：让一个函数在一定间隔内没有被调用时，才开始执行被调用方法。
- 函数节流（throttle）：是让一个函数无法在很短的时间间隔内连续调用，当上一次函数执行后过了规定的时间间隔，才能进行下一次该函数的调用。
    函数节流的出发点，就是让一个函数不要执行得太频繁，减少一些过快的调用来节流。浏览器aip功能： [requestAnimationFrame](http://www.w3cfuns.com/blog-5416113-5397832.html "requestAnimationFrame")

两个方法都是用来提升前端性能，减轻浏览器压力。

通常的函数（或方法）调用过程分为三个部分：请求、执行和响应。（文中“请求”与“调用”同义，“响应”与“返回”同义，为了更好的表述，刻意采用请求和响应的说法。）

某些场景下，比如响应鼠标移动或者窗口大小调整的事件，触发频率比较高。若稍处理函数微复杂，需要较多的运算执行时间，响应速度跟不上触发频率，往往会出现延迟，导致假死或者卡顿感。

在运算资源不够的时候，最直观的解决办法就是升级硬件，诚然通过购买更好的硬件可以解决部分问题，但是也需要为此付出高额的成本。特别是客户端和服务器模式，要求客户端统一升级硬件基本不可能。

在资源有限的前提下，处理函数无法即时响应高频调用。退而求其次，只响应部分请求是否可行呢？某些场景下的密集性请求，具备很强的同质和连续性。比如说，鼠标移动的轨迹参数。响应越及时效果越平滑，但是如果响应速度跟不上时，反而会出现卡顿感，如果适当的丢弃一些请求效果更流畅。

throttle 和 debounce 是解决请求和响应速度不匹配问题的两个方案。二者的差异在于选择不同的策略。

### 电梯超时

想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略 throttle 和 debounce ，超时设定为15秒，不考虑容量限制。

- throttle 策略的电梯。保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。
- debounce 策略的电梯。如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。

### 使用场景

只要牵涉到连续事件或频率控制相关的应用都可以考虑到这两个函数，比如：

- 游戏射击，keydown 事件
- 文本输入、自动完成，keyup 事件
- 鼠标移动，mousemove 事件
- DOM 元素动态定位，window 对象的 resize 和 scroll 事件
前两者 debounce 和 throttle 都可以按需使用；后两者肯定是用 throttle 了。如果不做过滤处理，每秒种甚至会触发数十次相应的事件。尤其是 mousemove 事件，每移动一像素都可能触发一次事件。如果是在一个画布上做一个鼠标相关的应用，过滤事件处理是必须的，否则肯定会造成糟糕的体验。

## 应用

理解起来有点费力，通过应用来理解就轻松了。通常，我们会在有用户交互参与的地方添加事件，而往往这种事件会被频繁触发。

想象一下窗口的resize事件或者是一个元素的onmousemove事件，resize会在改变浏览器大小事连续触发、onmousemove会在鼠标移动时被连续触发，如果你的回调过重，你可能使浏览器死掉。
想象一下你需要在用户输入一段文字时对文字进行处理，你监听文字改变，每一次改变都会调用一次回调函数，其实我需要的是在用户输入停下来的时候去处理一次。
射击游戏中你希望1s中之内只能发射一颗子弹，而不是用户每按一次发射就发射。
类似的应用还有很多，throttle和debounce的区别就是在频繁的回调中，throttle以一定频率运行，而debounce在频繁回调之后运行。总的来说就是过滤频繁触发的事件回调，使其在真正需要的时候执行，两者根据应用场景自行选择。

## 实现

说了这么多，怎么使用debounce和throttle功能呢，伟大的 http://underscorejs.org 给我们实现好了这两个方法，这两个方法的实现都是不依赖于其他underscore方法的，所以我们可以轻易的添加到其他JavaScript库中，比如jQuery。

### debounce -- setTimeout
函数去抖的基本思想是：对需要去抖的函数做包装，使用闭包记录timeout，第一次回调给函数设置 setTimeout定时器，只要在wait时间内，后一次的回调会clearTimeout取消前一次回调的执行。

    ```
    _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) result = func.apply(context, args);
          return result;
        };
    };
    ```

### throttle -- setInterval
函数节流的基本思想是:无视浏览器的回调，自己按一定频率执行代码。

    ```
    _.throttle = function(func, wait) {
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
          previous = new Date;
          timeout = null;
          result = func.apply(context, args);
        };
        return function() {
          var now = new Date;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else if (!timeout) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
    };
    ```

## 参考
1. [如何稀释onscroll事件](http://segmentfault.com/q/1010000000707337)
2. [js能否给事件触发设置时间间隔条件？](http://segmentfault.com/q/1010000000714176)
3. [浅谈javascript的函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)
4. [JavaScript函数节流与函数去抖](http://www.cnblogs.com/friskfly/p/3175077.html)
5. [浅谈 Underscore.js 中 _.throttle 和 _.debounce 的差异](http://html-js.com/article/The-difference-of-throttle-and-debounce-Coding-technology-blog-in-Underscorejs)