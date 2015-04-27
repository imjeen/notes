---
layout: post
title: javascript keycodes 键盘键值
date: 2014.11.19
categories: update
permalink: CSS3
---

![keycodes]({{ site.url }}/images/keycodes.png)

- [keyCode 和 ascii keyCode 之分](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html)

    * keypress 对应的是 ascii keyCode
    * keyup/keydown 对应的是 keyCode...
  
keycode是键的虚拟键码，每个键都对应一个唯一的虚拟键码，比如[A]键，在任何情况下，它的keycode都是65。
 
keyascii是键的ASCII码，同一个键在不同情况下会有不同的ASCII码，比如同样的[A]键，在单独按下时是97（即小写a），而在按住shift键再按[A]键或在大写锁定键打开的情况下再按[A]键，则是65（即大写A）。
 
虚拟键码与ASCII码是两种不同的概念，前者是硬件的（或者说是物理的），后者则是偏重于软件上的。

[keyCode 与 charCode](http://blog.sina.com.cn/s/blog_65c2ec5e0101blj6.html)

- 在页面上增加键盘快捷键：

        var inputFocus = false;
        $(':input').blur(function(){ inputFocus = false; });
        $(':input').focus(function(){ inputFocus = true; });
        $(document).keydown(function(e){
             if(!inputFocus){
                  if(e.which == 87 && !e.ctrlKey){
                  //do something
                  return false;
                  }
             }
        });

- Here is the source code for my Konami code function:

        function konami(f,c,r){
            var k = [],
            z = document.attachEvent,
            a = window.addEventListener || z || function() {};
            c = c || [38,38,40,40,37,39,37,39,66,65,13];
            a((z === a ? 'on' : '') + 'keydown', function (e) {
                e = e || window.event || {};
                (k = k.slice(1-c.length)).push(e.which || e.keyCode);
                if(''+k == ''+c) k = [], f(e);
            }, false);
        }

    This function takes two arguments. The first argument is the callback function for when the Konami code is entered correctly. This function receives one argument, the event object of the browser. The second argument is optional, but if used, it must be an array of the key codes required to activate the Konami code, in other words, this allows you to override the activation key sequence. Here’s a real simple example of using this function..

    konami(function (e) {
       alert('You have activated the Konami code.');
    });


## 参考
1. [JavaScript Key Codes](http://shikargar.wordpress.com/2010/10/27/javascript-key-codes/)
2. [javascript keycodes 键盘键值](http://note.rpsh.net/posts/2011/06/08/javascript-keycodes)
3. [为什么 keypress 事件和 keydown/keyup 事件的 keycode 不一样？](http://segmentfault.com/q/1010000000733450)
4. [JavaScript Madness: Keyboard Events](http://unixpapa.com/js/key.html)