---
layout: post
category : comprehensive
title: shell 脚本和自动部署 - 前奏曲
tagline: "原创"
---

> Where there is a shell，there is a way!

## What

[shell](https://zh.wikipedia.org/wiki/Unix_shell), 一个广义的解释就是在用户与操作系统之间，提供一个工具或接口给用户来操作计算机系统；用户在shell中通过输入命令行，按下回车键，shell执行命令后就能返回结果，达到操作计算机的效果。

通过命令`cat /etc/shells`可以查看系统支持哪些shell，而Linux/Unix默认都是使用Bash(Bourne-again Shell)。

1. 命令历史记录： 存放在~/.bash_history文件

	 - 方向键↑和↓来查看
	 - 可以用!!来执行上一条命令
	 - 使用ctrl-r来搜索命令历史记录

2. 命令和文件补全: 按tab键
3. 命令别名: 简化命令输入使用`alias`
4. [工作管理 (job control)](http://vbird.dic.ksu.edu.tw/linux_basic/0440processcontrol.php#background)

	前台(foreground)和后台(background)。前台就是出现提示符让用户操作的环境，而后台就是不能与用户交互的环境，你无法使用 ctrl-c 终止它，可使用 bg/fg 呼叫该任务。

	* 将任务放在后台运行：`command + &`
	* 将任务丢到后台暂停：`ctrl-z`
	* 查看后台所有任务状态：`jobs -l`
	* 将后台的任务拿到前台处理：`fg %jobnumber`
	* 将后台的任务变成运行中：`bg %jobnumber`
	* 管理后台当中的任务：`kill -signal %jobnumber`



## Why

- 重复简单的任务自动化
- 利用管道组合各种可用工具，来创建和定制宏工具
- 比起界面执行操作，输入命令行更加直接和快捷
- 通过ssh来远程操纵Linux/Unix服务器时，都是使用shell而不是用户界面

## How

![Variable & Redirection & Pipe.png](/assets/images/shell.png)

## shell script

shell script是利用shell的功能所编写的一个程序，这个程序使用纯文本文件来保存一些shell的命令，并遵循shell的语法规则，搭配数据重定向、管道和正则表达式等功能来组合各种工具，实现简单重复任务的自动化。


### 环境变量和局部变量

- 查看环境变量env和set(set 还可以查看与shell接口有关的变量)
- 显示`echo $variable`
- 设置`variable=value`和取消`unset`,设置变量的规则

	* 变量名称只能是英文字母和数字，而且首字母不能是数字
	* 等号=两边不能有空格
	* 双引号内的一些特殊字符，可以保持原有的特性; 而单引号'内的一些特殊字符，仅为一般字符，即纯文本
	* 转义字符\
	* 使用$(命令)的方式; 反单引号命令
	* 增加变量的值:　$variable累加
	* 如果变量需要在其他子进程使用，用export关键字来设置变量为环境变量
	* 系统环境变量一般都是字母全部大写，例如：PATH，HOME，SHELL等
	* 如果想取消设置变量的值，使用unset variable命令。注意，变量之前是没有符号$

- 环境配置文件`/etc/profile`(系统整体的设置)和`~/.bash_profile`(单个用户的设置)管道

### 数据重定向

- stdin，表示标准输入，代码为0，使用`<`或`<<`操作符

	* 符号`<`表示以文件内容作为输入
	* 符号`<<`表示输入时的结束符号

- stdout，表示标准输出，代码为1，使用`>`或`>>`操作符

	* 符号`>`表示以覆盖的方式将正确的数据输出到指定文件中
	* 符号`>>`表示以追加的方式将正确的数据输出到指定文件中

- stderr，表示标准错误输出，代码为2，使用`2>`或`2>>`操作符

	* 符号`2>`表示以覆盖的方式将错误的数据输出到指定文件中
	* 符号`2>`>表示以追加的方式将错误的数据输出到指定文件中

### 管道

![How Pipe works](/assets/images/pipe.png)

如果想查看文件是否存在某个关键字，此时可以使用管道

命令`cat README.md | grep 'pod'`的处理过程分为两步：

`cat README.md`查看文件内容
然后将`cat README.md`输出的内容作为`grep 'pod'`命令的输入，再进行处理。
上面一个很关键的符号|，就是管道，它能够将前一个命令处理完的stdout作为下一条命令stdin。

### 通配符

- `*`	表示0到无穷多个任意字符
- `?`	表示有一个任意字符
- `[]`	表示有一个在中括号内的字符。例如[abc]表示有个字符，可能是abc其中一个
- `[-]`	表示在编码顺序内的所有字符。例如[1-7]表示有个字符，范围1到7其中一个
- `[^]`	表示反向选择。例如表示有一个字符，只要不是a,b,c的其他字符都可以

## Resource

- [Shell（一）：功能、配置和插件](http://www.jianshu.com/p/f51b178237c8)
- [Shell（二）：变量、数据重定向和管道](http://www.jianshu.com/p/3687e12b8d48)
