// import { Component } from "react";

// export default class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       message: "你好 react",
//     };
//   }
//   render() {
//     return (
//       <div>
//         <span>我是App组件</span>
//         <h2>{this.state.message}</h2>
//       </div>
//     );
//   }
// }

/**
 * 函数式组件的特点
 * 1.没有this对象
 * 2.没有内部状态(hooks)
 */
export default function App() {
  return (
    <div>我是函数组件：App组件</div>
  )
}