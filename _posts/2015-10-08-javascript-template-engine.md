---
layout: post
category : javascript
title: 自定义 javascript 模板引擎
tagline: "原创"
---

## overview

巧妙利用构造函数 `Function` 和 正则表达式，以及replace等方法，实现自定义javascript 模板引擎。其中模板中**interpolate(即<%= %>)** 表示输出值拼接在字符串里，而**evaluate(即<% %>)**表示代码逻辑控制语句。

## Pros and Cons

使用模板有如下好处：

* 简化了html的书写
* 通过编程元素（比如循环和条件分支），对数据的展现更具有控制的能力
* 分离了数据与展现（即MVC中的M和V），使得展现的逻辑和效果更易维护

可能受到的影响：

* with语句和构造函数Function的的使用或多或少会影响性能（不过目前客户端配置也相应被提高）

这可以对比 前端模版渲染 和 后端模版渲染 优缺点。

## 构造函数 Function

定义函数除了使用关键字 `function` 外，还可以使用构造函数 `Function`。Function 构造函数可以接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。

	var function_name = new Function(arg1, arg2, ..., argN, function_body);

不常用是因为这种语法会导致解析两次代码（第一次是解析常规ECMAScript 代码，第二次是解析传入构造函数中的字符串），从而影响性能。

## with语句

with 语句的作用是将代码的作用域设置到一个特定的对象中。

定义with 语句的目的主要是为了简化多次编写同一个对象的工作。，如下面的例子所示：

	var qs = location.search.substring(1);
	var hostName = location.hostname;
	var url = location.href;

上面几行代码都包含location 对象。如果使用with 语句，可以把上面的代码改写成如下所示：

	with(location){
		var qs = search.substring(1);
		var hostName = hostname;
		var url = href;
	}

在这个重写后的例子中，使用with 语句关联了location 对象。这意味着在with 语句的代码块
内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询
location 对象中是否有同名的属性。如果发现了同名属性，则以location 对象属性的值作为变量的值。

（严格模式下不允许使用with 语句，否则将视为语法错误）

## match

* 匹配 **interpolate(即<%= %>)** ： /<%=([\s\S]+?)%>/g
* 匹配 **evaluate(即<% %>)** ： /<%([\s\S]+?)%>/g

由于匹配到 interpolate(即<%= %>) 之前可能先会匹配到 evaluate(即<% %>),故而interpolate(即<%= %>)先匹配替换。

模板文本中可能包含\r \n \u2028 \u2029等字符，这些字符如果出现在代码中，会出错，对此要进行清除或转义。

	//模板文本中的特殊字符转义处理
	var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

以上是 underscorejs 的处理方式。

另外，可以将所有的字符串放到一个数组中然后在结束时将这个数组的元素连接起来。

## example

以下是一个完整的例子，来自John Resig的博客 [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/) 以及他的书 [Secrets of the JavaScript Ninja](https://www.manning.com/books/secrets-of-the-javascript-ninja)第十章描述: 

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed
	(function(){
	  var cache = {};
	 
	  this.tmpl = function tmpl(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ?
	      cache[str] = cache[str] ||
	        tmpl(document.getElementById(str).innerHTML) :
	     
	      // Generate a reusable function that will serve as a template
	      // generator (and which will be cached).
	      new Function("obj",
	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
	       
	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +
	       
	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("<%").join("\t")
	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%>/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%>").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');");
	   
	    // Provide some basic currying to the user
	    return data ? fn( data ) : fn;
	  };
	})();

从以上的精简的代码可以看出，其实这个是 underscorejs的template 的雏形，其实基本使用方式一致。

## more

这样自定义的js模板引擎，当然还有更多的细节需要处理，如：

* 对模板中的多行和单行注释进行清除
* 数据为undefined 或 null 时，输出值应该为空
* 异常的捕获和处理
* 模板需要输出 <% 和 %>字符时，需要进行转义。（一般不会出现此情况，或直接改写成对应的编码）

## other

除了以上思路自定义js模板引擎外，其实还可以匹配js的if，for等关键字，如 [TemplateEngine.js](https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js)：

	module.exports = function(html, options) {
		var re = /<%(.+?)%>/g, 
			reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
			code = 'with(obj) { var r=[];\n', 
			cursor = 0, 
			result;
		var add = function(line, js) {
			js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
				(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		}
		while(match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, '');
		try { result = new Function('obj', code).apply(options, [options]); }
		catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
		return result;
	}


## reference

- [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/)
- [JavaScript template engine in just 20 lines](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line), [译文 - jobole](http://blog.jobbole.com/56689/) 或 [译文 - html-js](http://www.html-js.com/article/Javascript-template-to-write-some-JavaScript-template-engine-with-20-lines-of-JavaScript-code)
- [underscore Tamplate](http://underscorejs.org/docs/underscore.html)