/* 
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import DashboardUser from "./views/user/Dashboard";
import DashboardAdmin from "./views/admin/Dashboard";

const status = "admin";
var routes = [
  {
    path: "/",
    component: Home,
    layout: "/home",
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/dashboard",
    component: status == "admin" ? DashboardAdmin : DashboardUser,
    layout: "/auth",
  },
];
export default routes;



 */
// routes.js
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import DashboardUser from "./views/user/Dashboard";
import DashboardAdmin from "./views/admin/Dashboard";

const createRoutes = (userStatus) => [
  {
    path: "/",
    component: Home,
    layout: "/home",
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/dashboard",
    component: userStatus == "admin" ? DashboardAdmin : DashboardUser,
    layout: "/auth",
  },
];

export default createRoutes;
