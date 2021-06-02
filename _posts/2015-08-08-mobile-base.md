---
layout: post
category: mobile
title: "移动屏幕设配的实践总结"
tagline: "原创"
---

## overview

- **单位英寸像素数（Pixel Per Inch，PPI）**：现实世界的一英寸内像素数，决定了屏幕的显示质量
- **设备像素比率（Device Pixel Ratio，DPR）**：物理像素与逻辑像素（px）的对应关系
- **分辨率（Resolution）**：屏幕区域的宽高所占像素数


`rem` (Relative to font-size of the root element) 是指相对于根元素`html`的字体大小的单位。即： 

> 某元素的像素 / 根元素的像素 = 某元素的相对值 (rem)

通过 rem 实现页面等比例适配所有屏幕。大多浏览器一般默认字体大小font-size：16px，为了便于计算强制将 `html` 根元素的字体大小font-size: 10px, 或 62.5%。


## viewport 和 meta

页面元素大小关注点有： 字体、高宽间距、图像（图标、图片）。

其中，图像相对要复杂一些，针对流量、清晰度等问题网上也有比较成熟的解决方案，比如：矢量化、字体化、image-set 等等。

一个典型的例子是设置等比例缩放的背景图片，利用原理：padding的百分比是以父元素的宽度计算的。

设计师希望在任何屏幕上这条线都是1物理像素。但是如果`meta`设置如下, 在retina屏幕上看到就不一样了，这里要了解设备像素比DPR。


	<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">


一个典型的针对移动端优化的站点包含类似下面的内容：

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

移动设备viewport设置：

- width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）
- height：高度（数值 / device-height）（范围从223 到10,000）
- initial-scale：初始的缩放比例 （范围从>0 到10）
- minimum-scale：允许用户缩放到的最小比例
- maximum-scale：允许用户缩放到的最大比例
- user-scalable：用户是否可以手动缩 (no,yes)


## 方案

页面的显示关注点在于：

- 不同宽高（包括横竖屏）
- 设备像素比DPR，典型的retina屏幕（注: iphohe6 plus的DPR为3）

#### 同设配像素比DPR，不同宽高

对于相同设备像素比DPR上，使用rem单位实现屏幕设配。

除了border以及一些间距外，请使用rem单位，那么只需对不同设备动态改变根元素的font-size即可。

- 用js判断来动态改变html的字体大小
- 利用**媒体查询media query**也可以实现适配

#### 不同设配像素比DPR，同宽高
	
对于不同设备像素比DPR，缩放比例也不一样。这是需要动态改变meta标签。

用JS来动态写meta标签，代码类似这样：

	var metaEl = doc.createElement('meta');
	var scale = isRetina ? 0.5:1;  // 只考虑到DPR值为1和2的情况
	metaEl.setAttribute('name', 'viewport');
	metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	if (docEl.firstElementChild) {
	    document.documentElement.firstElementChild.appendChild(metaEl);
	} else {
	    var wrap = doc.createElement('div');
	    wrap.appendChild(metaEl);
	    documen.write(wrap.innerHTML);
	}



## reference

- [web app变革之rem](http://isux.tencent.com/web-app-rem.html)
- [MobileWeb 适配总结](http://html-js.com/article/2903)
- [MDN meta ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) 和 [apple viewport](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html)
- [在移动浏览器中使用viewport元标签控制布局](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)
- [设计师DPI指南(翻译)](http://www.w3ctech.com/topic/674)
- [CSS Units](http://www.w3schools.com/cssref/css_units.asp)


