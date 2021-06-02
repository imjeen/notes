---
layout: post
category : comprehensive
title: 浅谈缓存机制
tagline: "原创"
---

> 此情可待成追忆，只是当时已惘然。


使用缓存（Cache）是一种明智的选择，能够很好地利用本地资源。一个优秀的的缓存策略能够缩短资源请求的时长，减少延迟，能够合理地再次利用缓存文件，还能够减少带宽占用（节省流量）、降低服务器压力。除了浏览器缓存外，还有数据库缓存，代理缓存，以及CDN缓存等。

下面来看看**浏览器的缓存**，**Dom Storgage**（Web Storage： sessionStorage 和 localStorage）存储机制，**Indexed Database**（IndexedDB）和 **File System API**。以及针对Web 性能（缓存）加载而做相应的优化。

其中 web SQL Database 和 Application Cache 已不推荐使用，这里不再详解，可以通过使用 IndexedBD等替换方案。

## 浏览器的缓存

浏览器的缓存是通过HTTP协议实现，通过header头部的Cache-Control（或Expires）和 Last-Modified（或Etag）等字段控制文件的缓存。

`Cache-Control`

控制文件在本地缓存的有效时长。值可能有：

- max-age=600 （单位s）
- s-maxage 同max-age，只用于共享缓存（比如CDN缓存）。s-maxage会覆盖掉max-age和Expires header。
- public 指定响应会被缓存，并且在多用户间共享
- private 响应只作为私有的缓存
- no-cache 指定不缓存响应，表明资源不进行缓存
- no-store 绝对禁止缓  （不常用，此处不讨论）
- must-revalidate指定如果页面是过期的，则去服务器进行获取 （不常用，此处不讨论）

`Expires` 

功能与 Cache-control一样，但值为一个绝对时间点。Expires（HTTP 1.0标准）优先级低于 Cache-Control（HTTP 1.1 标准）。

`Last-Modified`

标识文件在服务器上的最近更新时间。如果文件缓存过期，浏览器会发送 If-Modified-Since 字段给服务器，由服务器通过比较时间戳来判断文件是否有修改。如果没有修改，服务器返回304状态告诉浏览器继续使用缓存；如果有修改，返回200状态，同时返回最新的文件。

`Etag`

于Last-Modified字段一样的，是对文件进行标识的字段，当取值是一个对文件标识的特征字符。
在向服务器查询文件是否更新时，浏览器通过 If-None-Match 字段把特征字符发送给服务器，由服务器对文件最新特征字符匹配来判断文件是否更新，没有更新返回304，有更新返回200

Etag 和 Last-Modified 同时使用时，只要满足其中一个条件即认为文件没有更新。

使用ETag可以解决Last-modified存在的一些问题：

- a、某些服务器不能精确得到资源的最后修改时间，这样就无法通过最后修改时间判断资源是否更新 
- b、如果资源修改非常频繁，在秒以下的时间内进行修改，而Last-modified只能精确到秒 
- c、一些资源的最后修改时间改变了，但是内容没改变，使用ETag就认为资源还是没有修改的。


用户行为与缓存

