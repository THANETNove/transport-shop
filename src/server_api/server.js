import axios from "axios";
import { format } from "date-fns";

const getUrl = () => {
  const https_url = "http://localhost/project/API";
  /* const https_url = "https://medocargo.com/API"; */
  return https_url;
};
const getUrlImage = () => {
  const https_url = "http://localhost/project/API/image/product/";
  /* const https_url = "https://medocargo.com/API/image/product/"; */
  return https_url;
};
const getUrlSlip = () => {
  const https_url = "http://localhost/project/API/image/slip/";
  /* const https_url = "https://medocargo.com/API/image/slip/"; */
  return https_url;
};

const url = getUrl();

// GET
const getStatusList = async (dispatch) => {
  const params = {
    isAdd: true,
  };

  const response = await axios.get(`${url}/getStatusList.php`, { params });
  if (response.data.message) {
    dispatch({
      type: "STATUS_LIST_SUCCESS",
      payload: response.data.status_list_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "STATUS_LIST_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getProductType = async (dispatch) => {
  const params = {
    isAdd: true,
  };

  const response = await axios.get(`${url}/getProductTypeList.php`, { params });
  if (response.data.message) {
    dispatch({
      type: "PRODUCT_TYPE_SUCCESS",
      payload: response.data.product_type_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_TYPE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getProductTypeId = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };

  const response = await axios.get(`${url}/getProductTypeListId.php`, {
    params,
  });
  if (response.data.message) {
    dispatch({
      type: "ID_PRODUCT_TYPE_SUCCESS",
      payload: response.data.product_type_data,
    });
    return {
      status: "success",
      message: response.data.product_type_data,
    };
  } else if (response.data.error) {
    dispatch({
      type: "ID_PRODUCT_TYPE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getPricePerUserId = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };

  const response = await axios.get(`${url}/getPricePerUserId.php`, {
    params,
  });
  if (response.data.message) {
    dispatch({
      type: "PRICE_USER_SUCCESS",
      payload: response.data.price_per_user_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "ID_PRICE_USER_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getProduct = async (dispatch) => {
  const params = {
    isAdd: true,
  };
  const response = await axios.get(`${url}/getProductList.php`, {
    params,
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: response.data.product_data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getProductCode = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getProductCode.php`, {
    params,
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_CODE_SUCCESS",
      payload: response.data.product_code_data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getAddress = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getAddress.php`, {
    params,
  });

  if (response.data.message) {
    dispatch({
      type: "ADDRESS_SUCCESS",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getBill = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getIssueBill.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "BILL_SUCCESS",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getBillProduct = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getBillProduct.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "BILL_PRODUCT_SUCCESS",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getPoints = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getPoints.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "POINTS_SUCCESS",
      payload: response.data.data[0],
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getSlip = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getSlip.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "SLIP_SUCCESS",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const getSlipAll = async (id, dispatch) => {
  const params = {
    isAdd: true,
    id: id,
  };
  const response = await axios.get(`${url}/getSlip_All.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "SLIP_ALL_SUCCESS",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getBillAll = async (dispatch) => {
  const params = {
    isAdd: true,
  };
  const response = await axios.get(`${url}/getIssueBill_All.php`, {
    params,
  });



  if (response.data.message) {
    dispatch({
      type: "BILL_SUCCESS_ALL",
      payload: response.data.data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    /*   dispatch({
      type: "PRODUCT_CODE_ERROR",
      payload: response.data.error,
    }); */
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getCustomerCode = async (code, dispatch) => {
  const params = {
    isAdd: true,
    id: code,
  };
  const response = await axios.get(`${url}/getCustomerCode.php`, {
    params,
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.userCode_data,
    };
  } else if (response.data.error_message) {
    return {
      status: "error",
      error: "ไม่พบ รหัสลูกค้า",
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const getCustomerCodeAll = async (dispatch) => {
  const params = {
    isAdd: true,
  };
  const response = await axios.get(`${url}/getCustomerCodeAll.php`, {
    params,
  });

  if (response.data.message) {
    dispatch({
      type: "USERS_CODE_SUCCESS",
      payload: response.data.usersCode_data,
    });
    return {
      status: "success",
      message: response.data.userCode_data,
    };
  } else if (response.data.error_message) {
    dispatch({
      type: "USERS_CODE_ERROR",
      payload: response.data.usersCode_data,
    });
    return {
      status: "error",
      error: response.data.error_message,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

//POST
const register = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("username", e.username);
  formData.append("customerCode", e.customerCode);
  formData.append("email", e.email);
  formData.append("password", e.password);
  formData.append("name_surname", e.name_surname);
  formData.append("phone_number", e.phone_number);
  formData.append("address", e.address);
  formData.append("subdistrict", e.subdistrict);
  formData.append("district", e.district);
  formData.append("province", e.province);
  formData.append("zipCode", e.zipCode);

  const response = await axios.post(`${url}/register.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data.user_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "REGISTER_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const Login = async (e, dispatch) => {

  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("username", e.username);
  formData.append("password", e.password);

  const response = await axios.post(`${url}/login.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.user,
    });
    return {
      status: "success",
      message: response.data.message,
      id: response.data.user.id,
    };
  } else if (response.data.error) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const statusList = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("statusProduct", e.statusProduct);

  const response = await axios.post(`${url}/statusList.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "STATUS_LIST_SUCCESS",
      payload: response.data.status_list_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "STATUS_LIST_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const ProductType = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("name", e.name);
  formData.append("kg", e.kg);
  formData.append("cbm", e.cbm);

  const response = await axios.post(`${url}/product_type.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_TYPE_SUCCESS",
      payload: response.data.product_type_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_TYPE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const createProduct = async (e, dispatch) => {

  const formData = new FormData();
  formData.append("isAdd", true);
  for (let key in e) {
    formData.append(key, e[key]);
  }

  const response = await axios.post(`${url}/product.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: response.data.product_data,
    });
    dispatch({
      type: "STATUS_PRODUCT_SUCCESS",
      payload: "success",
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const createAddress = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  for (let key in e) {
    formData.append(key, e[key]);
  }

  const response = await axios.post(`${url}createAddress.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const createPriceUser = async (e, dispatch) => {

  const formData = new FormData();
  formData.append("isAdd", true);
  for (let key in e) {
    formData.append(key, e[key]);
  }

  const response = await axios.post(`${url}/priceUser.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const createProductCode = async (id, code, dispatch) => {
 
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("code", code);

  const response = await axios.post(`${url}/productCode.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "CODE_SUCCESS",
      payload: "success",
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "CODE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const createIssueBill = async (id, id_address, data, point, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("id_address", id_address);
  formData.append("data", JSON.stringify(data));
  formData.append("point", point);

  const response = await axios.post(`${url}/createIssueBill.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const createSlip = async (id, date, time, money, image) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("date", date);
  formData.append("time", time);
  formData.append("money", money);
  formData.append("image", image);

  const response = await axios.post(`${url}/createSlip.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

//  Update POST
const UpdateProductType = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", e.id);
  formData.append("name", e.name);
  formData.append("kg", e.kg);
  formData.append("cbm", e.cbm);

  const response = await axios.post(`${url}/updateProductType.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_TYPE_SUCCESS",
      payload: response.data.product_type_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_TYPE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const UpdateProduct = async (e, dispatch) => {

  const formData = new FormData();
  formData.append("isAdd", true);
  for (let key in e) {
    formData.append(key, e[key]);
  }

  const response = await axios.post(`${url}/updateProduct.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: response.data.product_data,
    });
    dispatch({
      type: "STATUS_PRODUCT_SUCCESS",
      payload: "success",
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};
const UpdateStatusBill = async (showIdBill, event, image) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", showIdBill);
  formData.append("status", event);
  formData.append("image", image);

  const response = await axios.post(`${url}/UpdateStatusBill.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const updateStatusProductList = async (id, value, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("idProduct", id);
  formData.append("parcel_status", value);

  const response = await axios.post(
    `${url}/updateStatusProduct.php`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
      },
    }
  );

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: response.data.product_data,
    });

    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const updatePriceUser = async (e, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  for (let key in e) {
    formData.append(key, e[key]);
  }

  const response = await axios.post(`${url}/updatePriceUser.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    return {
      status: "unknown",
    };
  }
};

const updateProductDateCloseCabinet = async (id, close_cabinet) => {
 
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("close_cabinet", close_cabinet);

  const response = await axios.post(
    `${url}/updateProductDateCloseCabinet.php`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
      },
    }
  );

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    return {
      status: "unknown",
    };
  }
};
const updateProductDateToThailand = async (id, to_thailand) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("to_thailand", to_thailand);

  const response = await axios.post(
    `${url}/updateProductDateToThailand.php`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
      },
    }
  );

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    return {
      status: "unknown",
    };
  }
};
const updateSlip = async (id, code_user, money, status) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("code_user", code_user);
  formData.append("money", money);
  formData.append("status", status);

  const response = await axios.post(`${url}/updateSlip.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    return {
      status: "unknown",
    };
  }
};

// Delete POST
const deleteStatusList = async (id, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);

  const response = await axios.post(`${url}/deleteStatusList.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "STATUS_LIST_SUCCESS",
      payload: response.data.status_list_data,
    });
    dispatch({
      type: "DELETE_STATUS_LIST_SUCCESS",
      payload: response.data.message,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "DELETE_STATUS_LIST__ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const deleteProductTypeList = async (id, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);

  const response = await axios.post(
    `${url}/deleteProductTypeList.php`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
      },
    }
  );

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_TYPE_SUCCESS",
      payload: response.data.product_type_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_TYPE_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const deleteProduct = async (id, image, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);
  formData.append("image", image);

  const response = await axios.post(`${url}/deleteProductList.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: response.data.product_data,
    });
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    dispatch({
      type: "PRODUCT_ERROR",
      payload: response.data.error,
    });
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

const deleteUserCode = async (id, dispatch) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("id", id);

  const response = await axios.post(`${url}/deleteUserCode.php`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  if (response.data.message) {
    return {
      status: "success",
      message: response.data.message,
    };
  } else if (response.data.error) {
    return {
      status: "error",
      error: response.data.error,
    };
  } else {
    // handle other cases, if any
    return {
      status: "unknown",
    };
  }
};

export default {
  getUrl,
  getUrlImage,
  getUrlSlip,
  getStatusList,
  getProductType,
  getProductTypeId,
  getPricePerUserId,
  getProduct,
  getProductCode,
  getCustomerCode,
  getCustomerCodeAll,
  getAddress,
  getBill,
  getBillProduct,
  getBillAll,
  getPoints,
  getSlip,
  getSlipAll,
  register,
  Login,
  statusList,
  createProduct,
  createAddress,
  createProductCode,
  createPriceUser,
  createSlip,
  ProductType,
  UpdateProduct,
  updateStatusProductList,
  UpdateProductType,
  updatePriceUser,
  updateProductDateCloseCabinet,
  updateProductDateToThailand,
  UpdateStatusBill,
  updateSlip,
  createIssueBill,
  deleteStatusList,
  deleteProduct,
  deleteProductTypeList,
  deleteUserCode,
};
