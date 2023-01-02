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

