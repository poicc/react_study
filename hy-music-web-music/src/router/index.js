import React from "react";

import HYDiscover from "@/pages/discover";
import HYFriend from "@/pages/friend";
import HYMine from "@/pages/mine";

const routes = [
  {
    path: "/",
    exact: true,
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
