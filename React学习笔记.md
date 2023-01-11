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



