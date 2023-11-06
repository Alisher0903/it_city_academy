import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdMessage,
  MdPeople,
  MdHome,
  MdPerson3,
  MdOutlineMenuBook,
  MdGroup,
} from "react-icons/md";

// Teacher Imports
import MainDashboard from "./views/admin/default";
import Category from "./views/admin/marketplace";
import Group from "./views/admin/group";
import Message from "./views/admin/dataTables";
// import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "./views/auth/signIn";

const routes = [
  {
    name: "Teacher Dashboard",
    layout: "/Teacher",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Category",
    layout: "/Teacher",
    path: "/category",
    icon: <Icon as={MdOutlineMenuBook} width='20px' height='20px' color='inherit' />,
    component: Category,
    secondary: true,
  },
  {
    name: "Message",
    layout: "/Teacher",
    icon: <Icon as={MdMessage} width='20px' height='20px' color='inherit' />,
    path: "/message",
    component: Message,
  },
  {
    name: "Group",
    layout: "/Teacher",
    path: "/group",
    icon: <Icon as={MdGroup} width='20px' height='20px' color='inherit' />,
    component: Group,
  },
  {
    name: "Student",
    layout: "/Teacher",
    path: "/student",
    icon: <Icon as={MdPerson3} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
