---
layout: post
title: jQuery validate 插件
date: 2014.11.10
categories: jekyll update
---

## 前言
* 支持ajax校验
* 自定义的扩展，包括自定义校验规则，自定义错误显示的方式

##  校验方式
添加校验的方法总的说有两种：一种写在控件的标签上；另一种写在js脚本中。并且两种方法可混合使用。

### rules 默认校验规则

    ```
    required:true 必须有值，不能为空
    remote:url 可以用于判断用户名等是否已经存在,服务器端输出true,表示验证通过
    minlength:6 最小长度为6
    maxlength:16 最大长度为16
    rangelength:长度范围
    range:[10,20] 数值范围在10-20之间
    email:true 验证邮件
    url:true 验证URL网址
    dateISO:true 验证日期格式'yyyy-mm-dd'
    digits:true 只能为数字
    accept:'gif|jpg' 只接受gif或jpg为后缀的图片。常用于验证文件的扩展名
    equalTo:'#pass' 与哪个表单字段的值相等，常用于验证重复输入密码
    ```

此外，如果其他特殊验证需求，可以扩展,如：

    ```
    jQuery.validator.addMethod("isZipCode", function(value, element) {     
      var zip = /^[0-9]{6}$/;     
      return this.optional(element) || (zip.test(value));     
    }, "请正确填写您的邮政编码!");  
    ```

### message 默认的提示

    ```
    messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        dateDE: "Bitte geben Sie ein g眉ltiges Datum ein.",
        number: "Please enter a valid number.",
        numberDE: "Bitte geben Sie eine Nummer ein.",
        digits: "Please enter only digits",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}.")
    },
    ```

如需要修改，可在js代码中加入：

    ```
    jQuery.extend(jQuery.validator.messages, {
        required: "必选字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为{0} 的值"),
        min: jQuery.validator.format("请输入一个最小为{0} 的值")
    });
    ```

### class=｛｝
使用class="{}"的方式，必须引入包：jquery.metadata.js

可以使用如下的方法，修改提示内容：
class="{required:true,minlength:5,messages:{required:'请输入内容'}}"

在使用equalTo关键字时，后面的内容必须加上引号，如下代码：
class="{required:true,minlength:5,equalTo:'#password'}"

### required

    ```
    required: true 必须有值
    required: "#aa:checked"表达式的值为真，则需要验证
    required: function(){}返回为真，表时需要验证
    后边两种常用于，表单中需要同时填或不填的元素
    ```

### 常用方法及注意问题

#### 1.用其他方式替代默认的SUBMIT

    ```
      $().ready(function() {
       $("#signupForm").validate({
              submitHandler:function(form){
                  alert("submitted");   
                  form.submit();
              }    
          });
      });
    ```

使用ajax方式
 
    $(".selector").validate({     
        submitHandler: function(form){      
            $(form).ajaxSubmit();     
        }  
    }) 

可以设置validate的默认值，写法如下：

    ```
    $.validator.setDefaults({
        submitHandler: function(form) { alert("submitted!");form.submit(); }
    });
    ```

    如果想提交表单, 需要使用form.submit()而不要使用$(form).submit()

#### 2. debug 调试
如果这个参数为true，那么表单不会提交，只进行检查，调试时十分方便。

    ```
    $().ready(function(){
        $("#signupForm").validate({
            debug:true
        });
    });
    ```

如果一个页面中有多个表单都想设置成为debug，用

    ```
    $.validator.setDefaults({
       debug: true
    })
    ```

#### 3. ignore：忽略某些元素不验证
    ignore: ".ignore"
#### 4. 更改错误信息显示的位置
    errorPlacement：Callback

默认（default）都是把错误信息放在验证的元素后面 
指明错误放置的位置，默认情况是：error.appendTo(element.parent());
即把错误信息放在验证的元素后面 

    errorPlacement: function(error, element) {  
        error.appendTo(element.parent());  
    }

#### 5. errorClass：String  （Default: "error"）
指定错误提示的css类名，可以自定义错误提示的样式

#### 6. errorElement：String  Default: "label" 
用什么标签标记错误，默认的是label你可以改成em

#### 7. errorContainer：Selector
显示或者隐藏验证信息，可以自动实现有错误信息出现时把容器属性变为显示，无错误时隐藏，用处不大：errorContainer: "#messageBox1, #messageBox2"

#### 8. errorLabelContainer：Selector
把错误信息统一放在一个容器里面。

#### 9. wrapper：String
用什么标签再把上边的errorELement包起来

一般这三个属性同时使用，实现在一个容器内显示所有错误提示的功能，并且没有信息时自动隐藏

    errorContainer: "div.error",
    errorLabelContainer: $("#signupForm div.error"),
    wrapper: "li"

