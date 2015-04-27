---
layout: post
title: javascript DOM Events
date: 2014.11.22
categories: update
---

## 概述

DOM定义了一些事件，允许开发者指定它们的回调函数。

指定回调事件的方法有三种。

- （1）HTML属性定义
- （2）Element对象的事件属性
- （3）addEventListener方法，removeEventListener方法
    IE 8及以下版本不支持该方法。
    与addEventListener配套的，还有一个removeEventListener方法，用来移除某一类事件的回调函数。
上面三种方法之中，第一种违反了HTML与JavaScript代码相分离的原则，不建议使用；第二种的缺点是，同一个事件只能定义一个回调函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次；第三种是推荐使用的方法，不仅可以多个回调函数，而且可以统一接口。

## 事件的传播

### 传播的三个阶段

当一个事件发生以后，它会在不同的DOM对象之间传播（propagation）。这种传播分成三个阶段：

- 第一阶段：从文档的根元素（html元素）传导到目标元素，称为“捕获阶段”（capture phase）。
- 第二阶段：在目标元素上触发，称为“目标阶段”（target phase）。
- 第三阶段：从目标元素传导回文档的根元素（html元素），称为“冒泡阶段”（bubbling phase）。

### 事件的代理

由于事件会在冒泡阶段向上传播到父元素，因此可以把子元素的回调函数定义在父元素上，由父元素的回调函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

- event.stopPropagation(); // 阻止事件冒泡到父级元素
- event.stopImmediatePropagation(); // 阻止元素上的其他click事件

## 事件的类型

### 用户界面事件

（1）load事件，error事件

如果加载成功就触发load事件，如果加载失败就触发error事件。
error事件有一个特殊的性质，就是不会冒泡。这样的设计是正确的，防止引发父元素的error事件回调函数。

（2）unload事件

