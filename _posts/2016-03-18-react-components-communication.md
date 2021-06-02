---
layout: post
category: react
title:  "React 组件间的通信"
tagline: "原创"
---

> 盈盈一水间，脉脉不得语

## Overview

Angular 和 Vue 都是数据双向绑定的，然后React是单向数据流，这样使组件更清晰和独立。而习惯于类（class）或函数（function）的声明，以及函数式编程思想，显得格外重要。

React组件具有三个阶段的生命周期，即 `Mounting`、`Updating`、`Unmounting`。

对于React的 **Virtual DOM**来说， 组件中的`render()` 返回的仅仅是子组件层级树实例在特定时间的一个描述（即virtual DOM 元素），而只有 **ReactDOM.render()**返回的是组件的 backing instance（被译为支撑实例）。

可以通过特殊的属性 `ref` 绑定到组件的`render()`返回的相应结构上，然后就可以在内部通过`this.refs`获取到该组件的 backing instance。并且可以由this.refs.myInput.getDOMNode() 直接获取到组件的 DOM 节点。

总之，React 的数据流是由父组件单向传递给子组件 `props`，`state`是组件自身的内部数据状态。React遵循单向数据流的机制。

- 组件即是函数（或ES6概念的class说法）声明
- 自上而下渲染

那么，基于这种单向数据流，组件间又是如何进行通信的呢？

## 通信

- 父子关系组件

	- 父组件 => 子组件： 父组件同过props将数据传递给子组件
	- 父组件 <= 子组件： 子组件想要改变父组件数据，则通过父组件传给子组件一个回调函数callback

- 兄弟关系组件
	
	兄弟组件共享父组件的数据，然后通过父组件改变子组件，实质变成了父组件与子组件的关系，不过就是兄弟组件的父组件的数据被兄弟组件共享

然而随着组件的增加，层级关系越来越庞复杂，层级的深度也随着变深。

除了开发过程中尽可能规避这种复杂的关系，使组件（声明式的组件应具有更好的接口，以便更多地被复用）更具独立性外，来看看以下的方式实现组件的通信。但**组件间的通信还是要尽量遵循单向数据流的机制**。

### global event system

声明全局的事件，并通过组件促发事件而改变数据，比如:

 - 在事件中促发`setState`
 - 传递参数，注意javascript的函数的bind方法的使用。

对于某个组件内部而言：

 - componentDidMount()： 绑定事件
 - componentWillUnmount： 解绑事件

既然有全局的事件，所以也无需特别关系组件间是什么关系。

### Context

官网已经声明 Context 是一个比较高级的实验性的特性，在以后可能变动这个API。**慎用**。所以一般的不要使用。

此处省略……具体见 [Context][ID_Context]

## 第三方

为了在React中更加清晰地管理数据（组件间的单向流数据），Facebook提出了Flux架构，而redux则是Flux的一种优化实现。

（react-redux 对redux进行了封装，可以说是对redux的一种定制，让你更加容易地在react中使用redux）

关于redux和flux进一步的学习记录和讨论，将放到后面的文章里。


## Resource

- [Communicate Between Components](http://facebook.github.io/react/tips/communicate-between-components.html)
- [DOM Event Listeners in a Component](http://facebook.github.io/react/tips/dom-event-listeners.html)
- [The Virtual DOM，Component Lifecycle](http://facebook.github.io/react/docs/working-with-the-browser.html)
- [Refs to Components](http://facebook.github.io/react/docs/more-about-refs.html)
- [Context][ID_Context]

[ID_Context]: http://facebook.github.io/react/docs/context.html