更改错误信息显示的样式
设置错误提示的样式，可以增加图标显示，在该系统中已经建立了一个validation.css专门用于维护校验文件的样式

#### 10. 每个字段验证通过执行函数
success：String,Callback
要验证的元素通过验证后的动作，如果跟一个字符串，会当做一个css类，也可跟一个函数

    success: function(label) {
        // set &nbsp; as text for IE
        label.html("&nbsp;").addClass("checked");
        //label.addClass("valid").text("Ok!")
    }

添加"valid" 到验证元素, 在CSS中定义的样式<style>label.valid {}</style>
success: "valid"

#### 11. 验证的触发方式修改
下面的虽然是boolean型的，但建议除非要改为false,否则别乱添加。

* onsubmit：Boolean  Default: true 
    提交时验证. 设置唯false就用其他方法去验证
* onfocusout：Boolean  Default: true 
    失去焦点是验证(不包括checkboxes/radio buttons)
* onkeyup：Boolean  Default: true 
    在keyup时验证.
* onclick：Boolean  Default: true 
    在checkboxes 和 radio 点击时验证
* focusInvalid：Boolean  Default: true 
    提交表单后，未通过验证的表单(第一个或提交之前获得焦点的未通过验证的表单)会获得焦点
* focusCleanup：Boolean  Default: false 
    如果是true那么当未通过验证的元素获得焦点时，移除错误提示。避免和 focusInvalid 一起用

#### 11. 重置表单

    ```
     $().ready(function() {
        var validator = $("#signupForm").validate({
            submitHandler:function(form){
                // alert("submitted");   
                form.submit();
            }    
        });
        $("#reset").click(function() {
            validator.resetForm();
        });
    });
    ```

#### 12. 异步验证remote：URL

    ```
    // remote: "check-email.php"
    remote: {
        url: "check-email.php",     //后台处理程序
        type: "post",               //数据发送方式
        dataType: "json",           //接受数据格式   
        data: {                     //要传递的数据
            username: function() {
                return $("#username").val();
            }
        }
    }
    //远程地址只能输出 "true" 或 "false"，不能有其它输出
    ```

#### 13. 添加自定义校验
addMethod：name, method, message
自定义验证方法

      ```
      / 中文字两个字节
      jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
          var length = value.length;
          for(var i = 0; i < value.length; i++){
              if(value.charCodeAt(i) > 127){
                  length++;
              }
          }
          return this.optional(element) || ( length >= param[0] && length <= param[1] );
      }, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));
      ```

    ```
    // 邮政编码验证   
    jQuery.validator.addMethod("isZipCode", function(value, element) {   
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的邮政编码");
    ```

要在additional-methods.js文件中添加或者在jquery.validate.js添加
建议一般写在additional-methods.js文件中

#### 14 radio和checkbox、select的验证

- radio的required表示必须选中一个

      ```
      <input  type="radio" id="gender_male" value="m" name="gender" class="{required:true}" />
      <input  type="radio" id="gender_female" value="f" name="gender"/>
      ```
 

- checkbox的required表示必须选中

      ```
      <input type="checkbox" class="checkbox" id="agree" name="agree" class="{required:true}" />
      ```

- checkbox的minlength表示必须选中的最小个数,maxlength表示最大的选中个数,rangelength:[2,3]表 示选中个数区间

      ```
      <input type="checkbox" class="checkbox" id="spam_email" value="email" name="spam[]" class="{required:true, minlength:2}" />
      <input type="checkbox" class="checkbox" id="spam_phone" value="phone" name="spam[]" />
      <input type="checkbox" class="checkbox" id="spam_mail" value="mail" name="spam[]" />
      ```
 

- select的required表示选中的value不能为空

      ```
      <select id="jungle" name="jungle" title="Please select something!" class="{required:true}">
          <option value=""></option>
          <option value="1">Buga</option>
          <option value="2">Baga</option>
          <option value="3">Oi</option>
      </select>
      ```
 

- select的minlength表示选中的最小个数（可多选的select）,maxlength表示最大的选中个 数,rangelength:[2,3]表示选中个数区间

      ```
      <select id="fruit" name="fruit" title="Please select at least two fruits" class="{required:true, minlength:2}" multiple="multiple">
          <option value="b">Banana</option>
          <option value="a">Apple</option>
          <option value="p">Peach</option>
          <option value="t">Turtle</option>
      </select>
      ```

## 参考
1. [Form validation with jQuery官网](http://jqueryvalidation.org/)
2. [jQuery Validate](http://www.w3cschool.cc/jquery/jquery-plugin-validate.html)
3. [jQuery plugin: Validation 使用说明](http://liaosy.lofter.com/post/21f90f_820cb9)

## 其他plugin
- [使用方式（Usage）](http://niceue.com/validator/) [github](https://github.com/niceue/validator)
