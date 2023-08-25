//User
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
// Admin
import ProductListUser from "./views/user/products/ProductList";
import CreateProductUser from "./views/admin/products/CreateProduct";
import ProductListAdmin from "./views/admin/products/ProductList";
import CreateProductAdmin from "./views/admin/products/CreateProduct";
// Manager
import ProductListManager from "./views/manager/products/ProductList";
import CreateProductManager from "./views/admin/products/CreateProduct";
import StatusList from "./views/manager/status/StatusList";
import CreateStatus from "./views/manager/status/CreateStatus";
import ProductTypeList from "./views/manager/productType/ProductTypeList";
import CreateProductType from "./views/manager/productType/CreateProductType";

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
  {
    path: "/product-type-list",
    component: ProductTypeList,
    layout: "/auth",
  },
  {
    path: "/create-product-type",
    component: CreateProductType,
    layout: "/auth",
  },
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
