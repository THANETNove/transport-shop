import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";

const ProductTypeList = () => {
  const dispatch = useDispatch();
  const productTypeListFromState = useSelector(
    (state) => state.post.product_type
  );
  const [productTypeList, setproductTypeList] = useState(
    productTypeListFromState
  );
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);

  const deleteProductType = async (event) => {
    const response = await Service.deleteProductTypeList(event, dispatch);
    console.log("response", response);
    if (response.status == "success") {
      setStatusSuccess(response.message);
      setStatusResponse(1);
    } else {
      setStatusSuccess(response.error);
      setStatusResponse(2);
    }
  };

  useEffect(() => {
    setproductTypeList(productTypeListFromState);
    setStatusResponse(1);
    setStatusSuccess("product type added successfully!");
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

  console.log(useSelector((state) => ({ ...state })));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มสินค้า</h6> */}
              <Link className="btn btn-primary" to="/create-product-type">
                เพิ่ม ประเภทสินค้า
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
                      <th scope="col">id</th>
                      <th scope="col">ชื่อ ประเภทสินค้า</th>
                      <th scope="col">KG</th>
                      <th scope="col">CBM</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTypeList &&
                      productTypeList.map((status, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{status.name}</td>
                          <td>{status.kg}</td>
                          <td>{status.cbm}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "คุณต้องการลบ ข้อมูลใช่หรือไม่ ! "
                                  )
                                ) {
                                  deleteProductType(status.id);
                                }
                              }}
                            >
                              delete
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