![用户行为与缓存](http://ww4.sinaimg.cn/mw690/6941baebgw1eukzzr7rc2j20hg04kjsd.jpg)

- F5 刷新：(即便缓存还没有过期)发送请求字段 Cache-Control: max-age=0，询问服务器文件是否更新
- Ctrl + F5 强刷： （有缓存也认为本地没缓存）发送字段 Cache-Control:no-cache（或Pragma:no-cache），服务器重新返回文件


在实际的应用中，为了设置Cache-Control更大的时长，以及消灭不必要的304请求，采取的方式是：

在资源文件（一般是js，css和图片等）的文件名中加上版本号或MD5字符串，设置 Cache-Control: max-age=2592000 (一般为30天：`60*60*24*30 = 2592000`，甚至一年)，在这个有效时间内，如果本地有缓存，浏览器就会使用本地缓存（chrome控制台可以看到 *Status Code:200 OK(from cache)* ）,这样就不会有无效的304请求。如果资源文件要修改，在更改内容的同时，文件名也要相应地更改（版本的不同或MD5值的改变）


## DOM Storage

DOM Storage 有 windsow.sessionStorage 和 window.localStorage 两种，提供相同的接口有：

- Storage.length 只读属性
- Storage.key()
- Storage.getItem()
- Storage.setItem()
- Storage.removeItem()
- Storage.clear()

windsow.sessionStorage： 存储回话期间的数据，页面载入或被恢复，回话也一直存在（每个标签页面对应相应的回话，打开一个也新页面，就会初始化一个回话）
window.localStorage： 保存持久性的数据，标签页面之间共享，页面关闭了也会存在，除非手动清除。

在 Android 内嵌 Webview 中，需要通过 Webview 设置接口启用 DOM Storage。

## web SQL Database

**规范文档已经不推荐使用 web SQL Database**

Web SQL Database 存储机制提供了一组 API 供 Web App 创建、存储、查询数据库。

## Application Cache（AppCache）

**规范文档也已经不推荐使用 Application Cache**

缓存机制类似于浏览器的缓存（Cache-Control 和 Last-Modified）机制，都是以文件为单位进行缓存，且文件有一定更新机制。但 AppCache 是对浏览器缓存机制的补充，不是替代。

`<html manifest="demo_html.appcache">` 表示文档所引用的manifest文档，文档里有三个字段声明语法：

- CACHE MANIFEST
- NETWORK
- FALLBACK	

## Indexed Database

indexedDB 也是一种数据库的存储机制，以 key-value 的存储方式，但功能更强大，且存储空间更大 （相对于 Dom Storage）

[indexedDb API][ID_indexedDB_API]]可以实现数据存、取以及遍历。这些 API 都是异步的，操作的结果都是在回调中返回。比如：

	var db;
	var request = indexedDB.open("MyTestDatabase");
	request.onerror = function(event) {
	  alert("Why didn't you allow my web app to use IndexedDB?!");
	};
	request.onsuccess = function(event) {
	  db = event.target.result;
	};

- 以key-value 的方式存取对象，可以是任何类型值或对象，包括二进制。
- 可以对对象任何属性生成索引，方便查询。
- 较大的存储空间，默认推荐250MB(分 HOST)，比 Dom Storage 的5MB 要大的多。
- 通过数据库的事务（tranction）机制进行数据操作，保证数据一致性。
- 异步的 API 调用，避免造成等待而影响体验。

Android 在4.4开始加入对 IndexedDB 的支持，只需打开允许 JS 执行的开关就好了。


## File System API

File System API 为 Web App 提供了一个虚拟的文件系统。由于安全性的考虑，这个虚拟文件系统有一定的限制。Web App 在虚拟的文件系统中，可以进行文件（夹）的创建、读、写、删除、遍历等操作。

File System API 有自己的一些特定的优势：

- 可以满足大块的二进制数据（ large binary blobs）存储需求。
- 可以通过预加载资源文件来提高性能。
- 可以直接编辑文件。

浏览器给虚拟文件系统提供了两种类型的存储空间：临时的和持久性的。

File System API 提供了一组文件与文件夹的操作接口，有同步和异步两个版本，可满足不同的使用场景。


## Web 加载性能（缓存）优化

对于静态文件，如 JS、CSS、字体、图片等，适合通过浏览器缓存机制来进行缓存，通过缓存文件可大幅提升 Web 的加载速度，且节省流量。但也有一些不足：缓存文件需要首次加载后才会产生；浏览器缓存的存储空间有限，缓存有被清除的可能；缓存的文件没有校验。

对于 Web 在本地或服务器获取的数据，可以通过 Dom Storage 和 IndexedDB 进行缓存。也在一定程度上减少和 Server 的交互，提高加载速度，同时节省流量。

当然 Web 的性能优化，还包括选择合适的图片大小，避免 JS 和 CSS 造成的阻塞等。这就需要 Web 前端的同事根据一些规范和一些调试工具进行优化了。

## Resource

- [浅谈浏览器缓存-2016](http://zhuanlan.zhihu.com/p/20430670)
- [浏览器缓存详细原理](http://blog.csdn.net/longyulu/article/details/45672607)
- [H5 缓存机制浅析 - 移动端 Web 加载性能优化](https://segmentfault.com/a/1190000004132566)
- [浅谈Web缓存](http://www.alloyteam.com/2016/03/discussion-on-web-caching/?utm_source=tuicool&utm_medium=referral)

[ID_indexedDB_API]:https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
