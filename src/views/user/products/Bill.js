import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import DatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

const ProductList = () => {
  const user = useSelector((state) => state.auth.user);
  const { BillData } = useSelector((state) => state.get);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(BillData);
  const [showDataBill, setShowDataBill] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50; // จำนวนรายการต่อหน้า

  const fetchData = async () => {
    const pro_log_1 = await Service.getBill(user && user.id, dispatch);
    /* console.log("pro_log_1", pro_log_1); */
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(data);
  }, [BillData]);

  const showProduct = (event) => {
    document.getElementById("btn-exampleModal") &&
      document.getElementById("btn-exampleModal").click();
    setShowDataBill(event);
  };

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data && Object.values(data).slice(itemOffset, endOffset);
  const pageCount = Math.ceil(
    data && Object.values(data).length / itemsPerPage
  );
  const maxItemOffset = (pageCount - 1) * itemsPerPage;

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;

    setItemOffset(newOffset);
  };

  console.log("showDataBill", showDataBill);
  const systemUser = () => {
    return (
      <>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={item.billId} className="text-center">
                {/* Your table cell content here */}
                <th scope="row">{index + 1} </th>
                <td>{item.billId}</td>
                <td>{item.billUpdated_at}</td>
                <td>
                  {item.status == "รอตรวจสอบ"
                    ? item.status == "ตรวจสอบเเล้ว"
                      ? ""
                      : ""
                    : ""}
                  {item.status}
                </td>
                <a
                  className="btn btn-primary btn-sm"
                  onClick={() => showProduct(item.dataBill)}
                >
                  show
                </a>
              </tr>
            ))}
          {/* {data &&
            data.map((item, index) => (
              <tr key={item.id} className="text-center">
                 <th scope="row">{index + 1} </th>
                
                <td>{item.billId}</td>
                <td>{item.billUpdated_at}</td>
                <td>{item.status}</td>
                <a
                  className="btn btn-primary btn-sm"
                  onClick={() => showProduct(item.billId)}
                >
                  show
                </a>
              </tr>
            ))} */}
        </tbody>
      </>
    );
  };

  const searchData = (event) => {
    /*  const { value } = event.target;
    if (value) {
      const filteredProducts = productList.filter((product) =>
        product.customer_code.includes(value)
      );

      setProductList(filteredProducts);
    } else {
      setProductList(product);
    } */
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800"></h1>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <div className="col-md-6 col-sm-8 col-8">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control  background-white bg-light border-0 small"
                    placeholder="Search รหัสลูกค้า"
                    aria-label="Search"
                    onChange={searchData}
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">เลขที่</th>
                      <th scope="col">วันที่</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">show</th>
                    </tr>
                  </thead>
                  {systemUser()}
                </table>
              </div>
            </div>
          </div>
          {pageCount > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="Previous"
              containerClassName="pagination"
              activeClassName="active"
              pageLinkClassName="page-link"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              breakClassName="page-item disabled"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
            />
          )}
        </div>
      </div>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        id="btn-exampleModal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog   modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                ใบแจ้งหนี้/วางบิล ค่าขนส่ง ไทย - จีน
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="box-bill">
                <p>เลขที่/No 9289</p>
                <p>วันที่/Date 10-01-2023 00:18:29 น.</p>
              </div>
              <div className="row">
                <div className="col-6">
                  <h6 className="uppercase-text">medocargo THAILAND</h6>
                  <p>
                    เลขที่ 176/4-5 MUKDAHAN - DONTAN ROAD,SI BUN RUEANG MUEANG
                    MUKDAHAN,MUKDAHAN PROVINCE 49000 THAILAND
                  </p>
                  <p>TEL. 085-1122999</p>
                </div>
                <div className="col-6">
                  <h6 className="uppercase-text">รายละเอียดลูกค้า</h6>
                  <p>
                    ที่อยู่ คุณ จุฑามาศ 34/1 ต.แพรกษา อ.เมือง จ.สมุทรปราการ
                    รหัสไปรษณีย์ 10280
                  </p>
                  <p>TEL. 0918738739</p>
                </div>
                <div className="box-bill-add">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">รหัสสินค้า</th>
                        <th scope="col">เลขพัสดุ</th>
                        <th scope="col">รหัสลูกค้า</th>
                        <th scope="col">ประเภทพัสดุ</th>
                        <th scope="col">จำนวน</th>
                        <th scope="col">น้ำหนัก (กก)</th>
                        <th scope="col">ปริมาตร(คิว)</th>
                        <th scope="col">คิดจาก</th>
                        <th scope="col">ราคา</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showDataBill &&
                        showDataBill.map((item, index) => (
                          <tr>
                            <th scope="row">{item.warehouse_code}</th>
                            <td></td>
                            <td>{item.customer_code}</td>
                            <td>{item.product_type}</td>
                            <td>{item.quantity}</td>
                            <td>{item.total_weight}</td>
                            <td>{item.total_queue}</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <h6 className="uppercase-text">บิลส่งของ จัดส่งแล้ว</h6>
                  </div>
                  <div className="col-4">
                    <h6 className="uppercase-text">เรทค่านำเข้า</h6>
                    <div className="box-bill-add">
                      <table class="table  mt-3">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">จำนวน </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ปริมาตร(คิว) </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">น้ำหนัก </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดรวมค่านำเข้า จีน-ไทย </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดชำระทั้งหมด </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดชำระทั้งหมด </th>
                            <td>เลือกขนส่ง </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-4">
                    <h6 className="uppercase-text">สรุปรายการ</h6>
                    <div className="box-bill-add">
                      <table class="table  mt-3">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">จำนวน </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ปริมาตร(คิว) </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">น้ำหนัก </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดรวมค่านำเข้า จีน-ไทย </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดชำระทั้งหมด </th>
                            <td>Mark</td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดชำระทั้งหมด </th>
                            <td>เลือกขนส่ง </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
