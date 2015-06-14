---
layout: post
title:  " browserify 生成的源码分析"
date:   2015.06.14
---

## 	CommonJS 原理

浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量(module,export,require,global)。

简单实现 moudle 和 export 如下：

{% highlight javascript%}
var module = {
	exports: {}
};


//IIFE (Immediately Invoked Function Expression)
(function(module,exports){
	exports.sum  = function(a,b){ return a+b; };
	exports.diff = function(a,b){ return a-b; };
})(module,module.exports);

// use
var sum  = module.exports.sum,
	diff = module.exports.diff;

console.log(sum(10,2);)  // 12
console.log(diff(10,2)); // 8


{% endhighlight%}


## Browserify

- 以id为键的模块依赖字典 (类数组对象)
- 之前已经载入的定义好的模块的缓存 (默认空对象)
- 入口模块 (数组)

### 模块的依赖字典

得到每个模块的依赖关系，生成一个依赖字典。该模块依赖映射以不重复的数值id为属性名（键），而属性值是一个数组，数组的第一个值为带三个参数的函数（即一个闭包）,函数内部是某个模块的源代码，用一个函数包裹源代码一方面防止作用域污染，另一方面给此作用域传递参数；数组的第二个值为字面量对象，来表明或映射所依赖的模块，不依赖任何其他模块，则为空对象{}.

{% highlight javascript %}
{
 	1: [function (require, module, exports) {
    module.exports = 'DEP';

  }, {}],
  2: [function (require, module, exports) {
    require('./dep');

    module.exports = 'ENTRY';

  }, {"./dep": 1}]
}
{% endhighlight %}

经过 Browserify 预编译 后，生成了一个目标文件。该文件外层有被压缩过的代码片段，以下是经过对该片段进行分解并提取核心部分，包含传入三个参数（映射map，缓存cache，入口entry）。

{% highlight javascript %}
// 依赖模块映射
var map = {
	1: [function(require,module,exports){
		require("./a.js");
		console.log('#1 OK');
	},{'./a.js':2}],
	2: [function(require,module,exports){
		require("./b.js");
		console.log('#2 OK');
	},{'./b.js':3}],
	3: [function(require,module,exports){
		console.log('#3 OK');
	},{}],
};

// 缓存
var cache = {};

// 入口点
var entry = [1];

//--------------------------------------
// IIFE
(function(map,cache,entry){
	
	// require
	function require(index,isouter){

		if(!cache[index]){
			// no canche
			if(!map[index]){
				// and can't find it from map

				// 在依赖树找不到且如果全局环境存在require函数定义
				// 即node的require	
				var outerRequire = typeof require === 'function' && require;
				if(!isouter && outerRequire){ return outerRequire(index,true); }

				if(globalRequire) { return globalRequire(index,true); }

				// var err = new Error("Cannot find module '" + index +"'");
				// throw err;
				
			}

			var module = cache[index] = {
				exports: {}
			};

			map[index][0].call(module.exports,function(url){
				/* require */	
				// the second value of array
				var dep = map[index][1][url];
				dep = dep ? dep : url;
				// console.log("dep: " + dep);
				return require(dep);

			},module,module.exports);

		}
		return cache[index].exports;
	}

	// init
	// 先判断是否 已经有全局函数 require
	var globalRequire = typeof require === 'function' && require;
	for(var i=0; i<entry.length; i++){
		require(entry[i]);
	}

	// 对外提供 require 接口
	return require;

})(map,cache,entry);
//--------------------------------------
{% endhighlight %}



Browserify 是预先将所有模块物理地合并为一个文件。

缺点：

- 文件体积可能较大，需要包含所有 可能依赖 的模块。
- 页面上存在不同的 Browserify 模块（又依赖了相同的底层模块时）会有冗余。

但同时，Browserify 的优点也很明显：

- 减少了请求数。
- 能够将纯粹的 node 模块运行在浏览器端。
- 模块的逻辑只需要遵循一种规范（即 node 规范），编译工具会将其打包为适配各种模块系统的版本，一处编写，四处运行。
- 模块可以拆得足够细小。


## gulp-browserify 

> If you use gulp, you should use the browserify API directly.

## 参考

1. [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html) 
2. [使用 Browserify 组织前端代码](http://xieguanglei.com/post/use-browserify-in-fed/)
3. [gulp-browserify](https://www.npmjs.com/package/gulp-browserify)
4. [browserify introduction](https://github.com/substack/browserify-handbook)

