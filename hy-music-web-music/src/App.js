import React, { memo } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";

import routes from "./router";
import store from "./store";

import HYAppHeader from "@/components/app-header";
import HYAppFooter from "@/components/app-footer";
import { HashRouter } from "react-router-dom";
import HYAppPlayerBar from './pages/player/app-player-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <HYAppHeader />
        {renderRoutes(routes)}
        <HYAppFooter />
        <HYAppPlayerBar/>
      </HashRouter>
    </Provider>
  );
});
