---
layout: post
category: node.js
title: "NPM 小技巧"
tagline: "原创"
---

![npm](http://f.cl.ly/items/2f1U2L3P0l1s0o0Y2l2X/npm2.png)

## overview

开发环境基本都是在nodejs的开发环境里，少不了与npm打交道。这里记录了目前经常用到的命令。

## 初始化

	npm init [-f|--force|-y|--yes]
		
初始化时创建 package.json 文件，并有效提示必要或默认的选项。而参数 -f 或者 -y 将仅仅使用默认值且不做提示。

## 依赖包

全局安装参数 -g（- -globle），局部分为依赖（-S 或 - -save）和开发依赖（-D 或 - -save-dev）

* 安装：`$ npm install <pkg>` ， alias: npm i
* 卸载： `npm uninstall <pkg>`, aliases: remove, rm, r, un, unlink
* 更新：`$ npm update [-g] <pkg>`

[package.json](https://docs.npmjs.com/files/package.json) 的json格式声明的字段，可以查看官网对它们的解释。

## 关联	

创建关联 `npm link <pkg>`, alias: npm ln

- 将全局安装的pkg关联到当前目录中
- 将本地的pkg关联到全局中

## 执行命令（脚本）

	npm run-script <command> [-- <args>...]
	alias: npm run

执行任意脚本命令。比如项目中使用**webpack**模块管理工具，声明在scripts字段如下：

	"scripts": {
	  "watch": "webpack --watch",
	  "server": "webpack-dev-server --inline --port 80 --hot --quiet",
	  "build": "webpack --progress --hide-modules"
	}

那么可以执行如下命令与之对应：

* `$npm run watch` # 监听文件
* `$npm run server` # 开启80端口的本地服务
* `$npm run build` # 编译文件
* `NODE_ENV=production npm run build` # 结合webpack 并设置当前控制台的变量值，并执行发布时的编译


## 其他有用的命令 

### 查看已安装的依赖包：npm ls

	npm ls [[<@scope>/]<pkg> ...]
	aliases: list, la, ll


### 查找匹配到已注册过的依赖包： npm s

	npm search [-l|--long] [search terms ...]
	aliases: s, se

### 需求帮助：npm help

	npm help <term> [<terms..>]

## Conclusion

以上的命令完全可以到官网查看到。其中`packapge.json`里字段声明也是经常用到，限于篇幅，且官方解释的很清楚，这里不再累赘。

当然经常遇到的问题是依赖包安装不了，因为外网连接的问题。可以使用 [淘宝 NPM 镜像](http://segmentfault.com/a/1190000000471219), [TAONPM](https://npm.taobao.org/)

另外，win环境下，依赖包删除相当困难，与linux完全不同的文件系统模式，简直天差万别。

bower 偏重纯前端应用, bower 和 npm 的差别在于对模块封装的粒度不同, [bower 和 npm 区别](http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm)：
> npm 主要是提供node_module的依赖支持, 而且是类似maven的dependency tree结构bower 是纯前端库的依赖支持; npm提供nested dependency而且允许多版本共存, bower尽量保持同一个库仅有一个single copy.


npm 更多配置 [npm-completion](https://docs.npmjs.com/cli/completion)


## resource

- [npmjs](https://docs.npmjs.com/)
- [npm tricks](http://www.devthought.com/2012/02/17/npm-tricks/)
- [How can i set NODE_ENV=production in Windows?](http://stackoverflow.com/questions/9249830/how-can-i-set-node-env-production-in-windows)
