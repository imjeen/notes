---
layout: post
category : javascript
title: "JSONP(JSON with Padding)"
tagline: "原创"
---

## Overview

同源策略(协议、域名、端口相同)，它是由Netscape提出的一个著名的安全策略，现在所有的可支持javascript的浏览器都会使用这个策略。

跨域的安全限制都是指**浏览器端**来说的.服务器端是不存在跨域安全限制的。

在HTML文档中能够发起HTTP请求的元素有 `<link>`请求css、`<script>`请求脚本、`<iframe`>请求HTML文档、`<img>`请求图片、`<a>`链接、`<form>`的GET和POST请求、`<object>`其他媒体资源、`<source>`音频和视频资源等传统HTTP资源请求（大多是GET请求），都可以实现跨域。

而对于AJAX是通过 XMLHttpRequest进行通信的，请求头部多了 **X-Requested-With:XMLHttpRequest** 字段，无法跨域。

`JSONP` 是非官方的一种数据传输协议。解决浏览器“跨源资源共享”的一种方案。

本质是采用`<script>`的跨域访问资源的特性来解决跨源问题的, 所以JSOP并不是AJAX请求，就是一个传统的HTTP请求


## How

JSONP由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数，而数据就是传入回调函数中的JSON数据。如一个JSOP的URL请求：

	http://example.com/json/?callback=handleResponse

jsonp动态创建的节点确实是需要删除的。jQuery在节点onload/complete时，删除节点

> 注意,jquey是不支持post方式跨域的. 
> 虽然采用post +动态生成iframe是可以达到post跨域的目的(有位js牛人就是这样把jquery1.2.5 打patch的),但这样做是一个比较极端的方式,不建议采用. 
> 也可以说get方式的跨域是合法的,post方式从安全角度上,被认为是不合法的, 万不得已还是不要剑走偏锋..

可以利用Flash+js的方式, 前提是客户端必须有flash，并且在服务端的根目录下放置crossdomain.xml文件


## jQuery的跨域写法


####  Ajax() 方法

指定dataType为jsonp或scrip

示例[Working with JSONP](https://learn.jquery.com/ajax/working-with-jsonp/)

	// Using YQL and JSONP
	$.ajax({
	    url: "http://query.yahooapis.com/v1/public/yql",
	 
	    // The name of the callback parameter, as specified by the YQL service
	    jsonp: "callback",
	 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	 
	    // Tell YQL what we want and that we want JSON
	    data: {
	        q: "select title,abstract,url from search.news where query=\"cat\"",
	        format: "json"
	    },
	 
	    // Work with the response
	    success: function( response ) {
	        console.log( response ); // server response
	    }
	});


#### getScript() 方法

getScript() 方法通过 HTTP GET 请求载入并执行 JavaScript 文件。注： jQuery1.2后才支持跨域调用 JavaScript 文件

#### getJSON() 方法

通过 HTTP GET 请求载入 JSON 数据。

## Advance

- 使用HTML5的window.postMessage方法跨域

window.postMessage(message,targetOrigin) 方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法


## 清除动态加入的script节点

> 用jquery的话，用$.getJSON()或$.ajax()方法在发生错误时可以用error回调函数来捕获错误，前端对用户进行提示。另一个方法，设定一段延时，超过设定时间无响应的话提示用户稍后重试等等。

JSONP是需要动态创建script标签的，我们需不需要处理这些script元素？

还有一个需要考虑的就是，很多框架/库在实现jsonp时，一般都会生成一个uuid，比如jQuery19109801354627124965_1398582826844，然后将它挂载到window上，用以包装用户的callback，比如：

	window['jQuery19109801354627124965_1398582826844'] = function() {
	    // ...
	    callback();
	    // ...
	}
	
这些挂载到window上的callback也是需要释放的。

清除标签后浏览器仅仅是移除这个节点而已，并没有对节点内的JS进行垃圾回收。即使script标签移除了，元素的属性还是可以取到的，比如src属性。要回收这段JS可以手动清除script元素所有属性：

	var jsonp = document.getElementById('myJson'); //取得script元素
	for (var prop in jsonp) {
	    delete jsonp[prop];
	}


以Chrome 控制台为例，每次垃圾回收都会触发 GC event [Chrome Developer Tools之Timeline面板](http://www.kazaff.me/2014/01/18/chrome-developer-tools%E4%B9%8Btimeline%E9%9D%A2%E6%9D%BF/), 浏览器自动垃圾回收（一般发生在unload、inactive tab或者产生了太多垃圾不得不gc时），区别于内存泄漏（memory leak）。





## Reference

- [详解js跨域问题](http://segmentfault.com/a/1190000000718840)
- [Using PUT/POST/DELETE with JSONP and jQuery](http://stackoverflow.com/questions/5345493/using-put-post-delete-with-jsonp-and-jquery)
- [关于javascript跨域及JSONP的原理与应用](http://segmentfault.com/a/1190000002438126)
- [关于JSONP的两点疑问](http://segmentfault.com/q/1010000000483131)
