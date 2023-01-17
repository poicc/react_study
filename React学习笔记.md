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

### jsx绑定属性

- 属性中不能出现js的关键字 比如class要写成className label标签的for属性要写成htmlFor

```jsx
render() {
        const { title, imgUrl, link, active } = this.state;
        return (
          <div>
            {/* 1.绑定普通属性 */}
            <h2 title={title}>我是标题</h2>
            <img src={getSizeImage(imgUrl, 140)} alt="" />
            <a href={link} target="_blank">百度一下</a>

            {/* 2.绑定class */}
            <div className="box title">我是div元素</div>
            <div className={"box title " + (active ? "active" : "")}>我也是div元素</div>
            <label htmlFor=""></label>

            {/* 3.绑定style */}
            <div style={{ color: "red", fontSize: "50px" }}>我是div,绑定style属性</div>
          </div>
        )
      }
    }
```

### jsx绑定事件

- 在使用bind绑定this的时候 可以在构造方法中直接绑定
- 也可以直接使用箭头函数直接定义方法 就不需要传递this 箭头函数会一层层往上找 把箭头函数赋值给变量就是在ES6中给对象增加属性: class fields
- 最好的方式是在点击事件中直接传入一个箭头函数, 在箭头函数中调用需要执行的函数

```javascript
  <script type="text/babel">
    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          message: "你好啊",
          counter: 100
        }

        this.btnClick = this.btnClick.bind(this);
      }

      render() {
        return (
          <div>
            {/* 1.方案一: bind绑定this(显示绑定) */}
            <button onClick={this.btnClick}>按钮1</button>
            <button onClick={this.btnClick}>按钮2</button>
            <button onClick={this.btnClick}>按钮3</button>

            {/* 2.方案二: 定义函数时, 使用箭头函数 */}
            <button onClick={this.increment}>+1</button>

            {/* 2.方案三(推荐): 直接传入一个箭头函数, 在箭头函数中调用需要执行的函数*/}
            <button onClick={() => { this.decrement("why") }}>-1</button>
          </div>
        )
      }

      btnClick() {
        console.log(this.state.message);
      }

      // increment() {
      //   console.log(this.state.counter);
      // }
      // 箭头函数中永远不绑定this
      // ES6中给对象增加属性: class fields
      increment = () => {
        console.log(this.state.counter);
      }

      decrement(name) {
        console.log(this.state.counter, name);
      }
    }

    ReactDOM.render(<App />, document.getElementById("app"));
  </script>
```

传递事件参数

- 通过箭头函数的方式直接传递

```javascript
      render() {
        return (
          <div>
            <ul>
              {
                this.state.movies.map((item, index, arr) => {
                  return (
                    <li className="item"
                      onClick={e => { this.liClick(item, index, e) }}
                      title="li">
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }

      liClick(item, index, event) {
        console.log("li发生了点击", item, index, event);
      }
```

### jsx条件渲染

- 通过if判断 适合逻辑代码很多的情况
- 通过三元运算符
- &&逻辑与运算符 为true时则显示

```jsx
            <button onClick={e => this.loginClick()}>{isLogin ? "退出" : "登录"}</button>

            <hr />

            <h2>{isLogin ? "你好啊, coderwhy" : null}</h2>

            {/* 3.方案三: 逻辑与&& */}
            {/* 逻辑与: 一个条件不成立, 后面的条件都不会进行判断了 */}
            <h2>{isLogin && "你好啊, coderwhy"}</h2>
            {isLogin && <h2>你好啊, coderwhy</h2>}
          </div>
```

实现vue中的v-show效果

```javascript
render() {
        const { isLogin } = this.state;
        const titleDisplayValue = isLogin ? "block" : "none";
        return (
          <div>
            <button onClick={e => this.loginClick()}>{isLogin ? "退出" : "登录"}</button>
            <h2 style={{ display: titleDisplayValue }}>你好啊, coderwhy</h2>
          </div>
        )
      }

      loginClick() {
        this.setState({
          isLogin: !this.state.isLogin
        })
      }
```

### jsx列表渲染

- 最多使用的就是js的map函数
- 过滤数组

```jsx
         <ul>
              {
                this.state.numbers.filter(item => item >= 50).map(item => <li>{item}</li>)
              }
            </ul>
```

