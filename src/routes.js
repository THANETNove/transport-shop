//User
import Home from "./views/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

// User
import ProductCode from "./views/user/product_code/ProductCode";
import CreateProductCode from "./views/user/product_code/CreateProductCode";
import moneyWallet from "./views/user/moneyWallet/MoneyWallet";
import ProductListUser from "./views/user/products/ProductList";
import BillList from "./views/user/products/Bill";
import ProductListBill from "./views/user/products/ProductListBill";
import Money from "./views/user/moneyWallet/Money";
import RecordMoneyWallet from "./views/user/moneyWallet/MoneySlip";
//Admin

// Manager
import ProductListManager from "./views/all/products/ProductList";
import StatusList from "./views/manager/status/StatusList";
import CreateStatus from "./views/manager/status/CreateStatus";
import ProductTypeList from "./views/manager/productType/ProductTypeList";
import CreateProductType from "./views/manager/productType/CreateProductType";
import EditProductType from "./views/manager/productType/EditProductType";
import PricePreUser from "./views/manager/priceUser/PricePreUser";
import CreatePricePreUser from "./views/manager/priceUser/CreatePricePreUser";
import EditPricePreUser from "./views/manager/priceUser/EditPricePreUser";
import BillListStatus from "./views/manager/bill/Bill";
import BillListManager from "./views/manager/bill/BillList";
import NewPassword from "./views/auth/NewPassword";

import checkMoney from "./views/manager/bill/Slip";
import recordSlipList from "./views/manager/bill/RecordSlip";

// All ใช้รวมกัน
import CreateProduct from "./views/all/products/CreateProduct";
import EditProduct from "./views/all/products/EditProductList";
import ShowProduct from "./views/all/products/ShowProductList";
import ListBillAdmin from "./views/all/products/ProductListBill";
import ShowProductItem from "./views/user/products/ShowProductListBill";
import ShowProductItemAdmin from "./views/all/products/ShowProductListBill";

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
];

const userRoutes = [
  {
    path: "/product-code",
    component: ProductCode,
    layout: "/auth",
  },
  {
    path: "/create-product-code",
    component: CreateProductCode,
    layout: "/auth",
  },
  {
    path: "/money-wallet",
    component: moneyWallet,
    layout: "/auth",
  },
  {
    path: "/bill-list",
    component: ProductListBill,
    layout: "/auth",
  },
  {
    path: "/product-list",
    component: ProductListUser,
    layout: "/auth",
  },
  {
    path: "/show-product/:id",
    component: ShowProduct,
    layout: "/auth",
  },

  {
    path: "/bill-all",
    component: BillList,
    layout: "/auth",
  },
  {
    path: "/money",
    component: Money,
    layout: "/auth",
  },
  {
    path: "/record-money-wallet",
    component: RecordMoneyWallet,
    layout: "/auth",
  },
  {
    path: "/show-product-item/:id",
    component: ShowProductItem,
    layout: "/auth",
  },
];

const adminRoutes = [
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
  {
    path: "/edit-product/:id",
    component: EditProduct,
    layout: "/auth",
  },
  {
    path: "/show-product/:id",
    component: ShowProduct,
    layout: "/auth",
  },
  {
    path: "/check-bill/",
    component: BillListStatus,
    layout: "/auth",
  },
  {
    path: "/record-bill/",
    component: BillListManager,
    layout: "/auth",
  },
  {
    path: "/check-money/",
    component: checkMoney,
    layout: "/auth",
  },
  {
    path: "/list-slip-money/",
    component: recordSlipList,
    layout: "/auth",
  },
  {
    path: "/new-password/",
    component: NewPassword,
    layout: "/auth",
  },
  {
    path: "/bill-list-admin/",
    component: ListBillAdmin,
    layout: "/auth",
  },
  {
    path: "/show-product-item/:id",
    component: ShowProductItemAdmin,
    layout: "/auth",
  },
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
  {
    path: "/price-per-user",
    component: PricePreUser,
    layout: "/auth",
  },
  {
    path: "/create-price-per-user",
    component: CreatePricePreUser,
    layout: "/auth",
  },
  {
    path: "/edit-price-per-user/:id",
    component: EditPricePreUser,
    layout: "/auth",
  },
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
  {
    path: "/edit-product/:id",
    component: EditProduct,
    layout: "/auth",
  },
  {
    path: "/show-product/:id",
    component: ShowProduct,
    layout: "/auth",
  },
  {
    path: "/check-bill/",
    component: BillListStatus,
    layout: "/auth",
  },
  {
    path: "/record-bill/",
    component: BillListManager,
    layout: "/auth",
  },
  {
    path: "/check-money/",
    component: checkMoney,
    layout: "/auth",
  },
  {
    path: "/list-slip-money/",
    component: recordSlipList,
    layout: "/auth",
  },
  {
    path: "/new-password/",
    component: NewPassword,
    layout: "/auth",
  },
  {
    path: "/bill-list-admin/",
    component: ListBillAdmin,
    layout: "/auth",
  },
  {
    path: "/show-product-item/:id",
    component: ShowProductItemAdmin,
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
