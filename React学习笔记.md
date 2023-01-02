# React学习笔记

## jsx语法

### jsx介绍

jsx是嵌入到js中的一种结构语法

书写规范：

- jsx顶层只能有一个根元素
- 通常会在jsx外层包裹一个小括号（） 可以进行换行书写
- jsx中的标签可以是单标签，也可以是双标签 单标签必须以/>结尾

### jsx中的注释

```jsx
<div>
  {/* 我是一段注释 */}
  <h2>Hello World</h2>
</div>
```

### jsx嵌入的数据类型

在{}中可以正常显示的内容

- String
- Number
- Array

不能显示的（忽略）

- null
- undifined
- Boolean

可以转为字符串形式显示

*对象不能作为jsx的子类*（not valid as a React child）

### jsx中嵌入表达式

```jsx
<div>
            {/*1.运算符表达式*/}
            <h2>{firstname + " " + lastname}</h2>
            <h2>{20 * 50}</h2>

            {/*2.三元表达式*/}
            <h2>{isLogin ? "欢迎回来~" : "请先登录~"}</h2>

            {/*3.进行函数调用*/}
            <h2>{this.getFullName()}</h2>
          </div>
```

