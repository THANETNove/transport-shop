import Home from "./views/Home";
import User1 from "./views/auth/User";
import Admin from "./views/auth/Admin";

const status = "uaer";
var routes = [
  {
    path: "/",
    component: Home,
    layout: "/home",
  },
  {
    path: "/user1",
    component: status == "admin" ? Admin : User1,
    layout: "/auth",
  },
];
export default routes;
