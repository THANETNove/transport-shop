import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProductList() {
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
              {statusProductList == "success" && (
                <span className="color-success">
                  product added successfully!
                </span>
              )}
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">รหัสลูกค้า</th>
                      <th scope="col">เเทคจีน</th>
                      <th scope="col">รหัสโกดัง</th>
                      <th scope="col">เลขตู้</th>
                      <th scope="col">ถึงโกดังจีน</th>
                      <th scope="col">ปิดตู้</th>
                      <th scope="col">ถึงไทย</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">จำนวน</th>
                      <th scope="col">ขนาด</th>
                      <th scope="col">คิวต่อชิ้น</th>
                      <th scope="col">น้ำหนัก</th>
                      <th scope="col">คิวรวม</th>
                      <th scope="col">ยอดชำระค่าจัดส่ง จีน-ไทย</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList &&
                      productList.map((product, index) => (
                        <tr>
                          <th scope="row">{product.id /* index + 1 */}</th>
                          <td>{product.customer_code}</td>
                          <td>{product.tech_china}</td>
                          <td>{product.warehouse_code}</td>
                          <td>{product.cabinet_number}</td>
                          <td>{product.chinese_warehouse}</td>
                          <td>{product.close_cabinet}</td>
                          <td>{product.to_thailand}</td>
                          <td>{product.parcel_status}</td>
                          <td>{product.quantity}</td>
                          <td>{product.size}</td>
                          <td>{product.cue_per_piece}</td>
                          <td>{product.weight}</td>
                          <td>{product.total_queue}</td>
                          <td>
                            {product.payment_amount_chinese_thai_delivery}
                          </td>
                          <button
                            className="btn btn-danger"
                            onClick={() => getEdit(product.id)}
                          >
                            Edit
                          </button>
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
