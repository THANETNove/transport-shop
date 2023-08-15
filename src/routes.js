import Home from "./views/Home";
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
    path: "/dashboard",
    component: status == "admin" ? DashboardAdmin : DashboardUser,
    layout: "/auth",
  },
];
export default routes;
