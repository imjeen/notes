---
layout: post
category : javascript
title: 运算符 AND(&&)，OR(||)，NOT(!)
tagline: "原创"
---

## overview

> Logical operators are typically used with Boolean (logical) values. When they are, they return a Boolean value. 
> However, the && and || operators actually return the value of one of the specified operands, so if these operators are used with non-Boolean values, they may return a non-Boolean value.

见惯了AND(`&&`)和OR(`||`)运算符与布尔值的运算，难免会走入一个常犯的知识误区： <del>它们的运算结果一定是布尔值</del>

从MDN开头的描述(上面)来看， AND(`&&`)和OR(`||`) 与 非布尔值运算时，返回的运算结果其实是一个相应的 *非布尔值*。

产生这样重大错误认识的原因是在于思维锁定在if等条件判断里，同时对逻辑运算的本质的不够深的理解。其实有逻辑操作符时，条件表达式的结果最终是要被隐式转换为布尔值。也就是说，经过运算符得到的结果，还应被隐式布尔类型转换。

另一方面，从压缩过的js代码来看，更多地使用了逻辑运算符，来缩减代码字符大小。

## Logical AND (&&)

`expr1 && expr2` : 

- 如果 expr1 能转化成**false**，则返回expr1；否则返回 expr2。
- 在布尔值运算中，expr1和expr2 都为true时，才返回true；否则返回false。  (即第一条的特例)

注： 能转换为false值的有： 0，null，undefine，NaN，空字符('')

## Logical OR (||)

`expr1 || expr2` : 

- 如果 expr1 能转化成**true**，则返回expr1；否则返回 expr2。
- 在布尔值运算中，只要expr1和expr2其中有一个为true，就返回true；否则返回false。(亦即第一条的特例) 

## Logical NOT (!)

`!expr`： 如果expr能够转换为true，则返回false；否则返回true。

一般通过 `!!expr` 强制转换为布尔值。if条件语句中常用到 `!expr`，等价于 expr === false

## precedence

运算符优先级高到低：NOT (!) 》 AND (&&) 》 OR (\|\|)，当然通过较高优先级比如圆括号来组合它们。

## Conversion

由 AND 到 OR： bCondition1 && bCondition2 ====> !(!bCondition1 \|\| !bCondition2)

同理由 OR 到 AND： bCondition1 \|\| bCondition2 ====> !(!bCondition1 && !bCondition2)

NOT间的转换： !! bCondition ====> bCondition 

更多的转换，这里就不再细细详解了。

## reference

- MDN 逻辑操作符[Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
- MDN 运算符优先级[Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
