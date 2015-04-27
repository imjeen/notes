---
layout: post
title: jQuery - return false, stopPropagation(), preventDefault()，stopImmediatePropagation()
date: 2014.12.07
category: update
---

## return false

在jQuery中，我们常用return false来阻止浏览器的默认行为，那”return false“到底做了什么？

当你每次调用”return false“的时候，它实际上做了3件事情：

- event.preventDefault();
- event.stopPropagation();
- 停止回调函数执行并立即返回。

对，你没看错，return false确实做了这么多操作。它之所以被一再无误用，是因为使用它后看起来像是完成了我们的阻止任务，并且语句也很简单。
这3件事中用来阻止浏览器继续执行默认行为的只有preventDefault，除非你想要停止事件冒泡，否则使用return false会为你的代码埋下很大的隐患。

## event.preventDefault()

preventDefault有兼容性问题，老版本的IE并不理会这个方法，依然我行我素，此时我们需要一点兼容代码来搞定IE：

>window.event.returnValue= false;//返回值设为false
>
>window.event.keyCode = 0;//如果你想阻止键盘的默认行为，如F5，则这句也是需要的

>event.isDefaultPrevented()

## event.stopPropagation()

有些情况下，你有可能需要停止事件冒泡，直接使用stopPropagation即可。

>event.isPropagationStopped()

## event.stopImmediateProparation()

这个方法会停止对象上相关事件的继续执行，即使当前的对象上还绑定了其它处理函数。有时你的代码非常复杂，不同的widgets和plugin就有可能在同一个对象上添加事件，如果遇到这种情况，那你就很有必要理解和使用stopImmediatePropagation。

>event.isImmediatePropagationStopped()

- [javascript DOM Events](http://imjeen.github.io/queen//update/2014/11/22/javascript-DOM-events.html)
- [return false](http://localhost:4000/queen//2014/11/03/return-false.html)

## 参考
1. [The difference between ‘return false;’ and ‘e.preventDefault();’](http://css-tricks.com/return-false-and-prevent-default/)
2. [return false vs stopPropagation(), preventDefault()，stopImmediatePropagation()](http://www.cnblogs.com/different/archive/2013/05/17/3083983.html)
3. [javascript事件机制](http://segmentfault.com/blog/uncoder/1190000000691197)