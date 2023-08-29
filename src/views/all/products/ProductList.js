import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

export default function ProductList() {
  const { status_list, product_type } = useSelector((state) => state.post);
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, statusProduct } = useSelector((state) => state.post);
  const [productList, setProductList] = useState(product);
  const [statusProductList, setStatusProductList] = useState(statusProduct);

  useEffect(() => {
    const fetchData = async () => {
      await Service.getProductType(dispatch); // ดึงสถานะสิค้า
      await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
      await Service.getProduct(dispatch); // ดึงสิค้า
    };
    setTimeout(() => {
      dispatch({
        type: "STATUS_PRODUCT_SUCCESS",
        payload: "default",
      });
    }, 2000);
    fetchData();
  }, []);

  useEffect(() => {
    setStatusList(status_list)
  },[status_list]) 

  useEffect(() => {
    setStatusProductList(statusProduct);
  }, [statusProduct]);

  useEffect(() => {
    /*  getProduct */
    setProductList(product);
  }, [product]);

  const getEdit = async (id) => {
    console.log(id);
    const re = await Service.getProduct(dispatch); // ดึงสิค้า
    if (re.status == "success") {
      navigate(`/edit-product/${id}`);
    }
  };
  const showProduct = async (id) => {
    console.log(id);
    const re = await Service.getProduct(dispatch); // ดึงสิค้า
    if (re.status == "success") {
      navigate(`/show-product/${id}`);
    }
  };

  const deleteProductList = async (event, image) => {
    console.log(event, image);
    const response = await Service.deleteProduct(event, image, dispatch);
    if (response.status == "success") {
      setStatusSuccess(response.message);
      setStatusResponse(1);
    } else {
      setStatusSuccess(response.error);
      setStatusResponse(2);
    }
  };
  const handleChangeStatus = async (id, name, value) => {
    console.log( name, value ,id);
   const response = await Service.updateStatusProductList(id, name, value, dispatch);
     if (response.status == "success") {
      setStatusSuccess(response.message);
      setStatusResponse(1);
    } else {
      setStatusSuccess(response.error);
      setStatusResponse(2);
    }
  };

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
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50" /> Generate Report
        </a>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              <Link className="btn btn-primary" to="/create-product">
                เพิ่มพัสดุ
              </Link>
              <div>
                {statusProductList == "success" && (
                  <span className="color-success">
                    product added successfully!
                  </span>
                )}
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
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">รหัสลูกค้า</th>
                      <th scope="col">เเทคจีน</th>
                      {/*  <th scope="col">รหัสโกดัง</th>
                      <th scope="col">เลขตู้</th> */}
                      <th scope="col">ถึงโกดังจีน</th>
                      <th scope="col">ปิดตู้</th>
                      <th scope="col">ถึงไทย</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">จำนวน</th>
                      {/*     <th scope="col">ขนาด</th>
                      <th scope="col">คิวต่อชิ้น</th>
                      <th scope="col">น้ำหนัก</th>
                      <th scope="col">คิวรวม</th> */}
                      <th scope="col">ยอดชำระ จีน-ไทย</th>
                      <th scope="col">show</th>
                      <th scope="col">Edit</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList &&
                      productList.map((product, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{product.customer_code}</td>
                          <td>{product.tech_china}</td>
                          {/*       <td>{product.warehouse_code}</td>
                          <td>{product.cabinet_number}</td> */}
                          <td>
                            {format(
                              new Date(product.chinese_warehouse),
                              "dd-MM-yyyy"
                            )}
                          </td>
                          <td>
                            {format(
                              new Date(product.close_cabinet),
                              "dd-MM-yyyy"
                            )}
                          </td>
                          <td>
                            {format(
                              new Date(product.to_thailand),
                              "dd-MM-yyyy"
                            )}
                          </td>
                          <td>
                            {/*  {statusList &&
                              statusList.file(
                                (status) =>
                                  status.id == product.parcel_status &&
                                  status.statusProduct
                              )} */}
                            <select
                              className="form-control"
                              id="parcel_status"
                              name="parcel_status"
                              value={product.parcel_status}
                               onChange={(event) => handleChangeStatus(product.id, event.target.name, event.target.value)}
                              aria-label="Default select example"
                            >
                              <option selected disabled>
                                เลือก สถานะ
                              </option>
                              {statusList &&
                                statusList.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.id === product.parcel_status
                                      ? `Selected: ${status.statusProduct}`
                                      : status.statusProduct}
                                  </option>
                                ))}
                            </select>
                            {/* {product.parcel_status} */}
                          </td>
                          <td>{product.quantity}</td>
                          {/*     <td>{product.size}</td>
                          <td>{product.cue_per_piece}</td>
                          <td>{product.weight}</td>
                          <td>{product.total_queue}</td> */}
                          <td>
                            {parseFloat(
                              product.payment_amount_chinese_thai_delivery
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td>
                            <a
                              className="btn btn-primary btn-sm"
                              onClick={() => showProduct(product.id)}
                            >
                              show
                            </a>
                          </td>
                          <td>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => getEdit(product.id)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteProductList(product.id, product.image)
                              }
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
}
