---
layout: post
category : css
title:  再看 background
tagline: "原创"
---

> 众里寻她千百度，蓦然回首，那人却在灯火阑珊处！

## OverView
	
[background][ID_background] 是CSS里其中一个使用频率极高的复合属性。除了简写与默认值，更重要的是它的一些巧妙用法，比如 CSS sprites 和 gradient的运用。来看看background 一般的简写模式为：

	background: url("path/to/image.png") top left no-repeat fixed #000;

等价于：

	background: url("path/to/image.png") top left / cover no-repeat fixed content-box content-box #000

格式就是：

	<bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box> || <'background-color'>

分别是以下属性的简写：

- background-image: none
- background-position: 0% 0%
- background-size: auto auto
- background-repeat: repeat
- background-attachment: scroll
- background-origin: padding-box
- background-clip: border-box
- background-color: transparent

注意：设置多张背景时， 除了background-color外的独立属性，其他都可以在属性列表里分别指定。background-color只能放在最后一个列表里，或者单独显示指定。

## 基础


[background-attachment][ID_background-attachment] 决定背景是在视口中固定的还是跟随包含它的区块滚动的。值:
`scroll | fixed | local`


[background-clip][ID_background-clip] 设置元素的背景（背景图片或颜色）是否延伸到边框。 值:
`border-box | padding-box | content-box`


[background-color][ID_background-color] 会设置元素的背景色。值: 
` <color> | transparent | inherit`

[background-origin][ID_background-origin] 指定背景图片**background-image**属性的原点位置的背景相对区域。值: 
`border-box | padding-box | content-box`

注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。

[background-position][ID_background-position] 指定背景图片的初始位置，参考起点是以**background-origin**而言的，它的值可以是百分比，像素值（包括负值），遵循缺省值的规则。
![position](https://mdn.mozillademos.org/files/12215/position_type.png)

**Note that the position can be set outside of the element's box.**

[background-repeat][ID_background-repeat] 指定背景图片是否以平铺效果重复出现，以及重复的方式。可能值有： `repeat-x | repeat-y | repeat | no-repeat`，遵循缺省值的规则。

[background-size][ID_background-size] 设置背景图片大小

除了默认值auto和声明的大小值，还有两个关键字：

- `cover`：缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。
- `contain`：缩放背景图片以完全装入背景区，可能背景区部分空白。

[background-image][ID_background-image] 指定一个或多个背景图，值`none | url()`。 多个背景图片，即为背景图片的叠加，后面声明的将会别叠在后面。

background-image 上可以指定渐变：

1. [ CSS linear-gradient()][ID_linear-gradient] 函数创建了一个呈现线性渐变颜色。

	当颜色中间点的位置被隐式定义，它被放置在位于它之前的点和位于它之后的点之间的中间位置处。
	利用`<length>`或者`<percentage>`数据类型可以显示定义一个位置。语法：
	`linear-gradient(  [ <angle> | to <side-or-corner> ,]? <color-stop> [, <color-stop>]+ )`

	![linear-gradient](https://mdn.mozillademos.org/files/3537/linear-gradient.png)

	若要实现重复的线性渐变色，可以使用[repeating-linear-gradient][ID_repeating-linear-gradient]: 
	`repeating-linear-gradient(  [ <angle> | to <side-or-corner> ,]? <color-stop> [, <color-stop>]+ )`

2. [CSS radial-gradient()][ID_radial-gradient] 方法用来展示由原点（渐变中心）辐射开的颜色渐变, 边缘形状只能为圆形或者椭圆形。语法：

		radial-gradient( 
			[ circle || <length> ] [ at <position> ]? ,
			| [ ellipse || [<length> | <percentage> ]{2}] [ at <position> ]? ,
			| [ [ circle | ellipse ] || <extent-keyword> ] [ at <position> ]? ,
			| at <position> , <color-stop> [ , <color-stop> ]+ 
		)

	![radial-gradient](https://mdn.mozillademos.org/files/3795/radial%20gradient.png)

	实现重复的径向渐变 [repeating-radial-gradient][ID_repeating-radial-gradient]

		repeating-radial-gradient( 
			[[ circle  || <length> ] [at <position>]? , 
			| [ ellipse || [<length> | <percentage> ]{2}] [at <position>]? , 
			| [[ circle | ellipse ] || <extent-keyword> ] [at <position>]? , 
			| at <position>, <color-stop> [ , <color-stop> ]+
		)


## 技巧

### sprites

雪碧图的使用方式有：

- **百分比**
	
	background-position 百分比计算方式：
	
	- (容器的宽度 - 图片的宽度) * X轴百分数， 超出的部分隐藏
	- (容器的高度 - 图片的高度) * Y轴百分数， 超出的部分隐藏

	关注垂直方向，那么对于一个元素容器和一个垂直排列的sprites 图片，就可以设置元素`backgrond-size: 100% auto;`。
	水平方向同理。

	对于 `background-position: 100% 100%;` 而言，就是表示这里的雪碧图底部边缘啦～ 

- **负向定位**
	
	由于可以通过 `background-postion` 定位到盒子元素的外面，即可以为负值，此时图片沿X轴或Y轴负方向移动相应的大小。

- **svg sprites**

	通过url上的hash值定位到SVG的`<symbol>`标签的id值，也可以显示相应的图片，比起iconfont更容易管理和制作。



### gradient

然而，对于CSS3新秀gradient（线性和径向）来说，完全可以实现图片（png，base64等）的效果。

在background-image设置渐变gradient的同时，再结合 background-size, background-clip, background-repeat 改变一些特性实现。

当然可以设置多背景（前面的背景总是被叠在前面）的渐变 或 重复的渐变。**叠加**的结果总是会出现神奇的效果。

## Other

CSS4 (目前[2016]依然处于起草阶段) 里的圆锥渐变[Conical Gradients](http://lea.verou.me/specs/conical-gradient/1.html)

## Resource

- [gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient): [linear][ID_linear-gradient] and [radial][ID_radial-gradient]
- [background][ID_background], [multiple backgrounds](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Using_CSS_multiple_backgrounds)

[ID_background]: https://developer.mozilla.org/en-US/docs/Web/CSS/background
[ID_background-attachment]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
[ID_background-clip]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
[ID_background-color]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
[ID_background-origin]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin 
[ID_background-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
[ID_background-repeat]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
[ID_background-size]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size

[ID_background-image]:https://developer.mozilla.org/en-US/docs/Web/CSS/background-image

[ID_linear-gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
[ID_repeating-linear-gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient
[ID_radial-gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient
[ID_repeating-radial-gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-radial-gradient
