import React from 'react';
import { Redirect } from "react-router-dom";

import HYDiscover from "@/pages/discover";
import HYFriend from "@/pages/friend";
import HYMine from "@/pages/mine";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: HYDiscover,
  },
  {
    path: "/mine",
    component: HYMine,
  },
  {
    path: "/friend",
    component: HYFriend,
  },
];

export default routes;
