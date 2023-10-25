import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
// import RTL from "views/admin/rtl";

// Auth Imports

const routes = [
  {
    name: "Main Dashboard",
    layout: "/Home",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
];

export default routes;
