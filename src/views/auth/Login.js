import React, { useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../server/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;

    const newErrors = {};

    // username validation
    if (!formData.username.trim()) {
      newErrors.username = "username is required";
      isValid = false;
    }
    // password validation
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const response = await Service.Login(formData, dispatch);
      console.log(response);

      if (response.status == "success") {
        navigate("/product-list");
      } else {
        if (response.error == "User not found!") {
          setErrors((prevState) => ({
            ...prevState,
            ["username"]: response.error,
          }));
        } else if ("Incorrect password") {
          setErrors((prevState) => ({
            ...prevState,
            ["password"]: response.error,
          }));
        }
      }
    }
  };

  return (
    <>
      <div className="row mt-5 justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">เข้าสู่ระบบ</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                        {errors.username && (
                          <div className="error-from">{errors.username}</div>
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
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox"
                          />

                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      {/* <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a> */}
                      <Link to="/" className="small">
                        <span>go Back Home</span>
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link to="/register" className="small">
                        <span> Create an Account!</span>
                      </Link>
                    </div>
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

export default Login;
