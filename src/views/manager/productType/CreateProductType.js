import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const CreateProductType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    kg: "",
    cbm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    kg: "",
    cbm: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // name validation
    if (!formData.name.trim()) {
      newErrors.name = "name is required";
      isValid = false;
    }
    // kg validation
    if (!formData.kg.trim()) {
      newErrors.kg = "kg is required";
      isValid = false;
    }
    // cbm validation
    if (!formData.cbm.trim()) {
      newErrors.cbm = "cbm is required";
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
      const response = await Service.ProductType(formData, dispatch);
      if (response.status == "success") {
        navigate("/product-type-list");
      } else {
        setErrors((prevState) => ({
          ...prevState,
          ["statusProduct"]: response.error,
        }));
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">ประเภทพัสดุ</h6>
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center mt-5">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="name"
                          placeholder="ชื่อประเภทพัสดุ"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <div className="error-from">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <input
                          type="number"
                          className="form-control form-control-user"
                          id="kg"
                          name="kg"
                          placeholder="kg"
                          value={formData.kg}
                          onChange={handleChange}
                        />
                        {errors.kg && (
                          <div className="error-from">{errors.kg}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <input
                          type="number"
                          className="form-control form-control-user"
                          id="cbm"
                          placeholder="cbm"
                          name="cbm"
                          value={formData.cbm}
                          onChange={handleChange}
                        />
                        {errors.cbm && (
                          <div className="error-from">{errors.cbm}</div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block mt-5 mb-5"
                    >
                      บันทึก
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductType;
