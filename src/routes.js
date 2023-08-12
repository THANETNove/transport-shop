import Home from "./views/Home";
import DashboardUser from "./views/auth/user/Dashboard";
import DashboardAdmin from "./views/auth/admin/Dashboard";

const status = "uaer";
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
