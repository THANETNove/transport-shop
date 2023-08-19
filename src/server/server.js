import axios from "axios";
/* import { getToken } from '../hooks/useToken'; */
/*  const  url = 'https://reqres.in';  */
const url = "http://192.168.1.5/project/API"; //หน่วย
//const url = 'https://th-projet.com/api-database';    // ยอน

//192.168.1.5/project/API/register.php?isAdd=true&username=username111&email=email111

const register = async (e) => {
  const formData = new FormData();
  formData.append("isAdd", true);
  formData.append("username", e[0]);
  formData.append("email", e[1]);

  const response = await axios.post(`${url}/register.php`, formData, {
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
  register,
};
