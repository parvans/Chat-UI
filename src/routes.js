/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
// import UserPage from "views/User.js";
import ChatArea from "views/chatbot/Chat/ChatArea";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
// import Maps from "views/Map.js";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/ezhuth"
  },
  // {
  //   path: "/posts",
  //   name: "Posts",
  //   icon: "nc-icon nc-bullet-list-67",
  //   component: MyBlogs,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/viewblog",
  //   name: "View Blog",
  //   icon: "nc-icon nc-bullet-list-67",
  //   component: Blog,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/ezhuth"
  // },
  {
    path: "/chats",
    name: "Chats",
    icon: "nc-icon nc-chat-33",
    component: ChatArea,
    layout: "/ezhuth"
  },

  // {
  //   path:"/login",
  //   name:"Login",
  //   icon:"nc-icon nc-key-25",
  //   component:Login,
  //   layout:"/auth"
  // },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/ezhuth"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/ezhuth"
  // },
];
export default routes;
