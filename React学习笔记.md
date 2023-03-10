







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

![](https://p.ipic.vip/a8ms1w.png)

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

只要是修改了App中的数据，所有的组件都需要重新render，进行diff算法，性能必然是很低的：

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

### setState不可变数据

state是不可变的 不能脱离setState直接更改state的数据 会影响性能 继承PureComponet时会出现问题

```javascript
// 1.在开发中不要这样来做
    // const newData = {name: "tom", age: 30}
    // this.state.friends.push(newData);
    // this.setState({
    //   friends: this.state.friends
    // });

    // 2.推荐做法
    const newFriends = [...this.state.friends];
    newFriends.push({ name: "tom", age: 30 });
    this.setState({
      friends: newFriends
    })
```

### 全局事件传递

通过Context主要实现的是数据的共享，但是在开发中如果有跨组件之间的事件传递，在React中，我们可以依赖一个使用较多的库 events 来完成对应的操作； 

我们可以通过npm或者yarn来安装events： 

```bash
$ yarn add events
```

events常用的API： 

- 创建EventEmitter对象：eventBus对象；

- ```javascript
  import { EventEmitter } from 'events';
  
  // 事件总线: event bus
  const eventBus = new EventEmitter();
  
  ```

- 发出事件：eventBus.emit("事件名称", 参数列表); 

- 监听事件：eventBus.addListener("事件名称", 监听函数)； 

- 移除事件：eventBus.removeListener("事件名称", 监听函数)；

### refs的使用

在React的开发模式中，通常情况下不需要、也不建议直接操作DOM原生，但是某些特殊的情况，确实需要获取到DOM进行某些操作：

- 管理焦点，文本选择或媒体播放；
- 触发强制动画；
- 集成第三方 DOM 库；

创建refs来获取对应的DOM 目前有三种方式：

1. 方式一：传入字符串（不推荐 官方更新后已删除该用法）
   - 使用时通过 this.refs.传入的字符串格式获取对应的元素；

2. 方式二：传入一个对象
   - 对象是通过 React.createRef() 方式创建出来的；
   - 使用时获取到创建的对象其中有一个current属性就是对应的元素；

3. 方式三：传入一个函数

   - 该函数会在DOM被挂载时进行回调，这个函数会传入一个 元素对象，我们可以自己保存；

   - 使用时，直接拿到之前保存的元素对象即可；

若ref绑定的是一个组件 则可以直接通过ref访问组件的方法

```javascript
export default class App extends PureComponent {

  constructor(props) {
    super(props);

    this.titleRef = createRef();
    this.counterRef = createRef();
    this.titleEl = null;
  }

  render() {
    return (
      <div>
        {/* <h2 ref=字符串/对象/函数>Hello React</h2> */}
        <h2 ref="titleRef">Hello React</h2>
        {/* 目前React推荐的方式 */}
        <h2 ref={this.titleRef}>Hello React</h2>
        <h2 ref={arg => this.titleEl = arg}>Hello React</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <hr/>
        <Counter ref={this.counterRef}/>
        <button onClick={e => this.appBtnClick()}>App按钮</button>
      </div>
    )
  }

  changeText() {
    // 1.使用方式一: 字符串(不推荐, 后续的更新会删除)
    this.refs.titleRef.innerHTML = "Hello Coderwhy";
    // 2.使用方式二: 对象方式
    this.titleRef.current.innerHTML = "Hello JavaScript";
    // 3.使用方式三: 回调函数方式
    this.titleEl.innerHTML = "Hello TypeScript";
  }

  appBtnClick() {
    this.counterRef.current.increment();
  }
}
```

#### ref的类型

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性；
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性；
- **你不能在函数组件上使用 ref 属性**，因为他们没有实例； 

函数式组件是没有实例的，所以无法通过ref获取他们的实例： 

- 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素； 这个时候可以通过 React.forwardRef ，后面学习 hooks 中如何使用ref；

### 受控组件和非受控组件

在React中，HTML表单的处理方式和普通的DOM元素不太一样：表单元素通常会保存在一些内部的state。 

比如下面的HTML表单元素： 

![](https://p.ipic.vip/9ck4ti.jpg)

- 这个处理方式是DOM默认处理HTML表单的行为，在用户点击提交时会提交到某个服务器中，并且刷新页面；
- 在React中，并没有禁止这个行为，它依然是有效的；
- 但是通常情况下会使用JavaScript函数来方便的处理表单提交，同时还可以访问用户填写的表单数据；
- 实现这种效果的标准方式是使用“受控组件”；

#### 受控组件使用

在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。 

而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。 

-  我们将两者结合起来，使React的state成为“唯一数据源”； 
-  渲染表单的 React 组件还控制着用户输入过程中表单发生的操作； 
-  被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”； 

由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。 

由于 handleUsernameChange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新

```javascript
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="username">
            用户: 
            {/* 受控组件 */}
            <input type="text" 
                   id="username" 
                   onChange={e => this.handleChange(e)}
                   value={this.state.username}/>
          </label>
          <input type="submit" value="提交"/>
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
}

```

![](https://p.ipic.vip/zky0qo.png)

**textarea标签**

texteare标签和input比较相似：

**select标签**

select标签的使用也非常简单，只是它不需要通过selected属性来控制哪一个被选中，它可以匹配state的value来选中。

```javascript

          <select name="fruits" 
                  onChange={e => this.handleChange(e)}
                  value={this.state.fruits}>
            <option value="apple">苹果</option>
            <option value="banana">香蕉</option>
            <option value="orange">橘子</option>
          </select>

  handleChange(event) {
    this.setState({
      fruits: event.target.value
    })
  }
```

**处理多个输入**

多处理方式可以像单处理方式那样进行操作，但是需要多个监听方法： 

可以使用ES6的一个语法：计算属性名（Computed property )

![](https://p.ipic.vip/uffx95.png)

#### 非受控组件

React推荐大多数情况下使用 受控组件 来处理表单数据：

- 一个受控组件中，表单数据是由 React 组件来管理的；另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理；

如果要使用非受控组件中的数据，那么我们需要使用 ref 来从DOM节点中获取表单数据。

使用ref来获取input元素； 

- 在非受控组件中通常使用defaultValue来设置默认值； 
- 同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支 持 defaultValue。

### 高阶组件

高阶函数的维基百科定义：至少满足以下条件之一：

- 接受一个或多个函数作为输入； 
- 输出一个函数；

JavaScript中比较常见的filter、map、reduce都是高阶函数。

那么什么是高阶组件呢？

- 高阶组件的英文是 **Higher-Order Components**，简称为 HOC； 
- 官方的定义：**高阶组件是参数为组件，返回值为新组件的函数**； 

我们可以进行如下的解析： 

- 首先， 高阶组件 本身不是一个组件，而是一个**函数**；
- 其次，这个函数的参数是一个组件，返回值也是一个组件；

![image-20230119203550656](/Users/chenrongqi/Library/Application Support/typora-user-images/image-20230119203550656.png)

#### 高阶组件应用

##### props的增强

不修改原有代码的情况下，添加新的props

```javascript
function enhanceRegionProps(WrappedComponent) {
  return props => {
    return <WrappedComponent {...props} region="中国"/>
  }
}
```

利用高阶组件来共享Context

```javascript
function withUser(WrappedComponent) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <WrappedComponent {...props} {...user}/>
          } 
        }
      </UserContext.Consumer>
    )
  }
}
```

##### 登录权限判断

在开发中，我们可能遇到这样的场景： 

- 某些页面是必须用户登录成功才能进行进入； 
- 如果用户没有登录成功，那么直接跳转到登录页面；

这个时候，就可以使用高阶组件来完成鉴权操作：

```
function withAuth(WrappedComponent) {
  const NewCpn = (props) => {
    const { isLogin } = props;
    if (isLogin) {
      return <WrappedComponent {...props} />;
    } else {
      return <LoginPage />;
    }
  };

  NewCpn.displayName = "AuthCpn";

  return NewCpn;
}

const AuthCartPage = withAuth(CartPage);
// 传递属性
<AuthCartPage isLogin={true} />
```

##### 生命周期劫持

可以利用高阶函数来劫持生命周期，在生命周期中完成自己的逻辑

```javascript
function withRenderTime(WrappedComponent) {
  return class extends PureComponent {
    // 即将渲染获取一个时间 beginTime
    UNSAFE_componentWillMount() {
      this.beginTime = Date.now();
    }

    // 渲染完成再获取一个时间 endTime
    componentDidMount() {
      this.endTime = Date.now();
      const interval = this.endTime - this.beginTime;
      console.log(`${WrappedComponent.name}渲染时间: ${interval}`)
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}
```

##### HOC的缺陷

HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难； 

HOC可以劫持props，在不遵守约定的情况下也可能造成冲突；



Hooks的出现，是开创性的，它解决了很多React之前的存在的问题

比如this指向问题、比如hoc的嵌套复杂度问题等等； 



### ref的转发

ref不能应用于函数式组件，因为函数式组件没有实例，所以不能获取到对应的组件对象

但是，在开发中我们可能想要获取函数式组件中某个元素的DOM，这个时候我们应该如何操作呢？

- 方式一：直接传入ref属性（错误的做法）
- 方式二：通过forwardRef高阶函数

forwardRef函数第二个回调参数就是props传递的ref

```javascript
const Profile = forwardRef(function(props, ref) {
  return <p ref={ref}>Profile</p>
})
```

### Portals的使用

某些情况下，我们希望渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素中（默认都是挂载到id为root的DOM元 素上的）。 

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案： 

- 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment； 
- 第二个参数（container）是一个 DOM 元素； 

```
class Modal extends PureComponent {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById("modal")
    )
  }
}
```

通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点：

然而，有时候将子元素插入到 DOM 节点中的不同位置也是有好处的

### fragment

在之前的开发中，我们总是在一个组件中返回内容时包裹一个div元素： 

我们又希望可以不渲染这样一个div应该如何操作呢？使用Fragment

Fragment 允许你将子列表分组，而无需向 DOM 添加额外节点；

React还提供了Fragment的短语法： 

- 它看起来像空标签 <> </>； 
- 但是，如果我们需要在Fragment中添加key，那么就不能使用短语法

### StrictMode

StrictMode 是一个用来突出显示应用程序中潜在问题的工具。 

- 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI； 
- 它为其后代元素触发额外的检查和警告； 
- 严格模式检查仅在开发模式下运行；*它们不会影响生产构建*； 

可以为应用程序的任何部分启用严格模式： 

- 不会对 Header 组件运行严格模式检查； 
- 但是，Home 以及它们的所有后代元素都将进行检查；

```javascript
<Header/>
<StrictMode>
          <Home/>
        </StrictMode>
```

#### 严格模式检查的是什么

1. 识别不安全的生命周期： 

2. 使用过时的ref API 

3. 使用废弃的findDOMNode方法 
   - 在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了

4. 检查意外的副作用 

   - 这个组件的constructor会被调用两次；

   - 这是严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用；

   - 在生产环境中，是不会被调用两次的；

5. 检测过时的context API 

   - 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的；

   - 目前这种方式已经不推荐使用

## React中的样式

### 内联样式

内联样式是官方推荐的一种css样式的写法： 

- style 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串； 
- 并且可以引用state中的状态来设置相关的样式；

内联样式的优点: 

1. 内联样式, 样式之间不会有冲突

2. 可以动态获取当前state中的状态

内联样式的缺点：

1. 写法上都需要使用驼峰标识 

2. 某些样式没有提示

3. 大量的样式, 代码混乱

4. 某些样式无法编写(比如伪类/伪元素) 

所以官方依然是希望内联合适和普通的css来结合编写

### 普通的css

普通的css通常会编写到一个单独的文件，之后再进行引入。 

这样的编写方式和普通的网页开发中编写方式是一致的：

- 如果我们按照普通的网页标准去编写，那么也不会有太大的问题； 
- 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响； 
- 但是普通的css都属于全局的css，样式之间会相互影响； 

这种编写方式最大的问题是样式之间会相互层叠掉；

### CSS modules

css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的。

- 但是，如果在其他项目中使用个，那么我们需要自己来进行配置，比如配置webpack.config.js中的modules: true等。

React的脚手架已经内置了css modules的配置：

- .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss 等,之后就可以引用并且进行使用了；

css modules确实解决了局部作用域的问题，也是很多人喜欢在React中使用的一种方案。

但是这种方案也有自己的缺陷： 

- 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的；
- 所有的className都必须使用{style.className} 的形式来编写；
- 不方便动态来修改某些样式，依然需要使用内联样式的方式； 

如果你觉得上面的缺陷还算OK，那么你在开发中完全可以选择使用css modules来编写，并且也是在React中很受欢迎的一种方式。

### CSS in JS

实际上，官方文档也有提到过CSS in JS这种方案：

- “CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义； 
- *注意此功能并不是 React 的一部分，而是由第三方库提供。* React 对样式如何定义并没有明确态度；

在传统的前端开发中，我们通常会将结构（HTML）、样式（CSS）、逻辑（JavaScript）进行分离。 

- 但是在前面的学习中提到过，React的思想中认为逻辑本身和UI是无法分离的，所以才会有了JSX的语法。 
- 样式呢？样式也是属于UI的一部分； 
- 事实上CSS-in-JS的模式就是一种将样式（CSS）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态；
- 所以React有被人称之为 All in JS； 

当然，这种开发的方式也受到了很多的批评： 

- Stop using CSS in JavaScript for web development
- https://hackernoon.com/stop-using-css-in-javascript-for-web-development-fa32fb873dcc

#### styled-components插件

批评声音虽然有，但是在我们看来很多优秀的CSS-in-JS的库依然非常强大、方便：

- CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修
- 改状态等等；
- 依然CSS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
- 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案；

目前比较流行的CSS-in-JS的库有：

- styled-components
- emotion
- glamorous

目前可以说styled-components依然是社区最流行的CSS-in-JS库

安装styled-components：```yarn add styled-components```

##### 标签模板字符串

ES6中增加了模板字符串的语法，模板字符串还有另外一种用法：标签模板字符串（Tagged Template 

Literals）。 

正常情况下，我们都是通过 函数名() 方式来进行调用的，其实函数还有另外一种调用方式： 

如果我们在调用的时候插入其他的变量： 

- 模板字符串被拆分了；
- 第一个元素是数组，是被模块字符串拆分的字符串组合；
- 后面的元素是一个个模块字符串传入的内容； 

在styled component中，就是通过这种方式来解析模块字符串，最终生成我们想要的样式的

![Snipaste_2023-01-20_21-02-21](/Users/chenrongqi/Desktop/Snipaste_2023-01-20_21-02-21.png)

##### styled的基本使用

styled-components的本质是通过函数的调用，最终创建出一个组件：

- 这个组件会被自动添加上一个不重复的class； 

styled-components会给该class添加相关的样式；

另外，它支持类似于CSS预处理器一样的样式嵌套： 

- 支持直接子代选择器或后代选择器，并且 直接编写样式；
- 可以通过&符号获取当前元素； 
- 直接伪类选择器、伪元素等；

![](https://p.ipic.vip/ce6561.png)

##### props、attrs属性

props可以穿透，props可以被传递给styled组件

- 获取props需要通过${}传入一个插值函数，props会作为该函数的参数； 
- 这种方式可以有效的解决动态样式的问题； 

也可以添加attrs属性

![](https://p.ipic.vip/1mlt22.png)

##### styled高级特性

支持样式继承

![](https://p.ipic.vip/y6ggxn.png)

styled可以设置主题

![](https://p.ipic.vip/wuvieu.png)

## React中Ant Design的使用

### React中添加class

React在JSX给了开发者足够多的灵活性，可以像编写JavaScript代码一样，通过一些逻辑来决定是否添加某些class： 

![](https://p.ipic.vip/lglire.jpg)

这个时候我们可以借助于一个第三方的库：classnames,用于动态添加classnames的一个库

![](https://p.ipic.vip/kn1efl.jpg)

### AntDesign的安装

**使用 npm 或 yarn 安装**

```bash
$ npm install antd –save
```

或

```bash
$ yarn add antd
```

需要在index.js中引入全局的Antd样式：

```
import "antd/dist/antd.css";
```

在App.js中就可以使用一些组件了：

**考虑一个问题：Antd是否会将一些没有用的代码（组件或者逻辑代码）引入，造成包很大呢？**

antd 官网有提到：antd 的 JS 代码默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。

### 使用craco修改默认配置

对主题等相关的高级特性进行配置，需要修改create-react-app 的默认配置。 

可以通过yarn run eject来暴露出来对应的配置信息进行修改； 

 但是对于webpack并不熟悉的人来说，直接修改 CRA 的配置是否会给你的项目带来负担，甚至会增加项目的隐患和不稳定性

所以，在项目开发中是不建议大家直接去修改 CRA 的配置信息的；

那么如何来进行修改默认配置呢？社区目前有两个比较常见的方案： 

- react-app-rewired + customize-cra；（这个是antd早期推荐的方案）
- craco；（目前antd推荐的方案）

#### 使用步骤

第一步：安装craco： yarn add @craco/craco

第二步：修改package.json文件

原本启动时，是通过react-scripts来管理的；

现在启动时，需要通过craco来管理；

```json
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

第三步：在根目录下创建craco.config.js文件用于修改默认配置

```javascript
module.exports = {
// 配置文件
}
```

#### 配置主题

- 按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能：
  - 可以引入 craco-less 来帮助加载 less 样式和修改变量；

- 安装 craco-less： yarn add craco-less

- 修改craco.config.js中的plugins： 
  - 使用modifyVars可以在运行时修改LESS变量；

```javascript
const CracoLessPlugin = require('craco-less');
module.exports = {
plugins: [
{
plugin: CracoLessPlugin,
options: {
lessLoaderOptions: {
lessOptions: {
modifyVars: { '@primary-color': '#1DA57A' },
javascriptEnabled: true,
},
},
},
},
],
}
```

引入antd的样式时，引入antd.less文件： import 'antd/dist/antd.less'

修改后重启 yarn start，如果看到一个绿色的按钮就说明配置成功了。

#### 配置别名

```javascript
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components")
    }
  }
}
```



## React中的动画-react-transition-group

### react-transition-group介绍

React社区提供了react-transition-group用来完成过渡动画。React曾为开发者提供过动画插件 react-addons-css-transition-group，后由社区维护，形成了现在的 react-transition-group。 

这个库可以帮助我们方便的实现组件的 入场 和 离场 动画，使用时需要进行额外的安装：

npm 

```bash
$ npm install react-transition-group --save
```

yarn

```bash
$ yarn add react-transition-group
```

react-transition-group本身非常小，不会为我们应用程序增加过多的负担。

### react-transition-group主要组件

react-transition-group主要包含四个组件：

Transition

- 该组件是一个和平台无关的组件（不一定要结合CSS）；
- 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition； 

CSSTransition

- 在前端开发中，通常使用CSSTransition来完成过渡动画效果

SwitchTransition

- 两个组件显示和隐藏切换时，使用该组件

TransitionGroup

- 将多个动画组件包裹在其中，一般用于列表中元素的动画；

#### CSSTransition

CSSTransition是基于Transition组件构建的：

CSSTransition执行过程中，有三个状态：appear、enter、exit； 

它们有三种状态，需要定义对应的CSS样式：

- 第一类，开始状态：对于的类是-appear、-enter、exit； 
- 第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active； 
- 第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done； 

**CSSTransition常见对应的属性：**

 **in：触发进入或者退出状态**

- 如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉；
- 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class； 

当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；

**classNames：动画class的名称**

决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done； 

**timeout：** 过渡动画的时间

**appear：** 是否在初次进入添加动画（需要和in同时为true） 

**unmountOnExit**：退出后卸载组件

官网：https://reactcommunity.org/react-transition-group/transition

CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作

- onEnter：在进入动画之前被触发；
- onEntering：在应用进入动画时被触发；
- onEntered：在应用进入动画结束后被触发；

#### SwitchTransition

SwitchTransition可以完成两个组件之间切换的炫酷动画：

- 比如我们有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入；
- 这个动画在vue中被称之为 vue transition modes； 
- react-transition-group中使用SwitchTransition来实现该动画；

SwitchTransition中主要有一个属性：mode，有两个值 

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入；



SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；

SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性

#### TransitionGroup

当有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画：

```javascript
<TransitionGroup>
          {
            this.state.names.map((item, index) => {
              return (
                <CSSTransition key={item}
                  timeout={500}
                  classNames="item">
                  <div>
                    {item}
                    <button onClick={e => this.removeItem(index)}>-</button>
                  </div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
```

## Redux

### 纯函数

**js中的纯函数**

函数式编程中有一个概念叫纯函数，JavaScript符合函数式编程的范式，所以也有纯函数的概念；

在React中，纯函数的概念非常重要，学习Redux时也非常重要

**纯函数的维基百科定义：**

在程序设计中，若一个函数符合一下条件，那么这个函数被称为纯函数：

- 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。
- 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

当然上面的定义会过于的晦涩，所以简单总结一下：

- 确定的输入，一定会产生确定的输出；
- 函数在执行过程中，不能产生副作用；

![](https://p.ipic.vip/xhc77a.png)

**React中的纯函数**

为什么纯函数在函数式编程中非常重要呢？

- 因为你可以安心的写和安心的用；
- 你在写的时候保证了函数的纯度，只是但是实现自己的业务逻辑即可，不需要关心传入的内容或者依赖其他的外部变量；
- 你在用的时候，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出；

React中就要求我们无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改：

**所有的React组件都必须像纯函数一样保护它们的props不被更改**



### Redux介绍

- JS的状态容器，提供了可预测的状态管理 用来控制和追踪state
- 还可以和其他界面库一起使用（Vue等）

#### Redux核心理念

##### action

所有数据的变化 需要通过派发（dispatch）action来更新

action是一个JS对象 用来描述这次更新的type和content

#### reducer

- 是一个纯函数
- 作用就是将传入的state和action联系起来 返回一个state

#### 三大原则

- 单一数据源 整个应用的state被存储在一颗object tree中 并且object tree只存储在一个store中
- state是只读的
- 只能使用纯函数来执行修改

### Redux使用

安装redux：

```bash
$ npm install redux --save
或
$ yarn add redux
```

**Redux的使用过程**

1. 创建一个对象，作为我们要保存的状态：

2. 创建Store来存储这个state

- 创建store时必须创建reducer； 
- 我们可以通过 store.getState 来获取当前的state

3. 通过action来修改state

- 通过dispatch来派发action； 
- 通常action中都会有type属性，也可以携带其他的数据； 

4. 修改reducer中的处理代码

- reducer是一个纯函数，不需要直接修改state； 

5. 可以在派发action之前，监听store的变化：

```
// 1.导入redux(不能通过ES6的方式)
// import/export 13.2.0开始支持
// commonjs一种实现 -> nodejs
const redux = require('redux');

const initialState = {
  counter: 0
}

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 }
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 }
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.num }
    case "SUB_NUMBER":
      return { ...state, counter: state.counter - action.num }
    default:
      return state;
  }
}

// store(创建的时候需要传入一个reducer)
const store = redux.createStore(reducer)

// 订阅store的修改
store.subscribe(() => {
  console.log("counter:", store.getState().counter);
})

// actions
const action1 = { type: "INCREMENT" };
const action2 = { type: "DECREMENT" };

const action3 = { type: "ADD_NUMBER", num: 5 };
const action4 = { type: "SUB_NUMBER", num: 12 };

// 派发action
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);

```

#### redux结构划分

将所有的逻辑代码写到一起，当redux变得复杂时代码就难以维护。会对代码进行拆分，将store、reducer、action、constants拆分成一个个文件。

**注意：node中对ES6模块化的支持**

从node v13.2.0开始，node才对ES6模块化提供了支持： 

node v13.2.0之前，需要进行如下操作：

- 在package.json中添加属性： "type": "module"； 
- 在执行命令中添加如下选项：node --experimental-modules src/index.js; 

node v13.2.0之后，只需要进行如下操作：在package.json中添加属性： "type": "module"； 

- 注意：导入文件时，需要跟上.js后缀名；

#### redux使用流程图

![](https://p.ipic.vip/4if3qp.png)

### Redux融入react

#### 自定义connect函数

自定义connect函数简化了在react中每次都需要在compontDidMount和compontWillUnMount中订阅和取消订阅store的操作，在使用时只需要把store和要触发的dispatch函数传入

![image-20230129221016444](/Users/chenrongqi/Library/Application Support/typora-user-images/image-20230129221016444.png)

上面的connect函数有一个很大的缺陷：依赖导入的store

如果将其封装成一个独立的库，需要依赖用于创建的store，应该如何去获取？

正确的做法是提供一个Provider，Provider来自于我们创建的Context，让用户将store传入到value中即可；

**context处理store**



![](https://p.ipic.vip/xli2jv.png)

#### react-redux使用

安装react-redux：```yarn add react-redux```

![](https://p.ipic.vip/zfxabf.png)

#### Redux中异步操作

网络请求可以在class组件的componentDidMount中发送，所以可以有这样的结构： 

![](https://p.ipic.vip/9rtfro.jpg)

上面的流程有一个缺陷：

- 必须将网络请求的异步代码放到组件的生命周期中来完成；

事实上，网络请求到的数据也属于状态管理的一部分，更好的一种方式应该是将其也交给redux来管理；

![](https://p.ipic.vip/4b838d.jpg)

##### redux-thunk

默认情况下的dispatch(action)，action需要是一个JavaScript的对象； 

redux-thunk可以让dispatch(action函数)，action可以是一个函数； 

该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数；

- dispatch函数用于我们之后再次派发action； 
- getState函数考虑到一些操作需要依赖原来的状态，用于可以获取之前的一些状态；



1. 安装redux-thunk```yarn add redux-thunk```

2. 在创建store时传入应用了middleware的enhance函数

- 通过applyMiddleware来结合多个Middleware, 返回一个enhancer； 
- 将enhancer作为第二个参数传入到createStore中；

![](https://p.ipic.vip/xp604i.jpg)

3. 定义返回一个函数的action： 

- 这里不是返回一个对象了，而是一个函数；
- 该函数在dispatch之后会被执行；

![](https://p.ipic.vip/yte9vh.jpg)

### Redux-devtools

redux官网为我们提供了redux-devtools的工具； 利用这个工具，我们可以知道每次状态是如何被修改的，修改前后的状态变化等等；

安装该工具需要两步： 

- 第一步：在对应的浏览器中安装相关的插件（比如Chrome浏览器扩展商店中搜索Redux DevTools即可，其他方法可以参考GitHub）；
- 第二步：在redux中继承devtools的中间件

```js
import { createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer.js';

// composeEnhancers函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;

const store = createStore(reducer, composeEnhancers(storeEnhancer));

export default store;
```

Devtools工具栏如图所示 可以追踪到每一个state的改变

![](https://p.ipic.vip/sqltgf.png)

### Redux-saga

#### generator使用

在JavaScript中编写一个普通的函数，进行调用会立即拿到这个函数的返回结果。

如果将这个函数编写成一个生成器函数。

调用iterator的next函数，会销毁一次迭代器，并且返回一个yield的结果。

```js

    // generator: 生成器
    // 1.普通函数
    // function foo() {
    //   console.log("foo被执行");
    // }

    // foo();
    // 2.生成器函数的定义
    // 生成器函数
    function* foo() {
      console.log("111");
      yield "Hello";
      console.log("222");
      yield "World";
      console.log("333");
      yield "coderwhy";
      console.log("444");
    }

    // iterator: 迭代器
    const result = foo();
    console.log(result);

    // 3.使用迭代器
    // 调用一次next, 就会消耗一次迭代器
    // const res1 = result.next();
    // console.log(res1);
    // const res2 = result.next();
    // console.log(res2);
    // const res3 = result.next();
    // console.log(res3);
    // const res4 =result.next();
    // console.log(res4);

    // 4.生成器函数中代码的执行顺序

    // 5.练习: 定义一个生成器函数, 依次可以生成1~10的数字
    function* generateNumber() {
      for (var i = 1; i <= 10; i++) {
        yield i;
      }
    }

    // const numIt = generateNumber();
    // console.log(numIt.next().value);

    // 6.generator和Promise一起来使用
    function* bar() {
      console.log("1111");
      const result = yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Hello Generator");
        }, 3000);
      });
      console.log(result);
    }

    const it = bar();
    it.next().value.then(res => {
      it.next(res)
    })

      (preValue = 0, item) => { };
    (preState = defaultState, action) => { };

    ["abc", "cba"].reduce((preValue, item) => { }, 0)

```

#### redux-saga使用

redux-saga是另一个比较常用在redux发送异步请求的中间件，它的使用更加的灵活。 

Redux-saga的使用步骤如下

1. 安装redux-saga：```yarn add redux-saga```

2. 集成redux-saga中间件

- 导入创建中间件的函数；
- 通过创建中间件的函数，创建中间件，并且放到applyMiddleware函数中；
- 启动中间件的监听过程，并且传入要监听的saga； 

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import saga from './saga';
import reducer from './reducer.js';

// 应用一些中间件
// 1.引入thunkMiddleware中间件(上面)
// 2.创建sagaMiddleware中间件
const sagaMiddleware = createSagaMiddleware();

const storeEnhancer = applyMiddleware(thunkMiddleware, sagaMiddleware);
const store = createStore(reducer, storeEnhancer);

sagaMiddleware.run(saga);

export default store;
```

3. saga.js文件的编写

- takeEvery：可以传入多个监听的actionType，每一个都可以被执行（对应有一个takeLatest，会取消前面的）
- put：在saga中派发action不再是通过dispatch，而是通过put； 
- all：可以在yield的时候put多个action；

```js
import { takeEvery, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_HOME_MULTIDATA, ADD_NUMBER
} from './constants';
import {
  changeBannersAction,
  changeRecommendAction
} from './actionCreators';

function* fetchHomeMultidata(action) {
  const res = yield axios.get("http://123.207.32.32:8000/home/multidata");
  const banners = res.data.data.banner.list;
  const recommends = res.data.data.recommend.list;
  // yield put(changeBannersAction(banners));
  // yield put(changeRecommendAction(recommends));
  yield all([
    yield put(changeBannersAction(banners)),
    yield put(changeRecommendAction(recommends))
  ])
}

function* mySaga() {
  // takeLatest takeEvery区别:
  // takeLatest: 依次只能监听一个对应的action
  // takeEvery: 每一个都会被执行
  yield all([
    takeLatest(FETCH_HOME_MULTIDATA, fetchHomeMultidata),
    // takeLatest(ADD_NUMBER, fetchHomeMultidata),
  ]);
}

export default mySaga;
```

### 使用Monkey Patching实现中间件

可以利用一个hack一点的技术：Monkey Patching，利用它可以修改原有的程序逻辑；

#### 用Monkey Patching实现日志打印

```js
function patchLogging(store) {
  const next = store.dispatch;
  function dispatchAndLogging(action) {
    console.log("dispatch前---dispatching action:", action);
    next(action);
    console.log("dispatch后---new state:", store.getState());
  }
  // store.dispatch = dispatchAndLogging;

  return dispatchAndLogging;
}
```



#### 用Monkey Patching实现redux-thunk

redux-thunk的作用：

- redux中利用一个中间件redux-thunk可以让dispatch不再只是处理对象，并且可以处理函数；

我们对dispatch进行转换，这个dispatch会判断传入的

```js
function patchThunk(store) {
  const next = store.dispatch;

  function dispatchAndThunk(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState)
    } else {
      next(action);
    }
  }

  // store.dispatch = dispatchAndThunk;
  return dispatchAndThunk;
}
```

#### 合并中间件

单个调用某个函数来合并中间件并不是特别的方便，我们可以封装一个函数来实现所有的中间件合并：

```js
function applyMiddlewares(...middlewares) {
  // const newMiddleware = [...middlewares];
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store);
  })
}

applyMiddlewares(patchLogging, patchThunk);
```

代码的流程：

![](https://p.ipic.vip/ujnt3h.jpg)

### reducer拆分

可以按如下的目录结构 按模块拆分redux

![](https://p.ipic.vip/ibfxjm.jpg)

#### combineReducers函数

目前合并的方式是通过每次调用reducer函数自己来返回一个新的对象。 

redux提供了一个combineReducers函数可以方便的让我们对多个reducer进行合并： 

- 它也是将传入的reducers合并到一个对象中，最终返回一个combination的函数（相当于我们之前的reducer函数了）；
- 在执行combination函数的过程中，它会通过判断前后返回的数据是否相同来决定返回之前的state还是新的state； 
- 新的state会触发订阅者发生对应的刷新，而旧的state可以有效的组织订阅者发生刷新； 

```javascript
const reducer  = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer
})

export default reducer;
```

## 路由

### 前端路由的原理

前端路由是如何做到URL和内容进行映射呢？监听URL的改变。 

URL发生变化，同时不引起页面的刷新有两个办法： 

- 通过URL的hash改变URL； 
- 通过HTML5中的history模式修改URL； 

当监听到URL发生变化时，可以通过自己判断当前的URL，决定到底渲染什么样的内容。

#### URL的hash

URL的hash也就是锚点(#), 本质上是改变window.location的href属性； 

可以通过直接赋值location.hash来改变href, 但是页面不发生刷新；

![](https://p.ipic.vip/mcoy4w.jpg)

注意： 

- hash的优势就是兼容性更好，在老版 IE中都可以运行；
- 但是缺陷是有一个#，显得不像一个真实的路径；

#### HTML5的history

history接口是HTML5新增的, 它有l六种模式改变URL而不刷新页面：

- replaceState：替换原来的路径；
- pushState：使用新的路径；
- popState：路径的回退； 
- go：向前或向后改变路径；
- forward：向前改变路径；
- back：向后改变路径；

![](https://p.ipic.vip/fid0fr.png)

### react-router

目前前端流行的三大框架, 都有自己的路由实现: 

- Angular的ngRouter
- React的react-router
- Vue的vue-router

React Router的版本4开始，路由不再集中在一个包中进行管理了：

- react-router是router的核心部分代码； 
- react-router-dom是用于浏览器的；
- react-router-native是用于原生应用的；

安装react-router： 

安装react-router-dom会自动帮助安装react-router的依赖；```yarn add react-router-dom```

#### react-router基本使用

react-router最主要的API是给我们提供的一些组件：

BrowserRouter或HashRouter

- Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件；
- BrowserRouter使用history模式；
- HashRouter使用hash模式；

Link和NavLink： 

- 通常路径的跳转是使用Link组件，最终会被渲染成a元素； 
- NavLink是在Link基础之上增加了一些样式属性；
- to属性：Link中最重要的属性，用于设置跳转到的路径；

Route： 

- Route用于路径的匹配； 
- path属性：用于设置匹配到的路径；
- component属性：设置匹配到路径后，渲染的组件；
- exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；

```js
import React, { PureComponent } from "react";

import { BrowserRouter, Link, Route, withRouter } from "react-router-dom";

import "./App.css";

import Home from './pages/home'
import About from './pages/about'
import Profile from './pages/profile'


class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/profile">我的</Link>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />

      </div>
    );
  }
}

export default withRouter(App);

```

#### NavLink的使用

需求：**路径选中时，对应的a元素变为红色**

这个时候，要使用NavLink组件来替代Link组件：

- activeStyle：活跃时（匹配时）的样式；
- activeClassName：活跃时添加的class； 
- exact：是否精准匹配； 

但是，在选中about或profile时，第一个也会变成红色： 

- 原因是/路径也匹配到了/about或/profile； 
- 这个时候，可以在第一个NavLink中添加上exact属性； 

默认的activeClassName： 

- 在默认匹配成功时，NavLink就会添加上一个动态的active class； 
- 所以也可以直接编写样式

```js
<NavLink exact to="/" activeClassName="link-active">首页</NavLink>
        <NavLink to="/about" activeClassName="link-active">关于</NavLink>
        <NavLink to="/profile" activeClassName="link-active">我的</NavLink>
```

#### Switch的作用

- 当匹配到某一个路径时，会发现有一些问题；
- 比如/about路径匹配到的同时，/:userid也被匹配到了，并且最后的一个NoMatch组件总是被匹配到；

原因是什么呢？默认情况下，react-router中只要是路径被匹配到的Route对应的组件都会被渲染；

使用了Switch 只要匹配到了第一个，那么后面的就不应该继续匹配了 需要将所有的Route进行包裹

![](https://p.ipic.vip/nc5bw7.jpg)

#### Redirect

Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中：

```javascript
return this.state.isLogin ? (
      <div>
        <h2>User</h2>
        <h2>用户名: coderwhy</h2>
      </div>
    ): <Redirect to="/login"/>
```

#### 手动路由跳转

如何可以获取到history的对象呢？两种方式 

- 方式一：如果该组件是通过路由直接跳转过来的，那么可以直接获取history、location、match对象； 
- 方式二：如果该组件是一个普通渲染的组件，那么不可以直接获取history、location、match对象； 

如果希望在App组件中获取到history对象，必须满足一下两个条件：

- App组件必须包裹在Router组件之内； 
- App组件使用withRouter高阶组件包裹； 

注意：使用withRouter必须被BrowserRouter或HashRouter包裹 所以根组件（App）要想使用 就得在index.js当中最外层就用BrowserRouter或HashRouter包裹

#### 参数传递

**传递参数有三种方式：**

- 动态路由的方式；
- search传递参数；
- Link中to传入对象； 

**动态路由的概念指的是路由中的路径并不会固定：**

- 比如/detail的path对应一个组件Detail； 
- 如果将path在Route匹配时写成/detail/:id，那么 /detail/abc、/detail/123都可以匹配到该Route，并且进行显示； 这个匹配规则，就称之为动态路由；
- 通常情况下，使用动态路由可以为路由传递参数。 

**search传递参数**

```js
<NavLink to={`/detail2?name=why&age=18`} activeClassName="link-active">详情2</NavLink>
```

**Link中to可以直接传入一个对象(推荐)**

```js
        <NavLink to={{
                  pathname: "/detail3",
                  search: "name=abc",
                  state: info
                 }} 
                activeClassName="link-active">
          详情3
        </NavLink>
```

#### react-router-config

将所有的路由配置放到一个地方进行集中管理：可以使用react-router-config来完成； 

安装react-router-config```yarn add react-router-config```

- 配置路由映射的关系数组 

```js
import Home from '../pages/home';
import About, { AboutHisotry, AboutCulture, AboutContact, AboutJoin } from '../pages/about';
import Profile from '../pages/profile';
import User from '../pages/user';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about",
        exact: true,
        component: AboutHisotry
      },
      {
        path: "/about/culture",
        component: AboutCulture
      },
      {
        path: "/about/contact",
        component: AboutContact
      },
      {
        path: "/about/join",
        component: AboutJoin
      },
    ]
  }
]

export default routes;
```

- 使用renderRoutes函数完成配置

```javascript
import { renderRoutes } from 'react-router-config';

{renderRoutes(routes)}
```

- 还提供了一个matchRoutes方法 可以拿到匹配到的route和match信息 第一个参数为匹配的数组 第二个参数为匹配的路径

![](https://p.ipic.vip/c9bxlt.png)

## hooks

### 为什么需要Hook

**Hook** 是 React 16.8 的新增特性，它可以在不编写class的情况下使用state以及其他的React特性（比如生命周期）。

class组件相对于函数式组件有什么优势？比较常见的是下面的优势：

- class组件可以定义自己的state，用来保存组件自己内部的状态；函数式组件不可以，因为函数每次调用都会产生新的临时变量；

- class组件有自己的生命周期，可以在对应的生命周期中完成自己的逻辑；

  - 比如在componentDidMount中发送网络请求，并且该生命周期函数只会执行一次；

  - 函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求；

- class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等；
- 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；

所以，在Hook出现之前，对于上面这些情况通常都会编写class组件。

#### class组件存在的问题

**复杂组件变得难以理解：**

- 我们在最初编写一个class组件时，往往逻辑比较简单，并不会非常复杂。但是随着业务的增多，我们的class组件会变得越来越复杂；
- 比如componentDidMount中，可能就会包含大量的逻辑代码：包括网络请求、一些事件的监听（还需要在componentWillUnmount中移除）；
- 而对于这样的class实际上非常难以拆分：因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度；

**难以理解的class：** 

- 很多人发现学习ES6的class是学习React的一个障碍。
- 比如在class中，我们必须搞清楚this的指向到底是谁，所以需要花很多的精力去学习this； 
- 虽然前端开发人员必须掌握this，但是依然处理起来非常麻烦；

**组件复用状态很难**： 

- 在前面为了一些状态的复用我们需要通过高阶组件或render props； 
- 像我们之前学习的redux中connect或者react-router中的withRouter，这些高阶组件设计的目的就是为了状态的复用；
- 或者类似于Provider、Consumer来共享一些状态，但是多次使用Consumer时，我们的代码就会存在很多嵌套；
- 这些代码让我们不管是编写和设计上来说，都变得非常困难；

#### Hook的出现

Hook的出现，可以解决上面提到的这些问题；

**它可以让我们在不编写class的情况下使用state以及其他的React特性**； 

Hook的使用场景：

- Hook的出现基本可以代替我们之前所有使用class组件的地方（除了一些非常不常用的场景）；
- 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它；
- Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用；

### hook使用 

Hook指的类似于useState、useEffect这样的函数

Hooks是对这类函数的统称；

**计数器案例对比**

可以看到使用hooks之后代码变得非常简洁

![](https://p.ipic.vip/wbw0gs.png)

#### useState

useState来自react，需要从react中导入，它是一个hook； 

参数：初始化值，如果不设置为undefined； 

返回值：数组，包含两个元素； 

- 元素一：当前状态的值（第一调用为初始化值）；
- 元素二：设置状态值的函数；

点击button按钮后，会完成两件事情：

- 调用setCount，设置一个新的值； 
- 组件重新渲染，并且根据新的值返回DOM结构；



Hook 就是 JavaScript 函数，这个函数可以帮助你 钩入（hook into） React State以及生命周期等特性；

但是使用它们会有两个额外的规则： 

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。

##### 认识useState

State Hook的API就是 useState

**useState**会帮助我们定义一个 state变量，useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。 

**useState**接受唯一一个参数，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。

**useState**是一个数组，我们可以通过数组的解构，来完成赋值会非常方便。 

数组的解构学习： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

**为什么叫 useState 而不叫 createState?** 

- “Create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。 
- 在下一次重新渲染时，useState 返回给我们当前的 state。 
- 如果每次都创建新的变量，它就不是 “state”了。
- 这也是 Hook 的名字*总是*以 use 开头的一个原因。

#### Effect Hook

Effect Hook 可以完成一些类似于class中生命周期的功能；

- 事实上，类似于网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用（Side Effects）；
- 所以对于完成这些功能的Hook被称之为 Effect Hook； 

**useEffect的解析：**

- 通过useEffect的Hook，可以告诉React需要在渲染后执行某些操作； 
- useEffect要求我们传入一个回调函数，在React执行完更新DOM操作之后，就会回调这个函数；
- 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个 回调函数；

```js
import React, { useEffect, useState } from 'react'

export default function EffectHookCancelDemo() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("订阅一些事件");

    return () => {
      console.log("取消订阅事件")
    }
  }, []);

  return (
    <div>
      <h2>EffectHookCancelDemo</h2>
      <h2>{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}

```

##### 需要清除Effect

在class组件的编写过程中，某些副作用的代码，我们需要在componentWillUnmount中进行清除：

- 比如我们之前的事件总线或Redux中手动调用subscribe； 
- 都需要在componentWillUnmount有对应的取消订阅； 

Effect Hook通过什么方式来模拟componentWillUnmount呢？ 

- useEffect传入的回调函数A本身可以有一个返回值，这个返回值是另外一个回调函数B：
- type EffectCallback = () => (void | (() => void | undefined));

**为什么要在 effect 中返回一个函数？**

这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数；如此可以将添加和移除订阅的逻辑放在一起； 它们都属于 effect 的一部分； 

**React 何时清除 effect？** 

React 会在组件更新和卸载的时候执行清除操作； 

正如之前学到的，effect 在每次渲染的时候都会执行；

##### 使用多个Effect

使用Hook的其中一个目的就是解决class中生命周期经常将很多的逻辑放在一起的问题：

- 比如网络请求、事件监听、手动修改DOM，这些往往都会放在componentDidMount中；
- 使用Effect Hook，我们可以将它们分离到不同的useEffect中：

**Hook 允许我们按照代码的用途分离它们，** 而不是像生命周期函数那样： 

React 将按照 effect 声明的顺序依次调用组件中的*每一个* effect；

```javascript
  useEffect(() => {
    console.log("修改DOM", count);
  }, [count]);

  useEffect(() => {
    console.log("订阅事件");
  }, []);

  useEffect(() => {
    console.log("网络请求");
  }, []);
```

##### Effect性能优化

默认情况下，useEffect的回调函数会在每次渲染时都重新执行，但是这会导致两个问题：

某些代码我们只是希望执行一次即可，类似于componentDidMount和componentWillUnmount中完成的事情；（比如网络请求、订阅和取消订阅）；

另外，多次执行也会导致一定的性能问题；

我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢？ 

useEffect实际上有两个参数：

- 参数一：执行的回调函数；
- 参数二：该useEffect在哪些state发生变化时，才重新执行；（受谁的影响） 

 如果一个函数我们不希望依赖任何的内容时，也可以传入一个空的数组 []： 

#### useContext

要在组件中使用共享的Context有两种方式：

- 类组件可以通过 类名.contextType = MyContext方式，在类中获取context； 
- 多个Context或者在函数式组件中通过 MyContext.Consumer 方式共享context； 

但是多个Context共享时的方式会存在大量的嵌套： 

- Context Hook允许我们通过Hook来直接获取某个Context的值； 

注意事项：

- 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，并使用最新传递给 MyContext provider 的 context value 值。



#### useReducer

useReducer是useState的一种替代方案：

- 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分； 
- 或者这次修改的state需要依赖之前的state时，也可以使用；

![](https://p.ipic.vip/zaetgq.png)

数据是不会共享的，它们只是使用了相同的counterReducer的函数而已。 

**所以，useReducer只是useState的一种替代品，并不能替代Redux。**

#### useCallback

useCallback实际的目的是为了进行性能的优化。 

如何进行性能的优化呢？ 

- useCallback会返回一个函数的 memoized（记忆的） 值； 
- 在依赖不变的情况下，多次定义的时候，返回的值是相同的；

通常使用useCallback的目的是不希望子组件进行多次渲染，并不是为了函数进行缓存；

```js
import React, {useState, useCallback, memo} from 'react';

/**
 * useCallback在什么时候使用?
 * 场景: 在将一个组件中的函数, 传递给子元素进行回调使用时, 使用useCallback对函数进行处理.
 */
const HYButton = memo((props) => {
  console.log("HYButton重新渲染: " + props.title);
  return <button onClick={props.increment}>HYButton +1</button>
});

export default function CallbackHookDemo02() {
  console.log("CallbackHookDemo02重新渲染");

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const increment1 = () => {
    console.log("执行increment1函数");
    setCount(count + 1);
  }

  const increment2 = useCallback(() => {
    console.log("执行increment2函数");
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>CallbackHookDemo01: {count}</h2>
      {/* <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button> */}
      <HYButton title="btn1" increment={increment1}/>
      <HYButton title="btn2" increment={increment2}/>

      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}

```

#### useMemo

useMemo实际的目的也是为了进行性能的优化。 

如何进行性能的优化呢？ 

- useMemo返回的也是一个 memoized（记忆的） 值； 
- 在依赖不变的情况下，多次定义的时候，返回的值是相同的；

useMemo返回的实际值就是其return的值

```javascript
function calcNumber(count) {
  console.log("calcNumber重新计算");
  let total = 0;
  for (let i = 1; i <= count; i++) {
    total += i;
  }
  return total;
}

  // const total = calcNumber(count);
  const total = useMemo(() => {
    return calcNumber(count);
  }, [count]);

```

#####  useCallback和useMemo的区别

useMemo可以转换为useCallback return一个函数即可

```js
  const increment2 = useCallback(() => {
    console.log("执行increment2函数");
    setCount(count + 1);
  }, [count]);

  const increment3 = useMemo(() => {
    return () => {
      console.log("执行increment2函数");
      setCount(count + 1);
    }
  }, [count]);
```

#### useRef

useRef返回一个ref对象，返回的ref对象再组件的整个生命周期保持不变。

最常用的ref是两种用法：

用法一：引入DOM（或者组件，但是需要是class组件）元素； 

```javascript
onst titleRef = useRef();

  function changeDOM() {
    titleRef.current.innerHTML = "Hello World";
  }

 <input ref={inputRef} type="text"/>
```



用法二：保存一个数据，这个对象在整个生命周期中可以保存不变；

```javascript
 const [count, setCount] = useState(0);

  const numRef = useRef(count);

  useEffect(() => {
    numRef.current = count;
  }, [count])

  return (
    <div>
      <h2>count上一次的值: {numRef.current}</h2>
      <h2>count这一次的值: {count}</h2>
      <button onClick={e => setCount(count + 10)}>+10</button>
    </div>
  )
```

#### useImperativeHandle

通过forwardRef可以将ref转发到子组件

forwardRef的做法本身没有什么问题，但是我们是将子组件的DOM直接暴露给了父组件：

- 直接暴露给父组件带来的问题是某些情况的不可控； 
- 父组件可以拿到DOM后进行任意的操作； 
- 但是，事实上在上面的案例中，我们只是希望父组件可以操作的focus，其他并不希望它随意操作； 

**通过useImperativeHandle可以使暴露固定的操作：** 

- 通过useImperativeHandle的Hook，将传入的ref和useImperativeHandle第二个参数返回的对象绑定到了一起； 
- 所以在父组件中，使用 inputRef.current时，实际上使用的是返回的对象； 
- 比如我调用了 focus函数，甚至可以调用 printHello函数

```javascript
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const HYInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }), [inputRef])

  return <input ref={inputRef} type="text"/>
})

export default function UseImperativeHandleHookDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}
```

#### useLayoutEffect

useLayoutEffect看起来和useEffect非常的相似，事实上他们也只有一点区别而已： 

- useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新；
- useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新；

如果希望在某些操作发生之后再更新DOM，那么应该将这个操作放到useLayoutEffect。 

useEffect和useLayoutEffect的对比

![](https://p.ipic.vip/5m4sa1.jpg)

#### 自定义Hook

**自定义Hook本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算React的特性。** 

本质就是在抽取的函数代码逻辑中使用了其他hook **函数名以use开头就会被react识别的hook函数**

需求：所有的组件在创建和销毁时都进行打印

- 组件被创建：打印 组件被创建了；
- 组件被销毁：打印 组件被销毁了；

```javascript
import React, { useEffect } from 'react';

const Home = (props) => {
  useLoggingLife("Home");
  return <h2>Home</h2>
}

const Profile = (props) => {
  useLoggingLife("Profile");
  return <h2>Profile</h2>
}

export default function CustomLifeHookDemo01() {
  useLoggingLife("CustomLifeHookDemo01");
  return (
    <div>
      <h2>CustomLifeHookDemo01</h2>
      <Home/>
      <Profile/>
    </div>
  )
}

function useLoggingLife(name) {
  useEffect(() => {
    console.log(`${name}组件被创建出来了`);

    return () => {
      console.log(`${name}组件被销毁掉了`);
    }
  }, []);
}

```

#### redux hooks

useSelector的作用是将state映射到组件中：

- 参数一：将state映射到需要的数据中；
- 参数二：可以进行比较来决定是否组件重新渲染；

useSelector默认会比较我们返回的两个对象是否相等；

- 如何比较呢？ const refEquality = (a, b) => a === b； 
- 也就是我们必须返回两个完全相等的对象才可以不引起重新渲染；

useDispatch非常简单，就是直接获取dispatch函数，之后在组件中直接使用即可；

还可以通过useStore来获取当前的store对象；
