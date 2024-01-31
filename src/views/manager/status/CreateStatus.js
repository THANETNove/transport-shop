import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CreateStatus() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    statusProduct: "",
  });

  const [errors, setErrors] = useState({
    statusProduct: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // username validation
    if (!formData.statusProduct.trim()) {
      newErrors.statusProduct = "statusProduct is required";
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
      const response = await Service.statusList(formData, dispatch);

      if (response.status == "success") {
        navigate("/status-list");
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
              <h6 className="m-0 font-weight-bold text-primary">
                {t("create_status.name_status")}
              </h6>
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
                          id="statusProduct"
                          placeholder={t("create_status.name_status")}
                          name="statusProduct"
                          value={formData.statusProduct}
                          onChange={handleChange}
                        />
                        {errors.statusProduct && (
                          <div className="error-from">
                            {errors.statusProduct}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block mt-5 mb-5"
                    >
                      {t("create_product.save")}
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
}
