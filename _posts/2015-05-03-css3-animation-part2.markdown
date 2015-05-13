---
layout: post
title:  "CSS3 animation Part2  CSS3动画帧的计算"
date:   2015.05.03
---

[循环动画]按循环方式可分为：

1.单向循环： animation-iteration-count: infinite; animation-direction: normal;
2.双向循环： animation-iteration-count: infinite; animation-direction: alternate;

## 已知和假设

已知：动画总帧数为 100%, 动作数为 n,(停留动画帧数也为 n, 过渡动画帧数为 n-1 )

假设：每个动作停留帧数为 x, 每个动作过渡帧数为 y.



## 单向循环动画

动画过程(100%) =   {[动作停留帧数x] + 动作过渡帧数y} + {[动作停留帧数x] + 动作过渡帧数y} + ... + {[动作停留帧数x]}

100% =  (x+y) + (x+y) + .. + (x) = (x+y)(n-1) + x 

单向循环动画　规律或公式为：　nx + (n-1)y = 100% 

实现一个3个动作的单向循环动画, 每个动作停留20帧，通过公式求得动作过渡帧数y等于30，于是得出我们的帧数代码

{% highlight CSS %}
demo{animation:anim-name 1s infinite;}  /* 单向循环 */

@keyframes anim-name{
    0%, 20%{  /* 动作1 */  }
    40%, 60%{  /* 动作2 */  }
    80%, 100%{  /* 动作3 */  }
}
{% endhighlight %}

## 双向循环动画

相对于单向循环动画, 首尾动作从第二次就开始重复, 直接解决的方案就是首尾动作各自减半。

动画过程(100%) =   {[动作停留帧数x / 2] + 动作过渡帧数y} + {[动作停留帧数x] + 动作过渡帧数y} + ... + {[动作停留帧数x / 2]}

100% = (x/2 + y) + (x+y) + ... + (x/2) = (x+y) + (x+y) + .. + (x) - x = (x+y)(n-1)

双向循环动画　规律或公式为：　(x+y)(n-1) = 100% 

实现一个3个动作的双向循环动画, 每个动作停留20帧，通过公式求得动作过渡帧数y等于30，于是得出我们的帧数代码
{% highlight CSS %}
.demo{animation:anim-name 1s infinite alternate;} /* 双向循环 */

@keyframes anim-name{
    0%, 10%{  /* 动作1 */  }
    40%, 60%{  /* 动作2 */  }
    90%, 100%{  /* 动作3 */  }
}
{% endhighlight %}

## 模拟双向循环动画

其实质是单向循环动画
不含重复）动作个数为 m，（含重复）动作个数为 n，则 n = 2m-1

（含重复动作）动画：(n-1)(x+y) = 100，则 （不含重复动作）动画： (2m-2)(x+y) = 100

实现一个3个动作的双向循环动画, 让每个动作停留20帧，通过公式求得动作过渡帧数y等于5，于是得出我们的帧数代码
{% highlight CSS %}
.demo{animation:anim-name 1s infinite;} /* 模拟双向循环 */

@-webkit-keyframes anim-name{
    0%{  /* 动作1 */  }
    20%{  /* 动作1 */  }
    25%{  /* 动作2 */  }
    45%{  /* 动作2 */  }
    50%{  /* 动作3 */  }
    70%{  /* 动作3 */  }
    75%{  /* 动作2 */  }
    95%{  /* 动作2 */  }
    100%{  /* 动作1 */  }
}
{% endhighlight %}

缩写版代码
{% highlight CSS %}
.demo{animation:anim-name 1s infinite;} /* 模拟双向循环 */

@keyframes anim-name{
    0%, 20%, 100%{  /* 动作1 */  }
    25%, 45%, 75%, 95%{  /* 动作2 */  }
    50%, 70%{  /* 动作3 */  }
}
{% endhighlight %}

## 时间模式计算帧数

 animation-duration

 示例要求：实现一个3个动作的单向循环动画，播放时间2秒，每个动作的过渡时间为0.4秒

通过播放速度公式，我们可以计算出过渡帧数。

播放速度：  100帧 / 2秒 = 50帧/秒

过渡帧数：  50帧/秒 * 0.4秒 = 20帧

示例要求：实现一个3个动作的单向循环动画，播放时间2秒，每个动作的过渡时间为0.4秒

通过播放速度公式，我们可以计算出过渡帧数。

播放速度：  100帧 / 2秒 = 50帧/秒

过渡帧数：  50帧/秒 * 0.4秒 = 20帧

得出过渡帧数，接下来套用单向循环动画的帧数公式，计算出停留帧数，参考上面总结的公式  nx + (n-1)y = 100  ，推导公式得出停留帧数 x = (100-(n-1)y) / n


动作个数(n)：  3, 
过渡帧数(y)： 20, 
停留帧数：  (100-(3-1)*20)/3 = 20帧

于是得出我们的帧数代码
{% highlight CSS %}
.demo{animation:anim-name 2s infinite;}  /* 单向循环 */

@keyframes anim-name{
    0%, 20%{  /* 动作1 */  }
    40%, 60%{  /* 动作2 */  }
    80%, 100%{  /* 动作3 */  }
}
{% endhighlight %}

## 参考
[涨姿势！CSS3动画帧数科学计算法](http://www.w3cfuns.com/article-1321-1.html), [CSS3动画帧数计算器](http://tid.tenpay.com/labs/css3_keyframes_calculator.html)
