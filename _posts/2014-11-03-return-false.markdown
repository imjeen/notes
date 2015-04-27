---
layout: post
title: return false
date: 2014-11-03
categaries: jekyll update
---

## break: 跳出循环

## continue: 跳出此次循环

## return

1. return; // 将把握权返回给页面
2. return ture; // 或者 return !0;
3. return false;  // 或者 return !1;

return为返回值，不管是true、false还是其他，都会终止函数的执行。

* 阻止默认事件：preventDefault()

用addEventListener绑定的事件 必须用preventDefault()来阻止默认事件

* 阻止事件冒泡：stopPropagation()

DOM的事件传播有两个类型，一个是捕获（从父节点到子节点），一个是冒泡（从子节点到父节点），所以一个事件触发时可以有多个处理器去处理它，DOM标准约定了return false后就会阻止事件继续传播。

* JQuery： return false

在jQuery中 return false 等价于：
    e.preventDefault()
    e.stopPropagation()
    return false;

### form表单里的return false
onsubmit属性,默认返回true；

    //添加 方法submitTest(),能正常提交,不管submitTes()是否return false
    <form action="index.jsp" method="post" onsubmit="submitTest();;">
    
    //覆写 onsubmit，submitTest()的return false致使表单无法提交
    <form action="index.jsp" method="post" onsubmit="return submitTest();;"> 


## 参考
* [jQuery return false](http://www.berlinix.com/js/jquery-return-false.php)
* CSS-sticks - [The difference between ‘return false;’ and ‘e.preventDefault();’](http://css-tricks.com/return-false-and-prevent-default/)