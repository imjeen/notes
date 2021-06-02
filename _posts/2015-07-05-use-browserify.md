---
layout: post
category : javascript
title: 项目中Browserify的使用
tagline: "原创"
---

![browserify](https://camo.githubusercontent.com/e19e230a9371a44a2eeb484b83ff4fcf8c824cf7/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67)

> 黑魔法，白魔法

## overivew

前期主要工作，就是开始部署前端框架，这是从0到1的开始。

适应不断变化的需求并能够满足需求，快速开发和迭代，以及结合后端开始推进进度。这里开始一切从简开始，从技术的选型和模块的划分，到一步步叠加和升级，追求精简，不搞复杂化，易理解，易维护，易发布，以人为本。

需要nodejs(包含npm)环境，同时对CommonJs有一定的理解。当然browserify 核心源码的解析也至关重要，只有懂得其中的真正原理才能更好地运用。使用gulp实现自动任务管理工具。

## browserify

### 原理

不同于 requirejs (AMD) 和 seajs (CMD), browserify没有在浏览器上运行模块加载器，而是进行预编译模块的依赖，同时模块的写法和nodejs一样通过require方法引入其他模块，符合CommonJs规范，所以像nodejs模块一样组织和书写代码，何乐而不为呢？

进过browserify预编译后，生成的文件已经把模块依赖关系定性包装了，从源码分析来看，核心部分未经压缩也就几十行，最初源码见[browser-pack项目的prelude.js](https://github.com/substack/browser-pack/blob/master/prelude.js)；进一步查看可以知道每个模块其实被一个匿名函数包裹，并传入三个参数：require函数，module和module.exports 对象，那么不难知道书写每个模块时，用require引入其他模块，用module和module.exports定义模块接口。

require只能传入字符串（即路径），不能传入变量，因为browserify 不能处理这样的变量（从核心代码可知），亦即是静态的。

至于模块如何定义接口？见[exports](https://github.com/substack/browserify-handbook#exports)。或者可以看下面一个简单的示例（见[浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)）：

	var module = {
	  exports: {}
	};

	(function(module, exports) {
	  exports.multiply = function (n) { return n * 1000 };
	}(module, module.exports))

	var f = module.exports.multiply;
	f(5) // 5000 


注意不能直接用 exports 赋值定义接口（想象一下给你一个立即执行函数传入对象，要想真正改变这个外部的对象，那么就不能改变 对象的指针地址，否则无法影响外面的的module变量对象，如上）。

### 模块

模块之间的依赖关系是通过require方法来指定的，browserify编译后会把所有模块放到目标文件中（假定最后只编译成一个文件），生成一个模块依赖映射（对象），以1开始的数字为属性和一个长度为2的数组为值，其中数组的第一个值为匿名函数包裹的模块具体代码，有三个参数require，module和module.exports；数组的第二个值（对象）为该模块require引用其他某些模块的对应的映射位置。

注： 像 require("moduleName") 会在node_module 文件中寻找模块 moduleName


### 入口

browserify 以单入口点开始的，然后进入模块的映射

### transform

当然实际情况比较复杂，诸如全局的jquery等，或者对stream的变换，见browserify的 [list of transforms](https://github.com/substack/node-browserify/wiki/list-of-transforms)

## gulp

gulp 4.0 即将来临，使用gulp比起grunt实在简便多。

browserify 已经抛弃 gulp-browserify 插件，而是直接使用 browserify API 来完成目标。见gulp的具体例子[Fast browserify builds with watchify](https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md)


## automate

gulp 3.9 已经提供内置的gulp.watch 接口，可以简便地实现对文件修改的实时监听。局部安装gulp或browserify时，总是方向win7上总是找不到对应的命令，要么修改本机的环境变量，但这个还不如全局安装工具来得简便些，其他地方也可能用到。不过将全局安装的shell脚本放到该目录就不用全局安装了，(c盘 \AppData\Roaming\npm 目录中)，其实shell脚本已经判断全局和局部变量的啦。将shell脚本git push到远程，团队其他成员就不用全局安装了，确保能正常运行。

当然会区分开发和发布(产品)环境。一般开发环境都模块化开发，尽可能不定义全局变量，减少不必要的冲突，而且要实现sourcemap，便于开发和调试；而发布环境必须对代码合并和压缩，使不出错的情况文件数量更少，文件大小更小。

## Others

当然使用像SASS这样的样式预编译语言，可以轻松地模块化样式；

## conclusion

browserify完全简化了模块的开发流程，减少了开发成本，即不用引入额外的模块加载器，也不用过多地考虑模块之间依赖关系。

能够做到清晰地划分模块，具有层次和结构性。

当如也有缺点：

 - 最后编译的文件体积会变得很大，需要包含所有模块，有时即便不需要
 - 编译后的文件如果不是单个文件，那么文件之间的模块可能出现冗余

所以模块要合理拆分、足够颗粒，结构和依赖关系也应具有层次。

## reference

- github [browserify](https://github.com/substack/node-browserify)
- github [browserify 入门手册](https://github.com/substack/browserify-handbook)
- browserify 核心源码 [browser-pack项目的prelude.js](https://github.com/substack/browser-pack/blob/master/prelude.js)
- [gulp 菜谱](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
