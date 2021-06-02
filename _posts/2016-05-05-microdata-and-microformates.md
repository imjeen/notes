---
layout: post
category : comprehensive
title: 微数据(microdata)和微格式(microformate) 
tagline: "摘要"
---

语义网旨在让机器可以理解信息，旨在让网络更加智能，如提供信息获取、信息过滤、Web 自动服务等。语义网的实现有多种技术，如 **HTML5的Microdata**、**RDF**、**Microformat** 等。

## 微数据 Microdata

Microdata 是用来对 Web 页面上已经存在的数据提供附加的语义，它并不是被设计用来作为独立的数据格式，它是对 HTML 的一种补充。

Google 已经致力于测试 Microdata 语法，Google 搜索结果已经支持 Microdata。

比如github的个人主页的一个HTML片段：

	<h1 class="vcard-names my-3">
	  <div class="vcard-fullname" itemprop="name"></div>
	  <div class="vcard-username" itemprop="additionalName"></div>
	</h1>


在HTML代码量多出现了很多自定义的属性，如itemscope, itemtype, itemprop等。这些属性就是方便机器识别的特定的标记。其含义等依次如下：

- **itemscope**：定义一组名值对，称为项。

- **itemprop=”属性名”**：添加一个数据项属性。这个属性名可以是个单词或是个URL，与元素包含的文本值相关：

	- 对于大部分元素，属性名值就是元素标签里面的文本值（不是所有标签）。
	- 对于有URL属性的元素，该值就是URL（如`<img src="">`, `<a href="">`, `<object data="">`等）。
	- 对于`<time>`元素，该值就是datetime=""属性。
	- 对于`<meta itemprop="" content="">`， 该值就是content=""属性。

- **itemref=””**：允许微数据项通过指向特定ID（含有需要属性的元素）包含非后代属性。

- **itemtype=””**：微数据定义的类型。其值为URL，扮演词汇表名称的作用。

- **itemid=””**：允许词汇表给微数据项定义一个全局标识符，例如书的ISBN数值，在同样元素上使用itemid作为数据项的itemscope和itemtype属性

定义自己的 Microdata 词汇表（vocabulary）很简单，首先，需要一个 URL 形式的命名空间（namespace）。这个 URL 可以实际上指向一个可用的 Web 页面，但这个 URL 并不是必须的。假如我们要创建一个 Microdata 词汇表（vocabulary）来表示一个人（Person）。如果拥有一个 data-vocabulary.org 的域，可以使用 URL（http://data-vocabulary.org/Person）来表示我们的 Microdata 词汇表（vocabulary）的命名空间（namespace）。通过在自己控制的域上选择一个 URL 就能很容易地创建一个全世界唯一的标识符。


首先要做的是声明使用的 Microdata 词汇表（vocabulary）的命名空间，通过添加一个 itemtype 属性完成；另外声明词汇表的范围，通过添加一个 itemscope 属性完成。


	<section itemscope> 
	 <h1 itemprop="name">Mark Pilgrim</h1>
	 <p><img itemprop="photo" src="http://www.example.com/photo.jpg" alt="[me smiling]"></p> 
	 <p><a itemprop="url" href="http://diveintomark.org/">weblog</a></p> 
	</section>


在你的页面中添加 Microdata 就是在已有的 HTML 元素上添加一些属性。首先要做的是声明使用的 Microdata 词汇表（vocabulary）的命名空间，通过添加一个 itemtype 属性完成；另外声明词汇表的范围，通过添加一个 itemscope 属性完成。在这个例子中，所有的数据都在元素 `<section>` 中，所以我们在 `<section>` 元素上声明 itemtyp 和 itemscope：

`<section itemscope itemtype="http://data-vocabulary.org/Person">`

元素 `<section>` 中的第一个数据是你的名字（name），它内嵌在 `<h1>` 元素中，`<h1>` 元素在 HTML5 Microdata 数据模型中没有特殊的处理，所以它遵循“all other elements”的规则，即它的属性值只是 HTML 相应元素的简单文本内容。（当然，如果你的名字内嵌在 `p>`,`<div>`, 或者 `<span>` 等元素中，这个规则同样有效。）

`<h1 itemprop="name"> Mark Pilgrim </h1>`

上面的语句可以这么表述：这里是 http://data-vocabulary.org/Person 词汇表的一个 name 属性，它的属性值是 Mark Pilgrim。
接下来：photo 属性，它应该是一个 URL。根据 HTML5 Microdata 数据模型的规则，`<img>` 元素的值是 src 属性。可以看出，你的 photo 的 URL 已经在 `<img src>` 中了，你需要做的就是声明 `<img>` 元素是 photo 属性。

`<p><img itemprop="photo" src="http://www.example.com/photo.jpg" alt="[me smiling]"></p>`

