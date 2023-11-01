import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdMessage,
  MdPeople,
  MdHome,
  MdPerson3,
  MdOutlineMenuBook,
  MdCardGiftcard,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Group from "views/admin/group";
import DataTables from "views/admin/dataTables";
import Profile from "views/admin/profile";
// import RTL from "views/admin/rtl";

// Auth Imports
import SignIn from "views/auth/signIn";
import Gifts from "views/admin/gifts";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Category",
    layout: "/admin",
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
    name: "Message",
    layout: "/admin",
    icon: <Icon as={MdMessage} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Group",
    layout: "/admin",
    path: "/group",
    icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
    component: Group,
  },
  {
    name: "",
    layout: "/admin",
    path: "/profile",
    icon: <Icon className="d-none" as={MdPeople} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon className="d-none" as={MdPeople} width='20px' height='20px' color='inherit' />,
    component: SignIn
  },
  {
    name: "Gifts",
    layout: "/admin",
    path: "/gifts",
    icon: <Icon as={MdCardGiftcard} width='20px' height='20px' color='inherit' />,
    component: Gifts
  }

];

export default routes;
