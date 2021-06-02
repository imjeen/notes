---
layout: post
category : javascript
title: gulp or grunt ? 向左向右? 向前看
tagline: "原创"
---


![gulp](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png)
![grunt](http://gruntjs.com/img/grunt-logo.png)

## overview

构建工具从C时代的Make、Java的Ant、Ruby的Rake...，再到现在前端的Grunt和gulp，无疑是时代在不断地变迁和发展。这是一个工具的时代。

> 隐忍和沉寂不是目的，而是手段，它终将爆发在最后那一刻。

## 构建工具能为我们做什么？

对前端资源：HTML文件(以及相应的模板文件，markdown等文件转换)， js文件(包括coffeescript等预编译语言)，css文件(包括CSS, LESS等预编译语言)，图片(包含SVG,png等格式)进行以下常规操作：

- **合并:** 将各个模块（或具有依赖关系）文件依据一定的原则合并(并去重)成一个文件或几个文件，以减少网络资源请求数量。
- **压缩:** 将资源文件去掉注释和空格，压缩成一行，减小文件的物理大小；而对于图片做一定的压缩。
- **混淆:** 将变量和函数的声明序列化，同时对代码优化，这在一定层度上做了一些安全性
- **重命名:**  一般主要用于文件名中加MD5，规避不必要的[静态资源304缓存]((https://github.com/fouber/blog/issues/6))，也用于合并后的重命名结果文件
- **路径替换:** 一般主要用于开发和发布环境，将资源指向不同环境的目录中，开发环境一般都要通过source map映射到源文件调式。

当然可以通过**监听**源文件是否被改动(或被重新保存)，可以执行上面一系列有序的操作命令。还有可能用到模块化的**单元测试**，一般在开发插件或模块中使用到。

## 使用过程

从一个项目到另一个项目，也是构建工具的使用从Grunt转向Gulp的过程。正值Grunt的兴盛和Gulp的崛起。两者又都是基于Node.js环境下的，并各自拥有各自的命令任务文件(配置文件)，局部安装的插件都声明在package.json文件中。它们同样可以完成一样的任务，有许多的相同，又有更多的不同。

### Gulp

Gulp基于nodejs的流[stream](http://nodejs.org/api/stream.html)(借鉴Unix操作系统的管道pipe概念)，在nodejs中都是通过stream来实现文件访问、HTTP链接、输入输出等操作。

在非常方便地对文件进行转换时，就是做着上一个文件的输出便是下一个文件的输入的流操作，在使用Gulp的兴奋之余，就知道很快忙烦就来了，会陷入到“流不兼容”的问题。

#### vinyl 文件对象

- 常规流和Vinyl文件对象有差异
- 仅支持buffer（不支持流）库的gulp插件与常规流不兼容


		var uglify = require('gulp-uglify'),
		    rename = require('gulp-rename');
		gulp.task('bundle', function() {
		    return fs.createReadStream('app.js')
		        .pipe(uglify())
		        .pipe(rename('bundle.min.js'))
		        .pipe(gulp.dest('dist/'));
		});


gulp通过[vinyl-fs](https://github.com/wearefractal/vinyl-fs)的vinyl文件对象(一种“虚拟文件格式”)实现了gulp.src()和gulp.dest()方法。而对于browserify而言，最终文件被转换为一个vinyl流。如果我们需要将gulp和（或）gulp插件与常规的可读流一起使用，我们就需要先把可读流转换为vinyl。可以选择[vinyl-source-stream](https://www.npmjs.org/package/vinyl-source-stream)转换。

	var source = require('vinyl-source-stream'),
	    marked = require('gulp-marked');
	fs.createReadStream('*.md')
	    .pipe(source())
	    .pipe(marked())
	    .pipe(gulp.dest('dist/'));

无论是buffer还是流，vinyl的虚拟文件都能包含在内。

`gulp.src()`会将转换成buffer的vinyl文件对象重新写入到流中。也就是说，你获得的不再是数据碎片，而是将内容转换成buffer后的（虚拟）文件。

`gulp.dest()`方法创建了一个可写流，它真的很方便。它重新使用可读流中的文件名，然后在必要时创建文件夹（使用mkdirp）。在写入操作完成后，你能够继续使用这个流（比如：你需要使用gzip压缩数据并写入到其他文件）


#### gulp 默认使用buffer

有时转换的时候需要文件的全部内容（比如文本替换、正则匹配）

使用转换成buffer的流也有缺点，处理大文件时将非常低效。文件必须完全读取，然后才能被加入到流中。那么问题来了，文件的尺寸多大才会降低性能？对于普通的文本文件，比如JavaScript、CSS、模板等等，这些使用buffer开销非常小。

在任何情况下，如果将buffer选项设为false，你可以告诉gulp流中传递的内容究竟是什么。如下所示：

	gulp.src('/usr/share/dict/words', {buffer: false}).on('data', function(file) {
	    var stream = file.contents;
	    stream.on('data', function(chunk) {
	        console.log('Read %d bytes of data', chunk.length);
	    });
	});

#### 从buffer到流 和 从流到buffer

- 通过[gulp-buffer](https://www.npmjs.com/package/gulp-buffer)来转换成buffer
- 使用[gulp-streamify](https://www.npmjs.com/package/gulp-streamify)或[gulp-stream](https://www.npmjs.com/package/gulp-stream)将一个使用buffer的插件的输出转化为一个可读流

### Grunt

### grunt 配置

gruntfile文件的配置是通过 grunt.initConfig()方法

##### Task Configuration and Targets

	grunt.initConfig({
	  concat: {
	    foo: {
	      // concat task "foo" target options and files go here.
	    },
	    bar: {
	      // concat task "bar" target options and files go here.
	    },
	  },
	  uglify: {
	    bar: {
	      // uglify task "bar" target options and files go here.
	    },
	  },
	});

这里可以像 `grunt concat:foo`和`grunt concat:bar`执行target任务(子任务)，而 像 `grunt concat` 执行task（包含了target）。

##### [options](http://gruntjs.com/configuring-tasks#options)

在每个task中，都有一个`options`属性来重写内部属性，另外task里的每个target都可以有`option`属性，优先级大于task级别。

##### [file](http://gruntjs.com/configuring-tasks#files)

文件格式 src，dest 定义一个文件映射，并且包含`filter`、`expand`等属性，以下是不同的写法：

	// 精简写法
	{
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js',
    }
	// 对象写法
     files: {
      'dest/a.js': ['src/aa.js', 'src/aaa.js'],
      'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
    }
	// 数组写法
	files: [
	  {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
	  {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
	]

grunt通过  node-glob 和 minimatch 实现 [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns): 用字符串匹配一个文件或者文件的编号（被称为“glob”）

- `*` matches any number of characters, but not /
- `?` matches a single character, but not /
- `**` matches any number of characters, including /, as long as it's the only thing in a path part
- `{}` allows for a comma-separated list of "or" expressions
- `!` at the beginning of a pattern will negate the match

创建一个动态的文件对象只需将expand属性设为true。

`expand` Set to `true` to enable the following options:

- `cwd` All `src` matches are relative to (but don't include) this path.
- `src` Pattern(s) to match, relative to the `cwd`.
- `dest` Destination path prefix.
- `ext` Replace any existing extension with this value in generated `dest` paths.
- `extDot` Used to indicate where the period indicating the extension is located. Can take either 'first' (extension begins after the first period in the file name) or `'last'` (extension begins after the last period), and is set by default to `'first'` [Added in 0.4.3]
- `flatten` Remove all path parts from generated `dest` paths.
- `rename` This function is called for each matched `src` file, (after extension renaming and flattening).

看如下例子： 

		files: [
			{
			  expand: true,     // Enable dynamic expansion.
			  cwd: 'lib/',      // Src matches are relative to this path.
			  src: ['**/*.js'], // Actual pattern(s) to match.
			  dest: 'build/',   // Destination path prefix.
			  ext: '.min.js',   // Dest filepaths will have this extension.
			  extDot: 'first'   // Extensions in filenames begin after the first dot
			},
		]

### grunt 插件加载

通过npm安装的插件必须通过`grunt.loadNpmTasks`方法加载

### grunt 创建task

	grunt.registerTask(taskName, [description, ] taskList)

## conclusion

虽然gulp和grunt各自都有丰富的且方便的插件，很多任务以及转换都可轻而易举地完成。但是不是所有的时都需要插件，况且很多插件又依赖于另外的一些npm模块，这不仅增大了复杂度，而且不易维护和上手。

而browserify 文档直接建议使用 自己的 browserify API，不要再使用被拉入黑名单的gulp-browserify(已不再更新)。

当然gulp和grunt提供了一些API，就可以实现一些定制化和动态的任务。

gulp或grunt并不是唯一的选择，可以考虑使用makefile 和 [npm run](http://substack.net/task_automation_with_npm_run) 实现任务自动化，还有shell脚本。

## reference

- node [npm](http://www.npmjs.com)， [npm run](http://substack.net/task_automation_with_npm_run)
- browserify [If you use gulp, you should use the browserify API directly](https://github.com/substack/browserify-handbook#gulp)
- [gulp](http://www.gulpjs.com),  [gulp 	API](https://github.com/gulpjs/gulp/blob/master/docs/API.md), [gulp 中文网](http://www.gulpjs.com.cn/) V.S [grunt](http://gruntjs.com/), [grunt 中文网](http://gruntjs.cn/)
- w3ctech： [Gulp挑战Grunt，背后的哲学](http://www.w3ctech.com/topic/74), [Gulp开发教程（翻译）](http://www.w3ctech.com/topic/134)
- grunt v.s. gulp [Build Wars](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
- [Advanced tips for using gulp.js](https://medium.com/@webprolific/getting-gulpy-a2010c13d3d5), 翻译[Gulp思维 —— Gulp高级技巧](http://lingyu.wang/#/post/2014/10/7/getting-gulpy)

