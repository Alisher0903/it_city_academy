import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdMessage,
  MdPeople,
  MdHome,
  MdPerson3,
  MdOutlineMenuBook,
} from "react-icons/md";

// Student Imports
import MainDashboard from "./views/admin/default/index";
import NFTMarketplace from "./views/admin/marketplace/index";
import Profile from "./views/admin/profile/index";
import DataTables from "./views/admin/dataTables/index";
// import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "./views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/Student",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Category",
    layout: "/Student",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineMenuBook}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Notification",
    layout: "/Student",
    icon: <Icon as={MdMessage} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Group",
    layout: "/Student",
    path: "/profile",
    icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdPerson3} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
