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
