---
layout: post
title:  "CSS3 animation Part1  初识"
date:   2015.05.03
---

CSS3 aimation 已经毛皮地使用一段时间了，这里先粗浅地介绍一下，一方面记录一下笔记，同时也夯实一下基础功夫。

总的来说，动画是使元素从一种样式逐渐变化为另一种样式的效果。通过使用 [@keyframes][keyframe]规则声明动画中具体的帧变化过程，然后绑定到具体的元素实现动画。

<figure>
	<img src="http://www.w3.org/TR/css3-animations/sandwich.png" alt="">
	<figcaption>Computation of animated property values</figcaption>
</figure>

### Keyframes

{% highlight CSS %}
	//@keyframes animationname {keyframes-selector {css-styles;}}
	@keyframes mymove{
		0%   {top:0px;}
		25%  {top:200px;}
		50%  {top:100px;}
		75%  {top:200px;}
		100% {top:0px;}
	}
{% endhighlight %}

### animation

<img src="http://cdn2.w3cplus.com/cdn/farfuture/JKnJarl8UI_49aRemGLqW-JQZzr0GO7rmXEaN7vSfkM/mtime:1341237472/sites/default/files/animation-pro.png">

指定至少这两个CSS3的动画属性绑定向一个选择器：

- 规定动画的名称
- 规定动画的时长

所有动画属性：

1. animation-name 所有动画属性的简写属性，除了 animation-play-state 属性。
2. animation-duration 规定动画完成一个周期所花费的秒或毫秒。默认是 0。
3. animation-timing-function 规定动画的速度曲线。默认是 "ease"。
4. animation-delay	规定动画何时开始。默认是 0。
5. animation-iteration-count	规定动画被播放的次数。默认是 1。（n，infinite）
6. animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。
7. animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。（paused）

可以简写的动画 animation 属性。

## 参见 


- [animations](http://www.w3.org/TR/css3-animations/)
- [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_animations)

[keyframe]: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

