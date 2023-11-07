import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdPerson3,
  MdOutlineMenuBook,
  MdGroup,
  MdEmojiEvents,
  MdPending,
  MdOutlinePending,
  MdPerson,
} from "react-icons/md";

import MainDashboard from "./views/admin/default";
import Category from "./views/admin/marketplace";
import Group from "./views/admin/group";
import Student from "./views/admin/profile";
import Gifts from "./views/admin/dataTables";
import Test from "./views/admin/test";
import TestAnswer from "./views/admin/testAnswer";

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
    name: "Group",
    layout: "/Teacher",
    path: "/group",
    icon: <Icon as={MdGroup} width='20px' height='20px' color='inherit' />,
    component: Group,
  },
  {
    name: "Student",
    layout: "/Teacher",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    path: "/student",
    component: Student,
  },
  {
    name: "Gifts",
    layout: "/Teacher",
    path: "/gifts",
    icon: <Icon as={MdEmojiEvents} width='20px' height='20px' color='inherit' />,
    component: Gifts,
  },
  {
    name: "Test",
    layout: "/Teacher",
    icon: <Icon as={MdPending} width='20px' height='20px' color='inherit' />,
    path: "/test",
    component: Test,
  },
  {
    name: "Test Answer",
    layout: "/Teacher",
    icon: <Icon as={MdOutlinePending} width='20px' height='20px' color='inherit' />,
    path: "/answer",
    component: TestAnswer,
  },
];

export default routes;
