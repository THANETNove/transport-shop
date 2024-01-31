import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PricePreUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users_code } = useSelector((state) => state.get);
  const [userCodeAll, setUserCodeAll] = useState(users_code);
  const [statusSuccess, setStatusSuccess] = useState(null);

  const fetchData = async () => {
    await Service.getCustomerCodeAll(dispatch); // ดึงประเภทพัสดุ
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUserCodeAll(users_code);
  }, [users_code]);

  const deleteUsersCode = async (e) => {
    const response = await Service.deleteUserCode(e, dispatch); //

    if (response.status == "success") {
      fetchData();
      setStatusSuccess("ลบเรียบร้อย");
      setTimeout(() => {
        setStatusSuccess(null);
      }, 1000);
    }
  };

  //getCustomerCodeAll
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              <Link className="btn btn-primary" to="/create-price-per-user">
                {t("price_per_user.price_per_user")}
              </Link>
              <span className="color-error">
                {statusSuccess && statusSuccess != null && statusSuccess}
              </span>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">{t("show_status.id")}</th>
                      <th scope="col">{t("customer_id")}</th>
                      <th scope="col">{t("create_product.parcel_type")}</th>
                      <th scope="col">{t("price_per_user.kg")}</th>
                      <th scope="col">{t("price_per_user.cbm")}</th>
                      <th scope="col">{t("product_list.edit")}</th>
                      <th scope="col">{t("create_product.delete")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCodeAll &&
                      userCodeAll.map((value, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.customerCode}</td>
                          <td>{value.name}</td>
                          <td>{value.kg}</td>
                          <td>{value.cbm}</td>
                          <td>
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                navigate(`/edit-price-per-user/${value.id}`)
                              }
                            >
                              {t("product_list.edit")}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (window.confirm(t("window.confirm"))) {
                                  deleteUsersCode(value.id);
                                }
                              }}
                            >
                              {t("create_product.delete")}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePreUser;
