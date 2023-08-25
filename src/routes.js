import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ProductListUser from "./views/user/products/ProductList";
import CreateProductUser from "./views/admin/products/CreateProduct";
import ProductListAdmin from "./views/admin/products/ProductList";
import CreateProductAdmin from "./views/admin/products/CreateProduct";
import ProductListManager from "./views/manager/products/ProductList";
import CreateProductManager from "./views/admin/products/CreateProduct";
import StatusList from "./views/admin/status/StatusList";
import CreateStatus from "./views/admin/status/CreateStatus";

const commonRoutes = [
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
];

const userRoutes = [
  {
    path: "/product-list",
    component: ProductListUser,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProductUser,
    layout: "/auth",
  },
];

const adminRoutes = [
  {
    path: "/product-list",
    component: ProductListAdmin,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProductAdmin,
    layout: "/auth",
  },
  {
    path: "/status-list",
    component: StatusList,
    layout: "/auth",
  },
  {
    path: "/create-status",
    component: CreateStatus,
    layout: "/auth",
  },
];

const managerRoutes = [
  {
    path: "/product-list",
    component: ProductListManager,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProductManager,
    layout: "/auth",
  },
  /* {
    path: "/status-list",
    component: StatusList,
    layout: "/auth",
  },
  {
    path: "/create-status",
    component: CreateStatus,
    layout: "/auth",
  }, */
];

const createRoutes = (userStatus) => {
  let specificRoutes = [];

  switch (userStatus) {
    case "user":
      specificRoutes = userRoutes;
      break;
    case "admin":
      specificRoutes = adminRoutes;
      break;
    case "manager":
      specificRoutes = managerRoutes;
      break;
    default:
      break;
  }

  return [...commonRoutes, ...specificRoutes];
};

export default createRoutes;
