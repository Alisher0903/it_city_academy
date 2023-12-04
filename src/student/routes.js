import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdMessage,
  MdPeople,
  MdHome,
  MdPerson3,
  MdOutlineMenuBook,
  MdCurrencyExchange,
} from "react-icons/md";

// Student Imports
import Gifts from "./views/admin/gifts";
import NFTMarketplace from "./views/admin/marketplace/index";
import Default from "./views/admin/default"
import DataTables from "./views/admin/dataTables/index";
import Banner from "./views/admin/marketplace/components/Banner"
import Group from "./views/admin/group/index"
// import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "./views/auth/signIn";

const routes = [
  {
    name: "",
    layout: "/Student",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Default,
  },
  {
    name: "Test",
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
    name: "Message",
    layout: "/Student",
    icon: <Icon as={MdMessage} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Gift",
    layout: "/Student",
    path: "/profile",
    icon: <Icon as={MdPeople} width='20px' height='20px' color='inherit' />,
    component: Gifts,
  },
  {
    name: "",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdPerson3} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "",
    layout: "/Student",
    path: "/test/coding",
    icon: <Icon as={MdPerson3} width='20px' height='20px' color='inherit' />,
    component: Banner,
  },
  {
    name: "Exchange",
    layout: "/Student",
    path: "/exchange",
    icon: <Icon as={MdCurrencyExchange} width='20px' height='20px' color='inherit' />,
    component: Group,
  }
];

export default routes;
