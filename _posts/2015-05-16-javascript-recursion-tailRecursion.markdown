---
layout: post
title:  "javascript 递归和尾递归"
date:   2015.05.16
---

## 递归 (recursions)

1.定义

> Wiki [1]：Recursion is the process of repeating items in a self-similar way.


> 具体到计算机中去 [2]： 递归（英语：Recursion），又译为递回，在数学与计算机科学中，是指在函数的定义中使用函数自身的方法。

英文的Recursion从词源上分析只是"re- (again)" + "curs- （come, happen）" 也就是重复发生，再次重现的意思。 而对应的中文翻译 ”递归“ 却表达了两个意思：”递“＋”归“。 这两个意思，正是递归思想的精华所在。从这层次上来看，中文翻译反而更达意。

最简单的示例，求解阶乘：

{% highlight javascript %}
function factorial(n) {
    return n == 0 ? 1 : n * factorial(n-1);
}
{% endhighlight %}


[汉诺塔的演示demo](http://jsfiddle.net/timwzw/S7mYF/light/)

{% highlight javascript %}
//将n个盘子按规则从a柱子，移动到c柱子
hanoi( n, a, b, c )
{
    if( n > 0 )
    {
        hanoi(n-1,a,c,b);
        //将a柱子的最上面的盘子移到c柱子
        c.push( a.pop() );
        hanoi(n-1,b,a,c);
    }
}
{% endhighlight %}

整个算法的思路是：

1. 将a柱子上的n-1个盘子暂时移到b柱子上
2. a柱子只剩下最大的盘子，把它移到目标柱子c上
3. 最后再将b柱子上的n-1个盘子移到目标柱子c上

问题的缩小策略是我们怎么把n个盘子从a移到c，同样适用于n-1个盘子从a移到c。

当n一直缩小到3时，我们先把最上面的两个盘子移动到b，然后把最大的盘子移动到c，然后再把b上的两个盘子移动到c。
当n一直缩小到2时，问题终于变得直观了，我们将最上面的盘子移到b，然后把最下面的盘子移到c，最后再把b的盘子移到c。
当n缩小到1时，我们直接将a最上面的盘子移到c就OK了。

这就是问题的终止条件。

## 尾递归(tail recursion)

递归非常耗费内存，因为需要同时保存成千上百个调用记录，很容易发生"栈溢出"错误（stack overflow）。但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误。

尾调用，是指函数内部的最后一个动作是函数调用。该调用的返回值，直接返回给函数。

普通递归的复杂度为O(n), 尾递归的复杂度 O(1)。由此可见，"尾调用优化"对递归操作意义重大。

## 总结

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持"尾调用优化"的语言（比如Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

## 实践

实际项目中遇到的就是AJAX请求回来的数据data，要递归出一棵树。具体代码见[Gist](https://gist.github.com/imjeen/8850fa6102290c4e7006)


## 参考
1. [什么是递归？(维基百科)](http://zh.wikipedia.org/zh/%E9%80%92%E5%BD%92)
2. [数据结构与算法的JavaScript实现及应用 – Stack 递归 汉诺塔](http://blog.jobbole.com/63522/)
3. [汉诺塔](http://www.bing.com/knows/search?q=%E6%B1%89%E8%AF%BA%E5%A1%94&mkt=zh-cn)
4. [递归算法详解](http://chenqx.github.io/2014/09/29/Algorithm-Recursive-Programming/)
5. [迎接ECMAScript 6, 使用尾递归](http://www.jianshu.com/p/269ba1ba1644)
6. [阮一峰 尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)