该事件在卸载某个资源时触发。

 (3）beforeunload事件

该事件在用户关闭网页时触发。它可以用来防止用户不当心关闭网页。

(4）resize事件

改变浏览器窗口大小时会触发resize事件。能够触发它的元素包括window、body、frameset。

（5）abort事件

资源在加载成功前停止加载时触发该事件，主要发生在element、XMLHttpRequest、XMLHttpRequestUpload对象。

（6）scroll事件

用户滚动窗口或某个元素时触发该事件，主要发生在element、document、window对象。

（7）contextmenu事件

用户鼠标右击某个元素时触发，主要发生在element对象。


### 焦点事件 

事件名称    |    涵义    | 事件的目标
------------|------------|------------|
blur        | 元素丧失焦点  |  Element（除了body和frameset元素），Document
focus       | 元素获得焦点  |  Element（除了body和frameset元素），Document
focusin     | 元素即将获得焦点，在focus之前触发   |  Element
focusout    | 元素即将丧失焦点，在blur之前触发    |  Element

### 表单事件

（1）change事件: 一些特定的表单元素（比如文本框和输入框）失去焦点、并且值发生变化时触发。

（2）reset事件: 表单重置（reset）时触发。

（3）submit事件: 表单提交（submit）时触发。

（4）select事件: 用户在文本框或输入框中选中文本时触发。

### 鼠标事件

（1）click事件

用户在网页元素（element、document、window对象）上，单击鼠标（或者按下回车键）时触发click事件。

鼠标单击”定义为在同一个位置完成一次mousedown动作和mouseup动作。它们的触发顺序是：mousedown首先触发，mouseup接着触发，click最后触发。

(2）dblclick事件

用户在element、document、window对象上用鼠标双击时触发。该事件会在mousedown、mouseup、click之后触发。

（3）mousedown事件

用户按下鼠标按钮时触发。

（4）mouseup事件: 用户放开鼠标按钮时触发。

（5）mouseenter事件

鼠标进入某个HTML元素或它的子元素时触发。该事件与mouseover事件相似，区别在于mouseenter事件不会冒泡，而且当鼠标移出子元素的边界、当仍在父元素之中时，它不会在父元素上触发。

（6）mouseleave事件

鼠标移出某个HTML元素以及它的所有子元素时触发。该事件与mouseout事件类似，区别在于mouseleave事件不会冒泡，而且要等到鼠标离开该元素本身和它的所有子元素时才触发。

（7）mousemove事件

鼠标在某个元素上方移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的回调函数做一些限定，比如限定一段时间内只能运行一次代码。

（8）mouseout事件

鼠标移出某个HTML元素时触发。它与mouseleave事件类似，区别在于mouseout事件会冒泡，而且它会在从该元素移入某个子元素时触发。

（9）mouseover事件: 鼠标在某个元素上方时触发。

（10）wheel事件: 用户滚动鼠标的滚轮时触发。

### 键盘事件

1）keydown事件

用户按下某个键时触发。它的触发时间早于系统输入法接收到用户的动作。键盘上的任何键都可以触发该事件。

（2）keypress事件: 用户按下能够输入字符的键时触发。

（3）keyup事件: 用户松开某个键时触发。它总是发生在相应的keydown和keypress事件之后。

### 触摸事件

（1）touchstart事件:   用户开始触摸时触发。

（2）touchend事件:     用户结束触摸时触发。

（3）touchmove事件:    用户在触摸设备表面移动时触发。

（4）touchenter事件:   触摸点进入设定在DOM上的互动区域时触发。

（5）toucheleave事件:  触摸点离开设定在DOM上的互动区域时触发。

（6）touchcancel事件:  触摸因为某些原因被中断时触发。

### window、body、frame对象的特有事件

（1）beforeprint，afterprint: beforeprint事件在文档打印或打印预览前触发，afterprint事件在之后触发。

（2）beforeunload: 文档关闭前触发。

（3）hashchange: URL的hash部分发生变化时触发。

（4）messsage: message事件在一个worker子线程通过postMessage方法发来消息时触发，详见《Web Worker》一节。

（5）offline，online: offline事件在浏览器离线时触发，online事件在浏览器重新连线时触发。

（6）pageshow，pagehide

默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会缓存中加载页面。pageshow事件在每次网页从缓存加载时触发，这种情况下load事件不会触发，因为网页在缓存中的样子通常是load事件的回调函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的JavaScript脚本也不会执行。

如果网页是第一次加载（即不在缓存中），那么首先会触发load事件，然后再触发pageshow事件。也就是说，pageshow事件是每次网页加载都会运行的。pageshow事件的event对象有一个persisted属性，返回一个布尔值。如果是第一次加载，这个值为false；如果是从缓存中加载，这个值为true。

### document对象的特有事件

（1）readystatechange

readystatechange事件在readyState属性发生变化时触发。它的发生对象是document和XMLHttpRequest对象。

（2）DOMContentLoaded

DOMContentLoaded事件在网页解析完成时触发，此时各种外部资源（resource）还没有被完全下载。

拖拉事件
（1）drag: drag事件在源对象被拖拉过程中触发。

（2）dragstart，dragend: dragstart事件在用户开始用鼠标拖拉某个对象时触发，dragend事件在结束拖拉时触发。

（3）dragenter，dragleave

dragenter事件在源对象拖拉进目标对象后，在目标对象上触发。dragleave事件在源对象离开目标对象后，在目标对象上触发。

（4）dragover事件: dragover事件在源对象拖拉过另一个对象上方时，在后者上触发。

（5）drop事件: 当源对象被拖拉到目标对象上方，用户松开鼠标时，在目标对象上触发drop事件。

### CSS事件 

1）transitionEnd事件: CSS变动的过渡（transition）结束后，触发该事件。

    div.addEventListener('webkitTransitionEnd', onTransitionEnd);
    div.addEventListener('mozTransitionEnd', onTransitionEnd);
    div.addEventListener('msTransitionEnd', onTransitionEnd);
    div.addEventListener('transitionEnd', onTransitionEnd);
    
    function onTransitionEnd() {
      console.log('Transition end');
    }

目前，该事件需要添加浏览器前缀。另外，它与其他CSS事件一样，也存在向上传播的冒泡阶段。

（2）animationstart事件，animationend事件，animationiteration事件

- animation动画开始时，触发animationstart事件；
- 结束时，触发animationend事件。
- 当CSS动画开始新一轮循环时，就会触发animationiteration事件。

这三个事件的回调函数，接受一个事件对象作为参数。该事件对象除了标准属性以外，还有两个与动画相关的属性。

> animationName：动画的名称。
> 
> elapsedTime：从动画开始播放，到事件发生时所持续的秒数。

## event对象

当事件发生以后，会生成一个事件对象event，在DOM中传递，也被作为参数传给回调函数

### event对象的属性

- type：返回一个字符串，表示事件的名称。
- target：返回一个Element节点，表示事件起源的那个节点。
- currentTarget：返回一个Element节点，表示触发回调函数的那个节点。通常，事件回调函数中的this关键字的指向，与currentTarget是一致的。
- bubbles：返回一个布尔值，表示事件触发时，是否处在“冒泡”阶段。
- cancelable：返回一个布尔值，表示该事件的默认行为是否可以被preventDefault方法阻止。
- defaultPrevented：返回一个布尔值，表示是否已经调用过preventDefault方法。
- isTrusted：返回一个布尔值，表示事件是否可信任，即事件是从设备上触发，还是JavaScript方法模拟的。
- eventPhase：返回一个数字，表示事件目前所处的阶段，0为事件开始从DOM表层向目标元素传播，1为捕获阶段，2为事件到达目标元素，3为冒泡阶段。
- timestamp：返回一个数字，
- keyCode：返回按键对应的ASCII码。
- ctrlKey：返回一个布尔值，表示是否按下ctrl键。
- button：返回一个整数，表示用户按下了鼠标的哪个键。

### click事件

当用户点击以后，event对象会包含以下属性。

> pageX，pageY：点击位置相对于html元素的坐标，单位为CSS像素。
> 
> clientX，clientY：点击位置相对于视口（viewport）的坐标，单位为CSS像素。
> 
> screenX，screenY：点击位置相对于设备显示屏幕的坐标，单位为设备硬件的像素。

### event对象的方法

- event.preventDefault() : 阻止事件所对应的浏览器默认行为。
- event.stopPropagation() : 阻止事件在DOM中继续传播
- event.stopImmediatePropagation() : 该方法的作用与stopPropagation方法相同，唯一的区别是还阻止当前节点上后继定义的事件回调函数。

## 自定义事件

浏览器允许用户通过CustomEvent构造函数，定义自己的事件对象。

    var myEvent = new CustomEvent("myevent", {
      detail: {
        name: "张三"
      },
      bubbles: true,
      cancelable: false
    });

构造函数CustomEvent接受两个参数，第一个是事件名称，第二个是事件的属性对象。

还可以使用document.createEvent方法来生成事件对象。

    var myEvent = document.createEvent('CustomEvent');

    myEvent.initCustomEvent('myevent',true,false,{name:'张三'});

上面两种自定义事件的写法是等价的。但是，IE9只支持第二种写法，不支持第一种写法。

定义事件对象以后，就可以用addEventListener方法为该事件指定回调函数，用dispatchEvent方法触发该事件。

    element.addEventListener('myevent', function(event) {
      console.log('Hello ' + event.detail.name);
    });
    
    element.dispatchEvent(myEvent);

document.createEvent方法除了自定义事件以外，还能触发浏览器的默认事件。比如，模仿并触发click事件的写法如下。

    var simulateDivClick = document.createEvent('MouseEvents');
    
    // initMouseEvent(type,bubbles,cancelable,view,detail,screenx,screeny,clientx,clienty,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget)
    simulateDivClick.initMouseEvent('click',true,true,document.defaultView,0,0,0,0,0,false,false,false,0,null,null);
    
    divElement.dispatchEvent(simulateDivClick);

## 参考
1. [DOM 事件](http://javascript.ruanyifeng.com/dom/event.html)
2. [JavaScript学习总结（九）事件详解](http://segmentfault.com/blog/trigkit4/1190000002174034)
3. [漫谈js自定义事件、DOM/伪DOM自定义事件](http://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)
4. [浅谈事件冒泡与事件捕获](http://segmentfault.com/blog/acwong/1190000000749838#articleHeader5)