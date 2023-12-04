import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdMessage,
  MdPeople,
  MdHome,
  MdOutlineMenuBook,
  MdCardGiftcard,
  MdPerson,
  MdPersonPin,
  MdPersonAddAlt
} from "react-icons/md";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Group from "views/admin/group";
import DataTables from "views/admin/dataTables";
import Profile from "views/admin/profile";
import User from "./views/admin/users";
import Teacher from "./views/admin/teachersAdd";
import GroupInfo from "./views/admin/default/components/infoDashboard/GroupInfo";
import TeacherInfo from "./views/admin/default/components/infoDashboard/TeacherInfo";

import SignIn from "views/auth/signIn";
import Gifts from "views/admin/gifts";
import AdminAdd from "views/admin/adminAdd";

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
    icon: <Icon as={MdOutlineMenuBook} width='20px' height='20px' color='inherit' />,
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
    name: "Gifts",
    layout: "/admin",
    path: "/gifts",
    icon: <Icon as={MdCardGiftcard} width='20px' height='20px' color='inherit' />,
    component: Gifts
  },
  {
    name: "User",
    layout: "/admin",
    path: "/user",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: User,
  },
  {
    name: "Teacher",
    layout: "/admin",
    path: "/teacher",
    icon: <Icon as={MdPersonPin} width='20px' height='20px' color='inherit' />,
    component: Teacher,
  },
  {
    name: "AdminAdd",
    layout: "/admin",
    path: "/AdminAdd",
    icon: <Icon as={MdPersonAddAlt} width='20px' height='20px' color='inherit' />,
    component: AdminAdd,
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
    name: "",
    layout: "/admin",
    path: "/info/g",
    component: GroupInfo,
  },
  {
    name: "",
    layout: "/admin",
    path: "/info/t",
    component: TeacherInfo,
  },
];

export default routes;
