---
layout: post
category : comprehensive
title: 前端开发规范 - 小结
tagline: "原创"
---

## overview

遵循规范，并不意味着因循守旧。鼓励个性，也并不代表随心所欲。

遵循项目中共同的规范，能够确保每行代码都像同一个人编写，容易找到错误，同时错误量会减少。而合理的文件组织方式，又易于模块和业务的拓展，模块的依赖关系更加清晰，耦合性变低。这些规范，也是前辈的经验和教训。

## 编码规范

对于编码的规范，主要有 **编码格式(UTF-8)**、 **换行**、**缩减**、**命名规范**和**注释**，以及具体语言的编码风格和规范等。

编码规范和风格，不同团队会有很大不同，但有些也是大家共同遵循的。

* `JavaScript` 编码规范
* `CSS` 编码规范
* `HTML` 编码规范
* `Markdown` 编写规范

为了让编辑器拥有统一的编码规范风格，将 `.editorconfig` 文件放到项目根目录。

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. 


## 项目目录规范

项目中合理的目录组织结构，能够清晰地描述出项目中的框架结构。

对于模块区域的目录划分，可以按照 **类型**和**功能** 组合划分组件模块。
比如:

* `AngularJS` 按类型可以分为 **controller**, **directive**, **filter** 和 **service**等目录; 
* `nodejs` 项目中也会类似以**controller**、**model**、**schemas**、**views**等目录的MVC结构划分。

功能则更多涉及到具体的业务逻辑和页面结构。

除了js文件，其他类型文件CSS，media（包括图片资源）和Markdown等资源也要按照一定的规范划分。

同时，在根目录中也会放入以下文件：

1.  `.gitignore`

	对于git代码管理工具而言，也要用 `.gitignore` 忽略某些文件。

2. `.editorconfig` 

3. `.jshintrc` 

	让你的js文件中错误和潜在问题尽早被发现，项目加入 `.jshintrc` 文件，以及配合构建工具（如gulp）的插件实现。

	关于jshint的具体配置，请参见官方文档[http://www.jshint.com/docs/]

当然有必要 加上 README 和 LICENSE 相关的声明信息。


## conference

以上只是大概总结编码规范，总而言之，能够在具体的项目和语言编码中依据一定的准则，约定成俗，效率会更高更快。具体参见[styleguide](https://github.com/fex-team/styleguide)

## reference

- [EditorConfig](http://editorconfig.org/) 或 [EditorConfig usage](https://github.com/editorconfig/editorconfig/wiki/Plugin-How-To) 
- [开源项目目录规范](https://github.com/fex-team/styleguide/blob/master/project.md)
- [EditorConfig 介绍](http://www.alloyteam.com/2014/12/editor-config/)
- [编码规范](http://codeguide.bootcss.com/)
