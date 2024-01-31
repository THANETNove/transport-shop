import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CreatePricePreUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { product_type } = useSelector((state) => state.post);
  const { price_user } = useSelector((state) => state.get);
  const [productTypeList, setProductTypeList] = useState(product_type);
  const [priceUser, setPriceUser] = useState(null);

  const [formData, setFormData] = useState({
    id_user: "",
    username: "",
    id_type: "",
    kg: "",
    cbm: "",
  });
  const [errors, setErrors] = useState({
    id_user: "",
    username: "",
    id_type: "",
    kg: "",
    cbm: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // name validation
    if (!formData.username.trim()) {
      newErrors.username = "ไม่พบ รหัสลูกค้า";
      isValid = false;
    }
    if (!formData.id_type.trim()) {
      newErrors.id_type = "id_type is required";
      isValid = false;
    } else if (isNaN(Number(formData.id_type))) {
      newErrors.id_type = "กรุณา เลือกประเภท";
      isValid = false;
    }

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

  const fetchData = async () => {
    await Service.getProductType(dispatch); // ดึงประเภทพัสดุ
  };
  const fetchUser = async (e) => {
    await Service.getPricePerUserId(e, dispatch);
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
      const response = await Service.createPriceUser(formData, dispatch);

      if (response.status == "success") {
        fetchData();
        fetchUser(formData.id_user);

        setFormData((prevState) => ({
          ...prevState,
          ["id_type"]: "",
          ["kg"]: "",
          ["cbm"]: "",
        }));
      }
    }
  };
  const handleChangeUser = async (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    const response = await Service.getCustomerCode(value, dispatch); // ดึงประเภทพัสดุ

    if (response.message && response.message.length === 1) {
      setFormData((prevState) => ({ ...prevState, [name]: value }));

      setFormData((prevState) => ({
        ...prevState,
        ["username"]: response.message[0].customerCode,
        ["id_user"]: response.message[0].id,
      }));

      fetchUser(response.message[0].id);
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ["username"]: response.error,
      }));
    }
  };

  const handleClearUsername = () => {
    setFormData((prevState) => ({
      ...prevState,
      ["username"]: "", // ลบค่า username ออก
      ["id_user"]: "", // ลบค่า username ออก
    }));
  };

  console.log("product_type", product_type);
  console.log("priceUser", priceUser);
  //thiuserHPQ4ei
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {t("price_per_user.user_parcel_type")}
              </h6>
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center mt-5">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          {t("customer_id")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          name="username"
                          placeholder={t("customer_id")}
                          value={formData.username}
                          onChange={handleChangeUser}
                        />
                        {errors.username && (
                          <div className="error-from">{errors.username}</div>
                        )}
                        <button
                          type="button"
                          className="btn btn-danger mt-2"
                          onClick={handleClearUsername}
                        >
                          {t("create_product.delete")}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          {t("create_product.parcel_type")}
                        </label>
                        <select
                          className="form-control"
                          id="id_type"
                          name="id_type"
                          value={formData.id_type || ""}
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option selected>
                            {t("product_list.select_status")}
                          </option>
                          {priceUser && priceUser.length === 0
                            ? product_type &&
                              product_type.map((pro_type) => (
                                <option key={pro_type.id} value={pro_type.id}>
                                  {pro_type.name}
                                </option>
                              ))
                            : product_type &&
                              product_type.map(
                                (type) =>
                                  priceUser &&
                                  !priceUser.some(
                                    (priceId) => priceId.id_type == type.id
                                  ) && (
                                    <option key={type.id} value={type.id}>
                                      {type.name}
                                    </option>
                                  )
                              )}
                        </select>
                        {errors.id_type && (
                          <div className="error-from">{errors.id_type}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <label for="inputPassword6" className="col-form-label">
                          {t("price_per_user.kg")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="kg"
                          name="kg"
                          placeholder={t("price_per_user.kg")}
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
                        <label for="inputPassword6" className="col-form-label">
                          {t("price_per_user.cbm")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cbm"
                          placeholder={t("price_per_user.cbm")}
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
};
export default CreatePricePreUser;
