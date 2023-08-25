//User
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

// User

//Admin

// Manager
import ProductListManager from "./views/all/products/ProductList";
import StatusList from "./views/manager/status/StatusList";
import CreateStatus from "./views/manager/status/CreateStatus";
import ProductTypeList from "./views/manager/productType/ProductTypeList";
import CreateProductType from "./views/manager/productType/CreateProductType";
import EditProductType from "./views/manager/productType/EditProductType";

// All ใช้รวมกัน
import CreateProduct from "./views/all/products/CreateProduct";

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

  //  path All ใช้รวมกัน  กรณี login เเล้ว
  {
    path: "/product-list",
    component: ProductListManager,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProduct,
    layout: "/auth",
  },
];

const userRoutes = [
  /*   {
    path: "/product-list",
    component: ProductListUser,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProductUser,
    layout: "/auth",
  }, */
];

const adminRoutes = [
  /*   {
    path: "/product-list",
    component: ProductListAdmin,
    layout: "/auth",
  },
  {
    path: "/create-product",
    component: CreateProductAdmin,
    layout: "/auth",
  }, */
];

const managerRoutes = [
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
  {
    path: "/edit-product-type/:id",
    component: EditProductType,
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
