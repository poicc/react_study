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

#### 父传子通信-类组件

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

#### 父传子通信-函数式组件

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

#### 子传父通信-函数传递

同样通过属性传递 传递一个函数即可 这个函数也可以带参

```javascript
import React, { Component } from 'react';

class CounterButton extends Component {
  render() {
    const {onClick} = this.props;
    return <button onClick={onClick(1)}>+1</button>
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+</button>
        <CounterButton onClick={index => this.increment()} name="why"/>
      </div>
    )
  }

  increment(index) {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

```

#### 插槽

插槽的实现方式有两种

方式一：通过在组件双标签中直接将插槽的内容写入 引用直接通过this.props.children[]使用 这种情况适用于只有一个插槽的情况

![插槽1](https://p.ipic.vip/7gq1ku.png)

方式二：直接通过属性传递标签 直接使用props

![插槽2](https://p.ipic.vip/5qdbzz.png)

在jsx中使用a标签 href属性值为#会出现警告 可以写成'/#'

#### 跨组件通信

组件层级更多的话，一层层传递是非常麻烦，并且代码是非常冗余的：

- React提供了一个API：Context； 
- Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props； 
- Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言；

##### Context相关api

**React.createContext**

- 创建一个需要共享的Context对象：
- 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配的 Provider 中读取到当前的context值； 
- defaultValue是组件在顶层查找过程中没有找到对应的Provider，那么就使用默认值

```javascript
// 创建Context对象
const UserContext = React.createContext({
  nickname: "aaaa",
  level: -1,
});
```

**Context.Provider**

- 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化：
- Provider 接收一个 value 属性，传递给消费组件；
- 一个 Provider 可以和多个消费组件有对应关系；
- 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据；
- 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染；

```javascript
<UserContext.Provider value={this.state}>
          <Profile />
</UserContext.Provider>
```

**Class.contextType**

- 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象：
- 这能让你使用 this.context 来消费最近 Context 上的那个值； 
- 你可以在任何生命周期中访问到它，包括 render 函数中；

```javascript
ProfileHeader.contextType = UserContext;
```

**Context.Consumer**

- 这里，React 组件也可以订阅到 context 变更。这能让你在 函数式组件 中完成订阅 context。 
- 这里需要 函数作为子元素（function as child）这种做法； 
- 这个函数接收当前的 context 值，返回一个 React 节点；

```javascript
function ProfileHeader() {
  return (
    <UserContext.Consumer>
      {
        value => {
          return (
            <div>
              <h2>用户昵称: {value.nickname}</h2>
              <h2>用户等级: {value.level}</h2>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  )
}
```

### setState

setState({})

#### setState异步更新

下图最终打印结果是Hello World；可见setState是异步的操作，并不能在执行完setState之后立马拿到最新的state的结果

![](https://p.ipic.vip/l2kq2w.jpg)

为什么setState设计为异步？

React核心成员（Redux的作者）Dan Abramov也有对应的回复， https://github.com/facebook/react/issues/11527#issuecomment-360199710； 

- setState设计为异步，可以显著的提升性能；
  - 如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；
  - 最好的办法应该是获取到多个更新，之后进行批量更新； 
- 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步； 
  - state和props不能保持一致性，会在开发中产生很多的问题；

##### 获取异步的结果

方式一：setState的回调

- setState接受两个参数：第二个参数是一个回调函数，这个回调函数会在更新后会执行；
- 格式如下：setState(partialState, callback) 

![](https://p.ipic.vip/3oxsqu.jpg)

方式二：在生命周期函数

![](https://p.ipic.vip/a54ucq.jpg)

#### setState同步更新的情况

![](https://p.ipic.vip/uxz812.png)

#### setState数据合并

setState在进行更新时 若有多个属性，会自动进行合并。 源码中使用了Object.assign({}, prevState, partialState)将原对象和新对象进行了合并

```javascript
this.setState({
      message: "你好啊,李银河"
});
// Object.assign({}, this.state, {message: "你好啊,李银河"})
```

setState本身也有合并

如下效果counter只加了一次1 不会加三次

![](https://p.ipic.vip/czo25v.jpg)

若需要将setState合并时进行累加 就需要给setState传递一个函数

![](https://p.ipic.vip/cgrtb9.jpg)

这是因为第一种情况的prevState始终是初始值 而若给setState传递一个函数 prevState就是上一次+1的操作

### React性能优化

#### React更新机制

react更新流程

![](https://p.ipic.vip/9ylbvc.jpg)

React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树。

React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI： 

- 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的复杂程度为 O(n^3 )，其中 是树中元素的数量； 
- https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf； 
- 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围； 
- 这个开销太过昂贵了，React的更新性能会变得非常低效； 

于是，React对这个算法进行了优化，将其优化成了O(n)，如何优化的呢？

- 同层节点之间相互比较，不会垮节点比较； 
- 不同类型的节点，产生不同的树结构；
- 开发中，可以通过key来指定哪些节点在不同的渲染下保持稳定



**情况一：对比不同类型的元素**

- 当节点为不同的元素，React会拆卸原有的树，并且建立起新的树：

  - 当一个元素从 <a> 变成 <img>，从 <Article> 变成 <Comment>，或从 <Button> 变成 <div> 都会触发一个完整的重建 流程；

  - 当卸载一棵树时，对应的DOM节点也会被销毁，组件实例将执行 componentWillUnmount() 方法； 

  - 当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中，组件实例将执行 componentWillMount() 方法， 紧接着 componentDidMount() 方法； 

- 比如下面的代码更改： 
  - React 会销毁 Counter 组件并且重新装载一个新的组件，而不会对Counter进行复用；

```html
<div>
  <Counter/>
</div>

<span>
  <Counter/>
</span>
```



**情况二：对比同一类型的元素**

当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。

比如下面的代码更改： 

- 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性；

![](https://p.ipic.vip/z64nwt.jpg)

比如下面的代码更改： 

- 当更新 style 属性时，React 仅更新有所更变的属性。
- 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 color 样式，无需修改 fontWeight。 

![](https://p.ipic.vip/w4jcnj.jpg)

如果是同类型的组件元素： 

- 组件会保持不变，React会更新该组件的props，并且调用componentWillReceiveProps() 和 componentWillUpdate() 方法； 
- 下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归；



**情况三：对子节点进行递归**

![](https://p.ipic.vip/hmdtwb.png)

#### keys优化

在遍历列表时，总是会提示一个警告，让我们加入一个key属性：

![](https://p.ipic.vip/9gtllt.jpg)

方式一：在最后位置插入数据

- 这种情况，有无key意义并不大

方式二：在前面插入数据

- 这种做法，在没有key的情况下，所有的li都需要进行修改； 

当子元素(这里的li)拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素： 

- 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改； 
- 将key为333的元素插入到最前面的位置即可；

key的注意事项： 

- key应该是唯一的；
- key不要使用随机数（随机数在下一次render时，会重新生成一个数字）； 
- 使用index作为key，对性能是没有优化的；

#### render函数被重复调用问题

只要是修改了App中的数据，所有的组件都需要重新render，进行diff算 法，性能必然是很低的：

- 事实上，很多的组件没有必须要重新render； 
- 它们调用render应该有一个前提，就是依赖的数据（state、 props）发生改变时，再调用自己的render方法； 

如何来控制render方法是否被调用呢？通过shouldComponentUpdate方法即可；

##### shouldComponentUpdate方法

React给我们提供了一个生命周期方法 shouldComponentUpdate（很多时候，我们简称为SCU），这个方法接受参数，并且需要有返回值： 

该方法有两个参数：

- 参数一：nextProps 修改之后，最新的props属性
- 参数二：nextState 修改之后，最新的state属性

该方法返回值是一个boolean类型 

- 返回值为true，那么就需要调用render方法； 
- 返回值为false，那么久不需要调用render方法； 
- 默认返回的是true，也就是只要state发生改变，就会调用render方法； 

比如我们在App中增加一个message属性：

- jsx中并没有依赖这个message，那么它的改变不应该引起重新渲染； 
- 但是因为render监听到state的改变，就会重新render，所以最后render方法还是被重新调用了；

![](https://p.ipic.vip/7yxqox.png)

##### PureComponent

如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。 

- 我们来设想一下shouldComponentUpdate中的各种判断的目的是什么？ 
- props或者state中的数据是否发生了改变，来决定shouldComponentUpdate返回true或者false； 

事实上React已经考虑到了这一点，所以React已经默认帮我们实现好了，如何实现呢？

- 将class**继承自PureComponent**。

##### 高阶函数memo

若需要在函数式组件中避免render被重复调用，我们需要使用一个高阶组件memo： 

-  我们将之前的Header、Banner、ProductList都通过memo函数进行一层包裹； 
-  Footer没有使用memo函数进行包裹； 
-  最终的效果是，当counter发生改变时，Header、Banner、ProductList的函数不会重新执行，而Footer的函数会被重新执行；

![](https://p.ipic.vip/je6e1h.png)
