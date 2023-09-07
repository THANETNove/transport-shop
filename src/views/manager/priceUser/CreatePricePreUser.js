import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const CreatePricePreUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { product_type } = useSelector((state) => state.post);
  const { id_price_user } = useSelector((state) => state.get);
  const [productTypeList, setProductTypeList] = useState(product_type);
  const [priceUser, setPriceUser] = useState(id_price_user);
  const [formData, setFormData] = useState({
    id_type: "",
    kg: "",
    cbm: "",
  });
  const fetchData = async () => {
    await Service.getProductType(dispatch); // ดึงประเภทพัสดุ
    await Service.getPricePerUserId(user && user.id, dispatch); // ดึงประเภทพัสดุ
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProductTypeList(product_type);
  }, [product_type]);

  useEffect(() => {
    setPriceUser(id_price_user);
  }, [id_price_user]);

  console.log("id_price_user", priceUser);
  console.log("product_type", product_type);

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
                  <form /* onSubmit={handleSubmit} */>
                    <div className="form-group">
                      <div className="col-sm-12 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="name"
                          placeholder="ชื่อประเภทพัสดุ"
                          name="name"
                          /*  value={formData.name}
                          onChange={handleChange} */
                        />
                        {/*  {errors.name && (
                          <div className="error-from">{errors.name}</div>
                        )} */}
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
                          /*  value={formData.kg}
                          onChange={handleChange} */
                        />
                        {/*  {errors.kg && (
                          <div className="error-from">{errors.kg}</div>
                        )} */}
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
                          /*  value={formData.cbm}
                          onChange={handleChange} */
                        />
                        {/* {errors.cbm && (
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
export default CreatePricePreUser;
