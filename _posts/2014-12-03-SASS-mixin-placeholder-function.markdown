---
layout: post
title: SASS - @mixin, % and @function
date: 2014.12.03
category: update
---

## 前提

- SASS变量：$
- 引用父选择器：&
- 直接使用变量名的字符串：#{}
- list: $list: value1, value2,...; 或 $lists: (value1, value2,...),(valueA, valueB,...);
- map: $map: (key1: value1, key2: value2, key3: value3);
- @if
- @while
- @for
- @each: 遍历list或多个list，和 map
- @inlude
- @extend
- @media


- @mixin (使用@include调用)，@content
- % (使用@extend)
- @function, @return

## @mixin

在样式表中，你会见到一些CSS规则声明被重复出现了好多次。你明白这样的代码不好，而且还知道 **Don't Repeat yourself** 这个概念原则。现在使用mixin去改善这样的代码：

### 无参数

    @mixin large-text {
      font: {
        family: Arial;
        size: 20px;
        weight: bold;
      }
      color: #ff0000;
    }

使用 **@include** 调用

    .page-title {
      @include large-text;
      padding: 4px;
      margin-top: 10px;
    }

### 有参数

    @mixin sexy-border($color, $width) {
      border: {
        color: $color;
        width: $width;
        style: dashed;
      }
    }
    
    p { @include sexy-border(blue, 1in); }

给参数设置默认值

     @mixin sexy-border($color, $width: 1in) {
        border: {
            color: $color;
            width: $width;
            style: dashed;
        }
    }
    p { @include sexy-border(blue); }
    h1 { @include sexy-border(blue, 2in); }

调用时可使用键值传参,这样可以增加可读性

    p { @include sexy-border($color: blue); }
    h1 { @include sexy-border($color: blue, $width: 2in); }

### 可变参数

不可知参数的数量时，可使用 参数名+ "..."

    @mixin box-shadow($shadows...) {
      -moz-box-shadow: $shadows;
      -webkit-box-shadow: $shadows;
      box-shadow: $shadows;
    }
    .shadows {
      @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
    }

同时，"..." 也用于调用mixin中

    @mixin colors($text, $background, $border) {
      color: $text;
      background-color: $background;
      border-color: $border;
    }
    $values: #ff0000, #00ff00, #0000ff;
    .primary {
      @include colors($values...);
    }
    $value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
    .secondary {
      @include colors($value-map...);
    }

#### @mixin与@content

@mixin接受一整块样式，接受的样式从@content开始

    //sass style
    //-------------------------------                     
    @mixin max-screen($res){
      @media only screen and ( max-width: $res )
      {
        @content;
      }
    }
    
    @include max-screen(480px) {
      body { color: red }
    }
    
    //css style
    //-------------------------------
    @media only screen and (max-width: 480px) {
      body { color: red }
    } 

## % (占位符)

**如果没有被@extend, % 是不会生成 CSS的**

## @function

>As you can see functions can access any globally defined variables as well as accept arguments just like a mixin. A function may have several statements contained within it, and you must call @return to set the return value of the function.

@function与@mixin，%这两者的第一点不同在于sass本身就有一些内置的函数，方便我们调用，如强大的color函数；其次就是它返回的是一个值，而不是一段css样式代码什么的。
sass本身内置函数的地址为：[sass functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

    $grid-width: 40px;
    $gutter-width: 10px;
    
    @function grid-width($n) {
      @return $n * $grid-width + ($n - 1) * $gutter-width;
    }
    
    #sidebar { width: grid-width(5); }

参数传值与@mixin 类似

## 参考
1. [Sass: Mixin or Placeholder?](http://www.sitepoint.com/sass-mixin-placeholder/) 或 [Sass->什么时候使用Mixins 和 Placeholders](http://segmentfault.com/blog/qethan/1190000000512082)
2. [Using pure Sass functions to make reusable logic more useful](http://thesassway.com/advanced/pure-sass-functions)
3. [sass揭秘之@mixin，%，@function](http://www.w3cplus.com/preprocessor/sass-mixins-function-placeholder.html)