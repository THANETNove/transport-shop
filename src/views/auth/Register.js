import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    customerCode: "",
    email: "",
    password: "",
    name_surname: "",
    phone_number: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    customerCode: "",
    email: "",
    password: "",
    name_surname: "",
    phone_number: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    zipCode: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // username validation
    if (!formData.username.trim()) {
      newErrors.username = "username is required";
      isValid = false;
    }
    // customerCode validation
    if (!formData.customerCode.trim()) {
      newErrors.customerCode = "รหัสลูกค้า is required";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Email format is invalid";
      isValid = false;
    }

    // password validation
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
      isValid = false;
    } else if (formData.password.length <= 5) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    // name_surname validation
    if (!formData.name_surname.trim()) {
      newErrors.name_surname = "name_surname is required";
      isValid = false;
    }
    // phone_number validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "phone_number is required";
      isValid = false;
    }
    // address validation
    if (!formData.address.trim()) {
      newErrors.address = "address is required";
      isValid = false;
    }
    // subdistrict validation
    if (!formData.subdistrict.trim()) {
      newErrors.subdistrict = "subdistrict is required";
      isValid = false;
    }
    // district validation
    if (!formData.district.trim()) {
      newErrors.district = "district is required";
      isValid = false;
    }
    // province validation
    if (!formData.province.trim()) {
      newErrors.province = "province is required";
      isValid = false;
    }
    // zipCode validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "zipCode is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name == "username") {
      setFormData((prevState) => ({ ...prevState, ["customerCode"]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const response = await Service.register(formData, dispatch);

      if (response.status == "success") {
        navigate("/dashboard");
      } else {
        if (response.error == "Username already exists!") {
          setErrors((prevState) => ({
            ...prevState,
            ["username"]: response.error,
          }));
        } else if ("Email already exists!") {
          setErrors((prevState) => ({
            ...prevState,
            ["email"]: response.error,
          }));
        }
      }
    }
  };

  /*   console.log(useSelector((state) => ({ ...state }))); */

  return (
    <>
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">สร้างบัญชี</h1>
                  </div>
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        {errors.username && (
                          <div className="error-from">{errors.username}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="รหัสลูกค้า"
                          name="customerCode"
                          value={formData.customerCode}
                          onChange={handleChange}
                        />
                        {errors.customerCode && (
                          <div className="error-from">
                            {errors.customerCode}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error-from">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="error-from">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="name_surname"
                        placeholder="ชื่อ-นามสกุล"
                        name="name_surname"
                        value={formData.name_surname}
                        onChange={handleChange}
                      />
                      {errors.name_surname && (
                        <div className="error-from">{errors.name_surname}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        id="phone_number"
                        placeholder="เบอร์ติดต่อ"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                      {errors.phone_number && (
                        <div className="error-from">{errors.phone_number}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="ที่อยู่"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                      {errors.address && (
                        <div className="error-from">{errors.address}</div>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="ตำบล/แขวง"
                          id="subdistrict"
                          name="subdistrict"
                          value={formData.subdistrict}
                          onChange={handleChange}
                        />
                        {errors.subdistrict && (
                          <div className="error-from">{errors.subdistrict}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="อำเภอ/เขต"
                        />
                        {errors.district && (
                          <div className="error-from">{errors.district}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          placeholder="จังหวัด"
                        />
                        {errors.province && (
                          <div className="error-from">{errors.province}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="รหัสไปรษณีย์"
                        />
                        {errors.zipCode && (
                          <div className="error-from">{errors.zipCode}</div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Submit
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link to="/" className="small">
                      <span>go Back Home</span>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link to="/login" className="small">
                      <span> Already have an account? Login!</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
