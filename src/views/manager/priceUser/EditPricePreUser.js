import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const EditPricePreUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users_code } = useSelector((state) => state.get);
  const [userCode, setUserCode] = useState(null);

  const [formData, setFormData] = useState({
    id: id,
    kg: "",
    cbm: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    kg: "",
    cbm: "",
  });

  useEffect(() => {
    const data = users_code && users_code.find((status) => status.id == id);
    setUserCode(data);
    setFormData((prevState) => ({
      ...prevState,
      ["id"]: data.id,
      ["kg"]: data.kg,
      ["cbm"]: data.cbm,
    }));
  }, [users_code]);

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    // kg validation
    if (!formData.kg.trim()) {
      newErrors.kg = "kg is required";
      isValid = false;
    } else if (isNaN(Number(formData.kg))) {
      newErrors.kg = "kg must be a number";
      isValid = false;
    }

    // cbm validation
    if (!formData.cbm.trim()) {
      newErrors.cbm = "cbm is required";
      isValid = false;
    } else if (isNaN(Number(formData.cbm))) {
      newErrors.cbm = "cbm must be a number";
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
      const response = await Service.updatePriceUser(formData, dispatch);

      if (response.status == "success") {
        navigate("/price-per-user");
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
                เเก้ไขประเภทพัสดุของ user
              </h6>
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center mt-5">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          รหัสลูกค้า
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          name="username"
                          placeholder="รหัสลูกค้า"
                          value={userCode && userCode.customerCode}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          ประเภทพัสดุ
                        </label>
                        <select
                          className="form-control"
                          aria-label="Default select example"
                          disabled
                        >
                          <option selected>{userCode && userCode.name}</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          KG
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="kg"
                          name="kg"
                          placeholder="kg"
                          value={formData && formData.kg}
                          onChange={handleChange}
                        />
                        {/* {errors.kg && (
                          <div className="error-from">{errors.kg}</div>
                        )} */}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          CBM
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cbm"
                          placeholder="cbm"
                          name="cbm"
                          value={formData && formData.cbm}
                          onChange={handleChange}
                        />
                        {/*  {errors.cbm && (
                          <div className="error-from">{errors.cbm}</div>
                        )} */}
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

export default EditPricePreUser;
