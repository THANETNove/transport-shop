import axios from "axios";
import { format } from "date-fns";

const url = "http://192.168.1.10/project/API"; //หน่วย

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
    console.log("key", key);
    if (
      key === "chinese_warehouse" ||
      key === "close_cabinet" ||
      key === "to_thailand"
    ) {
      formData.append(key, format(e[key], "dd--MM-yyyy"));
    } else {
      formData.append(key, e[key]);
    }
  }
  console.log("formData", e);

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

export default {
  getStatusList,
  getProductType,
  getProductTypeId,
  register,
  Login,
  statusList,
  createProduct,
  ProductType,
  UpdateProductType,
  deleteStatusList,
  deleteProductTypeList,
};
