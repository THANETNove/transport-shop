import axios from "axios";

const url = "http://192.168.1.5/project/API"; //หน่วย

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

export default {
  register,
  Login,
};
