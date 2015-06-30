---
layout: post
title:  "text-overflow"
date:   2015.06.30
---

## 省略号 dot-dot-dot 

直接用字符串表示'...' 或 用HTML实体表示 & hellip; 或 通过伪类 ::after实现



## 单行

### 通常方法

{% highlight CSS %}
.ellipsis {
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}
{% endhighlight%}

### 左右浮动和负margin

{% highlight HTML %}
<div class="wrap">
	<div class="content"></div>
	<div class="dot"></div>
</div>
{% endhighlight%}

{% highlight CSS %}
.wrap{ overflow: hidden;}
.wrap .content{ height: 20px; float: left; margin-right: 15px;}
.wrap .dot{ float: right; margin-top: -20px;}
{% endhighlight%}


## 多行

### -webkit-line-clamp

{% highlight CSS %}
p {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
{% endhighlight%}

## 脚本

{% highlight javascript %}
function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}
{% endhighlight%}

## 参考

- MDN [text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [text-overflow](https://css-tricks.com/almanac/properties/t/text-overflow/)
- [ELLIPSE MY TEXT…](http://html5hub.com/ellipse-my-text/)
- Github 上的插件 [Clamp.js](https://github.com/josephschmitt/Clamp.js)
- [Supported CSS Properties](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html)
- example [多行文本溢出显示省略号(…)全攻略](http://www.css88.com/archives/5206#more-5206)