上面的语句可以这样表述：这里是 http://data-vocabulary.org/Person 词汇表的一个 photo 属性，它的属性值为 http://www.example.com/photo.jpg。
最后，属性 url 同样是一个 URL。根据 HTML5 Microdata 数据模型的规则，元素 `<a>` 的值是它的 `<href>` 属性。同样，它完全符合现有的标识，你所需要做的就是声明现有的 `<a>` 元素是 url 属性：

`<a itemprop="url" href="http://diveintomark.org/"> dive into mark </a>`

上面的语句可以这么表述：这里是 http://data-vocabulary.org/Person 词汇表的一个 url 属性，它的值为 http://diveintomark.org。

## 微格式 microformate 

三种微格式的实现：

- 使用[rel](http://www.mijia.org/blog/?p=153)来定义基于链接的关系
- 使用[XFN](http://www.mijia.org/blog/?p=154)微格式为链接增加人际关系的描述
- 使用[hCard](http://www.mijia.org/blog/?p=155)微格式来描述人、公司和地点
- 使用[hCalendar](http://www.mijia.org/blog/?p=156)微格式为那些关于事件和基于时间或地点的活动提供语义和结构化信息。

### ref

基于链接关系的微格式，使用rel 属性

rel 属性通常用来描述链接之间的关系，也就是说目的地址 (href) 跟源（站点）之间的关系。大部分人可能非常熟悉这个属性，因为他常常被用来描述CSS的链接地址：

`<link rel="stylesheet" type="text/css" media="screen" href="/styles/main.css" />`


### XFN

XFN扩展了rel-me的概念，不仅仅包含个人身份同社交网络之间的关系。您可以为链接中的rel属性简单的添加多个属性值用以描述关系信息。

> 例如，我经常在博客中引用我的老板兼好友，Ian：
> `<a href="http://www.iso-100.com/" rel="met colleague co-worker friend">Ian Pitts</a>`

### hCard

> [vCard](http://en.wikipedia.org/wiki/VCard)是用于电子商务名片的标准，通常被附加在邮件中，采用“.vcf”的扩展名。就像传统的商务名片一样，vCard中包括姓名和联系信息。hCard是用来允许网站作者将自己的vCard信息放入到他们网页中的标准化格式。hCard使用对于vCard而言1:1的重新展现方式。这意味着标记为hCard的网页内容可以被转化为vCard，从而在支持vCard的应用或者服务中使用。

hCard微格式展现人、组织、公司和地点──换句话说就是地址/联系方式，包括但不仅仅限于如下信息：

- 格式化/结构化名称 (比需项)
- 邮寄地址
- Email地址
- 电话号码
- 电报挂号


跟所有微格式相同的是，hCard使用已有的标记和属性来定义地址/联系方式，不过是使用特定的不同class值，通常被引用为“属性”和“子属性”。


个人的名字信息包含在`<p class="fn n">`之中：

	<p class="fn n">
		<span class="given-name">Emily</span>
		<span class="additional-name">Paige</span>
		<span class="family-name">Lewis</span>
	</p>

代码 fn 用来说明内部包含的内容是对应于人名的字符串，像前面提过的，这个是在hCard微格式中必需的属性。代码 n 用来说明内部包含的内容是人名的结构，例如姓、名、字等。虽然属性n在规范要求中必须出现，但是如果包含在fn属性中的值恰好是两个词的话，属性则作为隐式处理。

### hCalendar

跟hCard一样，hCalendar遵循一些基本规则：

- 属性和子属性通过class来描述。
- 因为跟iCalendar之间1:1的对应关系，特定的hCalendar属性是建立在iCalendar属性名称基础上的（例如，vevent）
- 属性和子属性名字大小写敏感
- “根”属性不能同其他属性组合。因此`<p class="vevent summary">`是无效的。

NOTE： 使用什么样的标记元素并不重要。class的值（属性/子属性）才决定hCalendar微格式。



## Resource

- [使用 HTML5 中的 Microdata 增强 Web 应用程序的语义](http://www.ibm.com/developerworks/cn/web/1108_zhaifeng_microdata/)
- [微数据 microdata](https://html.spec.whatwg.org/multipage/microdata.html)
- [使用微格式 microformate 来丰富网站语义](http://www.mijia.org/blog/?p=153)
- [HTML5扩展之微数据与丰富网页摘要](http://www.zhangxinxu.com/wordpress/2011/12/html5%E6%89%A9%E5%B1%95-%E5%BE%AE%E6%95%B0%E6%8D%AE-%E4%B8%B0%E5%AF%8C%E7%BD%91%E9%A1%B5%E6%91%98%E8%A6%81/)
- [Microformats vs RDFa vs Microdata](https://blog.foolip.org/2009/08/23/microformats-vs-rdfa-vs-Microdata/)
