import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ProductTypeList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productTypeListFromState = useSelector(
    (state) => state.post.product_type
  );
  const [productTypeList, setProductTypeList] = useState(
    productTypeListFromState
  );
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);

  const deleteProductType = async (event) => {
    const response = await Service.deleteProductTypeList(event, dispatch);
    if (response.status == "success") {
      setStatusSuccess(response.message);
      setStatusResponse(1);
    } else {
      setStatusSuccess(response.error);
      setStatusResponse(2);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Service.getProductType(dispatch); // ดึงประเภทพัสดุ
    };

    fetchData();
  }, []);

  useEffect(() => {
    setProductTypeList(productTypeListFromState);
  }, [productTypeListFromState]);

  useEffect(() => {
    setTimeout(() => {
      setStatusSuccess(null);
    }, 1000);
  }, [statusSuccess]);

  useEffect(() => {
    setTimeout(() => {
      setStatusResponse(null);
    }, 1000);
  }, [statusSuccess]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              <Link className="btn btn-primary" to="/create-product-type">
                {t("product_type.add_parcel_type")}
              </Link>
              <span
                className={
                  statusResponse == "1"
                    ? "color-success"
                    : statusResponse == "2" && "color-error"
                }
              >
                {statusSuccess && statusSuccess != null && statusSuccess}
              </span>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">{t("show_status.id")}</th>
                      <th scope="col">{t("create_product.parcel_type")}</th>
                      <th scope="col">{t("product_list.edit")}</th>
                      <th scope="col">{t("create_product.delete")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTypeList &&
                      productTypeList.map((status, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{status.name}</td>

                          <td>
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                navigate(`/edit-product-type/${status.id}`)
                              }
                            >
                              {t("product_list.edit")}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (window.confirm(t("product_list.delete"))) {
                                  deleteProductType(status.id);
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
export default ProductTypeList;
