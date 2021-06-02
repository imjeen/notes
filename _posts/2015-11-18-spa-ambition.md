---
layout: post
category : spa
title: 构建单页Web应用的野心 - 开篇
tagline: "原创"
---

> 弄潮儿

## overview

目前构建单页应用（single page application，SPA）主要通过ajax，URL hash和 HTML5 history API等方式实现。页面更加依赖于javascript，把功能都集中在同一个作用域，所以代码的隔离和模块化显得更加重要。

## MV* 开发框架

随着单页应用的不断膨胀，相应的代码和业务逻辑也愈发复杂，模块之间的数据和通信也要显得至关重要，代码组织更加需要迎合这样的趋势。

为了解决以上问题，有不少的MV*框架（Vue.js, AngularJS, Backbone等）实现在js层创建不同的模块，以及实现它们之间的通信机制。

## component 组件化

每个组件都封装自己的 CSS 样式，模板和 JavaScript 定义，同时具备接口与其他组件通信和共享数据，因为组件并不是孤立的。

通过store 模式可以实现组件间的数据状态的读写和同步，而把数据状态的操作放到各个组件自己去处理。

## router 路由与状态的管理

将产品功能划分为若干个状态，把这些状态一一对应或映射到相应的路由上，通过改变URL的hash值或pushstate机制，动态解析路由，使之与功能界面相匹配。

## cache 缓存与本地存储

利用浏览器的缓存机制，将js和css等静态资源缓存起来，非首次请求的直接读取缓存版本，以加快加载速度。同时通过HTML5的localStorage或者localStorageDB，存储一些临时数据，简化业务逻辑。以至能够更好地进行离线处理。

## connect 服务端通信

常见与服务器通信的方式之一是使用AJAX机制

- AJAX机制，但受浏览器的同源安全机制，旧的浏览器版本无法完成跨域请求。
- HTTP是一个无状态的非持久的通信协议(80端口)，有1.0和1.1之说，即keep-alive（把多个HTTP请求合并为一个）
	
	- JSONP本质是对js资源的get请求（HTTP协议），是解决跨域问题的一个好方案，自身也有局限性和缺点
  - CROS（Cross-Origin Resource Sharing，跨域资源共享）只适用于现代新浏览器，同时必须设置服务端的`Access-Control-Allow-Origin:*`（“*”号表示允许任何域向服务端提交请求，注意为了防止XSS攻击服务器，需要限制域）,才可以进行AJAX的跨域请求。

- HTTPS是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议（443端口）。为解决服务器资源损耗，可以通过Nginx等代理解析
- websocket 新协议是一个持久化的协议，实现了浏览器与服务器全双工通信。

建立websocket协议连接后，服务端主动向客户端推送消息。Websocket只需要一次HTTP握手，所以说整个通讯过程是建立在一次连接/状态中，也就避免了HTTP的非状态性，服务端会一直知道你的信息，直到你关闭请求。见[WebSocket 是什么原理？为什么可以实现持久连接？](http://www.zhihu.com/question/20215561)

## 内存管理

无刷新页面，浏览器无法清除内存，需要考虑对内存的特别管理。在backbone框架中很容易造成内存泄漏，需要手动对视图对象销毁，因为框架就没有对这些内存的管理，需要我们额外管理。

## style 样式的规划

除了全局和通用的样式外，也要合理地划分组件的样式。
单页面的就是不同组件的叠加或切换，所以也有规划好各个组件的层叠上下文的层级，对页面视图和组件区块的z-index区间进行划分，以避免冲突。

## SEO

单页面不利于SEO。

目前google等搜索引擎能够通过识别`#!/`来特殊处理URL hash方式

另一个方案是在 服务端放一个代理层工具（如 prerender.io）对判断爬虫请求而返回动态生成的页面。 

## conclusion

为什么要开发单页面应用？

**not a best practice，but a better practice！** 其实，构建单页应用确实也是一个挑战，对产品的架构、代码的组织和要求也非常高。

前后端完全分离的开发，互相依赖减弱，使得产品前后架构更加清晰。 
前端可以更加能够对页面进行优化，性能和用户体验更上一层。
同时前端的组件和模块，也可以单独开发和单元测试。

不过移动端基本可以不用考虑HTML5的浏览器兼容问题。

HTML5 history API：

- history.pushState(state, title, url)
- history.replaceState(state, title, url)
- window.onpopstate 

[Web API之sessionStorage、localStorage、globalStorage](http://segmentfault.com/a/1190000003480930)


## resource

- [构建单页Web应用](https://github.com/xufei/blog/issues/5)
- [大型单页面应用的进阶挑战](http://div.io/topic/1340)
- [一种SPA（单页面应用）架构](http://segmentfault.com/a/1190000000607661)
- [前端：将网站打造成单页面应用SPA（一）](http://segmentfault.com/a/1190000002920768)
