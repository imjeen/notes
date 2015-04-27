---
layout: post
title: CSS content counter
date: 2014.11.21
categories: update
---

## CSS content 属性

content 属性与 :before 及 :after 伪元素配合使用，来插入生成内容。
注：content: '\A'; 表示换行

## CSS计数器

如果您指定了元素display:none，则content下的计数器不会产生递增值。
而visibility：hidden 元素不受影响。
CSS计数器的2个属性和1个方法，依次是：

### counter-reset： 

创建或重置一个或多个计数器。
主要作用就是给计数器起个名字。如果可能，顺便告诉下从哪个数字开始计数。
    
    /* 计数器名称是'small-apple' */
    .xxx { counter-reset: small-apple; } 
    /* 计数器名称是'small-apple', 并且默认起始值是2 */
    .xxx { counter-reset: small-apple 2; } 

### counter-increment

递增一个或多个计数器值。表示每次计数的变化值。如果缺省，则使用默认变化值1。
只要有counter-increment，对应的计数器的值就会变化，counter()只是输出而已！

### counter()/counters()

- counter(name)  /* name就是counter-reset的名称 */

- counter(name, style)
    
这里的style参数还有有些名堂的。其支持的关键字值就是list-style-type支持的那些值。作用是，我们递增递减可以不一定是数字，还可以是英文字母，或者罗马文等。

    list-style-type：disc | circle | square | decimal | lower-roman | upper-roman | lower-alpha | upper-alpha | none | armenian | cjk-ideographic | georgian | lower-greek | hebrew | hiragana | hiragana-iroha | katakana | katakana-iroha | lower-latin | upper-latin
    

- counter还支持级联。也就是一个content属性值可以有多个counter()方法。

- counters()方法 嵌套计数,区别于counter()

    counters(name, string); /* MDN上说，要想IE8兼容，这里逗号后面的空格要去掉，但是鄙人IE11的IE8模式看，无此问题 */

    其中，string参数为字符串（需要引号包围的）（必须参数），表示子序号的连接字符串。例如1.1的string就是'.', 1-1就是'-'.

- counters()也是支持style自定义递增形式的。
    counters(name, string, style)

## 实现

- 不嵌套的层级DEMO-1
        
        <div class="reset">
            <div class="counter"></div>
            <div class="counter"></div>
            ...
            <div class="counter"></div>
        </div>

        .reset{ counter-reset: step 0;}
        .reset .counter{ content: counter(step); counter-increment: step 1;}

- 嵌套的层级DEMO-2：

    一个容器的reset的唯一的，一旦子元素出现reset，会改变整个容器的嵌套关系。
    如果把计数显示和计数reset元素以兄弟元素形式放在一起（虽然HTML内容布局呈现是没有异常的），就很可能会出现计数序号乱入的情况。
    

        <div class="reset">
            <div class="counter"></div>
            <div class="counter"></div>
            <!-- 正确 -->
            <div class="counter">
                <div class="reset">
                    <div class="counter"></div>
                    <div class="counter"></div>
                </div>
            </div>
            <div class="counter"></div>
            <!-- 错误：计数显示元素和计数reset元素为兄弟关系 -->
            <div class="reset">
                <div class="counter"></div>
                <div class="counter"></div>
            </div>
            <div class="counter"></div>
            ...
            <div class="counter"></div>
        </div>
        
        .reset{ counter-reset: step 0;}
        .reset .counter{ content: counter(step); counter-increment: step 1;}



## 参考
1. [CSS计数器(序列数字字符自动递增)详解](http://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/) 、[CSS content内容生成技术以及应用](http://www.zhangxinxu.com/wordpress/2010/04/css-content%E5%86%85%E5%AE%B9%E7%94%9F%E6%88%90%E6%8A%80%E6%9C%AF%E4%BB%A5%E5%8F%8A%E5%BA%94%E7%94%A8/)
2. [MDN: Using CSS counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters)