import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const CreatePricePreUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { product_type } = useSelector((state) => state.post);
  const { price_user } = useSelector((state) => state.get);
  const [productTypeList, setProductTypeList] = useState(product_type);
  const [priceUser, setPriceUser] = useState(price_user);
  const [formData, setFormData] = useState({
    id_user: "",
    id_type: "",
    kg: "",
    cbm: "",
  });
  const [errors, setErrors] = useState({
    id_type: "",
    kg: "",
    cbm: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // name validation
    if (!formData.id_type.trim()) {
      newErrors.id_type = "id_type is required";
      isValid = false;
    }
    /*     if (typeof formData.kg !== "string") {
      formData.kg = formData.kg.toString(); // แปลงเป็นสตริง
    }
 */
    // kg validation
    if (!formData.kg.trim()) {
      newErrors.kg = "kg is required";
      isValid = false;
    } else if (isNaN(Number(formData.kg))) {
      newErrors.kg = "kg must be a number";
      isValid = false;
    }
    /*    if (typeof formData.cbm !== "string") {
      formData.cbm = formData.cbm.toString(); // แปลงเป็นสตริง
    } */

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

  const fetchData = async () => {
    await Service.getProductType(dispatch); // ดึงประเภทพัสดุ
    await Service.getPricePerUserId(user && user.id, dispatch); // ดึงประเภทพัสดุ
    setFormData((prevState) => ({
      ...prevState,
      ["id_user"]: user && user.id,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProductTypeList(product_type);
  }, [product_type]);

  useEffect(() => {
    setPriceUser(price_user);
  }, [price_user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("5555");
      const response = await Service.createPriceUser(formData, dispatch);
      console.log("response", response);
      if (response.status == "success") {
        fetchData();
      } else {
        console.log("response error", response.error);
        /*  setErrors((prevState) => ({
          ...prevState,
          ["statusProduct"]: response.error,
        })); */
      }
    }
  };
  console.log(
    "id_price_user",
    useSelector((state) => state.get)
  );
  /*  console.log("product_type", product_type); */

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                ประเภทพัสดุของ user
              </h6>
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center mt-5">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <select
                          className="form-control"
                          id="id_type"
                          name="id_type"
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option selected disabled>
                            เลือก สถานะ
                          </option>
                          {priceUser && priceUser.length === 0
                            ? product_type.map((pro_type) => (
                                <option key={pro_type.id} value={pro_type.id}>
                                  {pro_type.name}
                                </option>
                              ))
                            : null}
                        </select>
                        {errors.id_type && (
                          <div className="error-from">{errors.id_type}</div>
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
export default CreatePricePreUser;
