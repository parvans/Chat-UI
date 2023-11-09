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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/chatbot/auth/Login.js";
import ChatProvider from "context/ChatProvider";
import ChatArea from "views/chatbot/Chat/ChatArea";
import NotFound from "views/chatbot/NotFound";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
       
const root = ReactDOM.createRoot(document.getElementById("root"));
const token=localStorage.getItem("ezuth-token");
root.render(
  <ChatProvider>
  <BrowserRouter>
  <>
    <Switch>
      {/* <Route path="/chatbot" render={(props) => <AdminLayout {...props} />} /> */}
      <Route path="/chatbot/chat" render={(props) => <ChatArea/>} />
      <Route path="/chatbot" component={<NotFound/>} />
      {!token&&<Route path="/auth/login" render={(props) => <Login {...props} />} />}
      {!token ? <Redirect from={`/`} to="/auth/login" /> : <Redirect from={`/`} to="/chatbot/chat" />}
    </Switch>
  </>
  </BrowserRouter>
  
  </ChatProvider>
);