- 数组截取

```jsx
            <ul>
              {
                this.state.numbers.slice(0, 4).map(item => {
                  return <li>{item}</li>
                })
              }
            </ul>
```

## jsx本质

jsx仅仅只是React.createElement(compoent,props,...children)函数的语法糖

- 所有的jsx最终都会被转换成React.createElement的函数调用

比如下面两个效果是一样的 message2就是message1通过babel转换的效果

Jsx -> babel -> React.createElement

```jsx
    const message1 = <h2>Hello React</h2>;
    const message2 = React.createElement("h2", null, "Hello React");
```

### createElement三个参数

![createElement三个参数](https://cdn.staticaly.com/gh/poicc/image@main/3541B61A-F325-4437-AC42-753D3C7353A2.39vf5vlswqc0.webp)



可以使用https://babeljs.io/repl将jsx转换为React.createElement

### 虚拟dom的创建过程

通过createElement最终创建出来的是一个ReactElement对象

1. React利用ReactElement对象组成了一个JS的对象树
2. JS的对象树就是虚拟dom(Virtual DOM)

   jsx -> createElement函数 -> ReactElement(对象树) -> ReactDOM.render -> 真实DOM

### 为什么使用虚拟DOM

- 很难跟踪状态发生的改变 不方便针对应用程序进行调试
- 操作真是DOM性能较低



**虚拟DOM帮助我们从命令式编程转到了声明式编程的模式**

**React官方的说法：**Virtual DOM 是一种编程理念。 

- 在这个理念中，UI以一种理想化或者说虚拟化的方式保存在内存中，并且它是一个相对简单的JavaScript对象

- 我们可以通过ReactDOM.render让 虚拟DOM 和 真实DOM同步起来，这个过程中叫做**协调**（Reconciliation）；

这种编程的方式赋予了React声明式的API： 

- 你只需要告诉React希望让UI是什么状态；
- React来确保DOM和这些状态是匹配的；
- 你不需要直接进行DOM操作，只可以从手动更改DOM、属性操作、事件处理中解放出来；



## React脚手架解析

### 三大框架的脚手架

- Vue:vue-cli
- Angular:angular-cli
- React:create-react-app

![](https://p.ipic.vip/7nr47y.png)

创建React项目的脚手架

```bash
$ npm install -g create-react-app
```

创建项目

```bash
$ create-react-app 项目名称
```

创建完成后 进入目录 就可以执行```yarn start```运行项目

### 脚手架项目结构

├── README.md

├── package-lock.json

├── package.json

├── public

│  ├── favicon.ico 图标

│  ├── index.html 项目入口

│  ├── logo192.png 不同尺寸logo 在manifest.json中使用

│  ├── logo512.png 不同尺寸logo 在manifest.json中使用

│  ├── manifest.json 和web app配置相关

│  └── robots.txt 指定搜索引擎可以或者无法爬取哪些文件

└── src

  ├── App.css App组件的样式文件

  ├── App.js App组件的代码文件

  ├── App.test.js 测试用例

  ├── index.css 全局样式

  ├── index.js 整个应用的入口文件

  ├── logo.svg 启动项目时看到的React图标

  ├── reportWebVitals.js 帮助我们写好的注册PWA相关的代码

  └── setupTests.js 测试初始化文件

### 关于PWA

- 全称Progressive Web App 渐进式web应用
- 一个PWA应用首先是一个网页 可以通过Web技术编写出一个网页应用
- 随后添加上App Manifest和service worker来实现PWA的安装和离线等功能
- 这种web存在的形式 称之为web app

#### PWA解决的问题

- 可以添加至主屏幕 点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能 即使用户手机没有网络 依然可以使用一些离线功能
- 实现了消息推送等等一系列类似于native app相关的功能



## React组件化开发

React的组件相对于Vue更加灵活，按照不同的方式可以分为多种类型

- 按组件的定义方式：函数组件、类组件
- 按组件内部是否有状态需要维护：无状态组件、有状态组件
- 按组件的不同指责：展示型组件、容器型组件

### 类组件

- 组件名称必须上大写字母开头（函数组件也是） 默认会被jsx当成组件
- 类组件需要继承自React.Component
- 类组件必须实现render函数

使用class来定义一个组件：

- constructor是可选的 通常在constructor中初始化数据
- this.state中维护的就是组件内部的数据
- render()方法是class组件中唯一必须实现的方法

### 函数式组件

使用function来定义组件

- 没有this对象
- 没有内部状态（hooks）
- 没有生命周期 也会被更新并挂载 但是没有生命周期函数

### render函数的返回值

当render被调用时，会检查this.props和this.state的变化并返回以下类型之一：

- react元素 例如<div/> <MyComponent/>等
- 数组或fragments：使render方法可以返回多个元素
- Portals:可以渲染子节点到不同的DOM子树中
- 字符串或数值类型：在DOM中会被渲染为文本节点
- 布尔类型或null：什么都不渲染

### 组件（类）的生命周期

常用的：

mounting挂载阶段:构造函数->render->react更新dom ->执行compoentDidMount回调函数

updating更新阶段：render->react更新dom ->componetDidUpdate回调函数 新增props、setState()、forceUpdate()都会触发updating

unmounting卸载阶段:compoentWillUnmount回调函数

![组件生命周期](https://p.ipic.vip/ww5988.png)

生命周期图谱：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

包括不常用的：

![生命周期](https://p.ipic.vip/d94ky2.png)

#### 生命周期函数所做的事情

##### constructor

若不初始化state或不进行方法绑定，则不需要实现constructor

constructor通常做两件事情：

- 给this.state赋值对象来初始化内部的state
- 为事件绑定实例(this)

##### compoentDidMount

compoentDidMount（）会在组件挂载后（插入DOM树中）立即调用

- 依赖于DOM的操作可以在这里进行
- 在此处发送网络请求（官方建议）
- 在此处添加一些订阅（会在componentWillUnmount取消订阅）

##### componetDidUpdate

componetDidUpdate()会在更新后立即调用 首次渲染不会执行

- 当组件更新后 可以在此处对DOM进行操作
- 如果对更新前后对props进行了比较 也可以选择在此处进行网络请求（例如 当props未发生变化时则不会执行网络请求）

![三个参数](https://p.ipic.vip/kzjbde.png)

##### compoentWillUnmount

compoentWillUnmount()会在组件卸载及销毁之前直接调用

- 在此方法中执行必要的清理操作 比如清楚timer,取消网络请求或订阅等

### 父子间组件通信

类组件           ：

```javascript
import React, { Component } from 'react';

class ChildCpn extends Component {
  componentDidMount() {
    console.log(this.props, "componentDidMount");
  }

  render() {
    // console.log(this.props, "render");
    const {name, age, height} = this.props;
    return (
      <h2>子组件展示数据: {name + " " + age + " " + height}</h2>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="why" age="18" height="1.88"/>
        <ChildCpn name="kobe" age="40" height="1.98"/>
      </div>
    )
  }
}

```

函数式组件：

```javascript
import React, { Component } from 'react';

function ChildCpn(props) {
  const { name, age, height } = props;

  return (
    <h2>{name + age + height}</h2>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="why" age="18" height="1.88" />
        <ChildCpn name="kobe" age="40" height="1.98" />
      </div>
    )
  }
}

```

#### 参数验证和默认值

react15之后 把参数验证库导入了prop-types

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
function ChildCpn(props) {
  const { name, age, height } = props;
  const { names } = props;

  return (
    <div>
      <h2>{name + age + height}</h2>
      <ul>
        {
          names.map((item, index) => {
            return <li>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

class ChildCpn2 extends Component {
  // es6中的class fields写法
  static propTypes = {

  }

  static defaultProps = {

  }
}

ChildCpn.propTypes = {
  name: PropTypes.string.isRequired, //isRequired为必传
  age: PropTypes.number,
  height: PropTypes.number,
  names: PropTypes.array
}

ChildCpn.defaultProps = {
  name: "why",
  age: 30,
  height: 1.98,
  names: ["aaa", "bbb"]
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="why" age={18} height={1.88} names={["abc", "cba"]}/>
        <ChildCpn name="kobe" age={40} height={1.98} names={["nba", "mba"]}/>
        <ChildCpn/>
      </div>
    )
  }
}

```

