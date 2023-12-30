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
  const [showIdBill, setShowIdBill] = useState(null);
  const [showAddress, setShowAddress] = useState(null);
  const [showSubdistricts, setShowSubdistricts] = useState(null);
  const [showDistricts, setShowDistricts] = useState(null);
  const [showProvinces, setShowProvinces] = useState(null);
  const [showZip_code, setShowZip_code] = useState(null);
  const [showTel, setShowTel] = useState(null);
  const [showUsername, setShowUsername] = useState(null);
  const [showUpdated_atBill, setShowUpdated_atBill] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50; // จำนวนรายการต่
  const { users_code } = useSelector((state) => state.get);
  const [userCode, setUserCode] = useState(users_code);
  const [showImage, setShowImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const url = Service.getUrlImage();
  const fetchData = async () => {
    const pro_log_1 = await Service.getBill(user && user.id, dispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setUserCode(users_code);
  }, [users_code]);

  useEffect(() => {
    setData(BillData);
  }, [BillData]);

  const showProduct = (
    dataBill,
    billId,
    billUpdated_at,
    address,
    subdistricts,
    districts,
    provinces,
    zip_code,
    tel,
    username,
    image
  ) => {
    document.getElementById("btn-exampleModal") &&
      document.getElementById("btn-exampleModal").click();
    setShowDataBill(dataBill);
    setShowIdBill(billId);
    setShowAddress(address);
    setShowSubdistricts(subdistricts);
    setShowDistricts(districts);
    setShowProvinces(provinces);
    setShowZip_code(zip_code);
    setShowTel(tel);
    setShowUsername(username);
    setShowImage(image);
    setShowUpdated_atBill(billUpdated_at);
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

  const formatDateTime = (originalDate) => {
    const dateTime = new Date(originalDate);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = dateTime
      .toLocaleString("en-GB", options)
      .replace(/, /g, " ")
      .replace(/\//g, "-");
    return formattedDate;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const searchData = (event) => {
    const { value } = event.target;
    setData(BillData);

    if (value) {
      const filteredProducts = Object.values(data).filter(
        (item) => item.billId == value
      );
      if (filteredProducts.length > 0) {
        setData(filteredProducts);
      } else {
        const filteredDate = Object.values(data).filter((item) => {
          const itemDate = new Date(item.billUpdated_at.split(" ")[0]); // Convert to Date object
          const targetDate = new Date(value); // Convert to Date object

          return itemDate.getTime() === targetDate.getTime();
        });
        if (filteredDate.length > 0) {
          setData(filteredDate);
        }
      }
    }
  };

  const totalQuantity =
    showDataBill &&
    showDataBill.reduce((acc, item) => {
      const quantity = parseInt(item.quantity, 10); // แปลงเป็นตัวเลข
      if (!isNaN(quantity)) {
        return acc + quantity;
      }
      return acc;
    }, 0);

  const totalWeight =
    showDataBill &&
    showDataBill.reduce((acc, item) => {
      const weight = parseFloat(item.total_weight, 10); // แปลงเป็นตัวเลข
      if (!isNaN(weight)) {
        return acc + weight;
      }
      return acc;
    }, 0);

  const totalQueue =
    showDataBill &&
    showDataBill
      .reduce((acc, item) => {
        const quantity = parseFloat(item.total_queue, 10); // แปลงเป็นตัวเลข
        if (!isNaN(quantity)) {
          return acc + quantity;
        }
        return acc;
      }, 0)
      .toFixed(2);

  const paymentAmountChineseThaiDelivery =
    showDataBill &&
    Math.ceil(
      showDataBill
        .reduce((acc, item) => {
          const amount = parseFloat(
            item.payment_amount_chinese_thai_delivery,
            10
          ); // แปลงเป็นตัวเลข
          if (!isNaN(amount)) {
            return acc + amount;
          }
          return acc;
        }, 0)
        .toFixed(2)
    );

  const systemUser = () => {
    const sortedItems =
      currentItems &&
      [...currentItems].sort((a, b) => {
        // Convert strings to Date objects for comparison
        const dateA = new Date(a.billUpdated_at);
        const dateB = new Date(b.billUpdated_at);

        // Compare dates in descending order
        return dateB - dateA;
      });
    return (
      <>
        <tbody>
          {sortedItems &&
            sortedItems.map((item, index) => (
              <tr key={item.billId} className="text-center">
                {/* Your table cell content here */}
                <th scope="row">{index + 1} </th>
                <td>{item.billId}</td>
                <td>
                  {" "}
                  {
                    item.billUpdated_at /* formatDateTime(item.billUpdated_at) */
                  }
                </td>
                <td>
                  {item.status == "รอตรวจสอบ" && (
                    <p style={{ color: "#858796" }}> {item.status}</p>
                  )}
                  {item.status == "รอจัดส่ง" && (
                    <p style={{ color: "#4e73df" }}> {item.status}</p>
                  )}
                  {item.status == "จัดส่งเเล้ว" && (
                    <p style={{ color: "#1cc88a" }}> {item.status}</p>
                  )}
                  {item.status == "ถูกยกเลิก" && (
                    <p style={{ color: "#FF0000" }}> {item.status}</p>
                  )}
                </td>
                <a
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    showProduct(
                      item.dataBill,
                      item.billId,
                      item.billUpdated_at,
                      item.address,
                      item.subdistricts,
                      item.districts,
                      item.provinces,
                      item.zip_code,
                      item.tel,
                      item.username,
                      item.billImage
                    )
                  }
                >
                  show
                </a>
              </tr>
            ))}
        </tbody>
      </>
    );
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
                    placeholder="Search เลขที่ หรือ 2023-12-21"
                    aria-label="Search"
                    /*   value={searchText} */
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
        className="btn btn-primary"
        data-bs-toggle="modal"
        id="btn-exampleModal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog   modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                ใบแจ้งหนี้/วางบิล ค่าขนส่ง ไทย - จีน
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="box-bill">
                    <p>เลขที่/No {showIdBill && showIdBill}</p>
                    <p>
                      วันที่/Date {showUpdated_atBill && showUpdated_atBill} น.
                    </p>
                  </div>
                  <h6 className="uppercase-text mb-4">MEDO INTERNATIONAL</h6>
                  {/* <p>MEDO INTERNATIONAL</p> */}
                  {/*  <p>TEL. 085-1122999</p> */}
                </div>
                <div className="col-6">
                  <h6 className="uppercase-text">รายละเอียดลูกค้า</h6>
                  <p>
                    ที่อยู่ คุณ {showUsername}&nbsp; &nbsp; {showAddress}&nbsp;
                    &nbsp; เเขวง/ตำบล.
                    {showSubdistricts}&nbsp; &nbsp; เขต/อำเภอ.
                    {showDistricts}&nbsp; &nbsp; จ.{showProvinces}&nbsp; &nbsp;
                    รหัสไปรษณีย์ {showZip_code}
                  </p>
                  <p>TEL. {showTel}</p>
                </div>
                <div className="table-responsive box-bill-add">
                  <table className="table">
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
                            <td>
                              {Number(item.total_weight).toLocaleString()}
                            </td>
                            <td>{Number(item.total_queue).toLocaleString()}</td>
                            <td>{item.thinkingFrom}</td>
                            <td>
                              {Number(
                                item.payment_amount_chinese_thai_delivery
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="row mt-4">
                  <div className="col-3">
                    <h6 className="uppercase-text">บิลส่งของ จัดส่งแล้ว</h6>

                    {showImage && (
                      <a
                        href={url + showImage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={url + showImage}
                          alt="Enlarged Image"
                          className="img-fluid"
                        />
                      </a>
                    )}
                  </div>
                  <div className="col-4">
                    <h6 className="uppercase-text">เรทค่านำเข้า</h6>
                    <div className="table-responsive box-bill-add">
                      <table className="table  mt-3">
                        <tbody>
                          {userCode &&
                            userCode
                              .filter(
                                (type) =>
                                  showDataBill &&
                                  showDataBill[0].customer_code ==
                                    type.customerCode
                              )
                              .map((type, index) => (
                                /*   <option
                                  key={index}
                                  value={`${type.id_type} ${type.kg} ${type.cbm}`}
                                >
                                  {type.name}
                                </option> */
                                <tr>
                                  <th scope="row"> {type.name}</th>
                                  <td>
                                    {`"KG":  ${type.kg},  "CBM" : ${type.cbm} `}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-5">
                    <h6 className="uppercase-text">สรุปรายการ</h6>

                    <div className="table-responsive box-bill-add">
                      <table className="table  mt-3">
                        <tbody>
                          <tr>
                            <th scope="row">จำนวน </th>
                            <td>{totalQuantity} กล่อง</td>
                          </tr>
                          <tr>
                            <th scope="row">ปริมาตร(คิว) </th>
                            <td>
                              {totalQueue && totalQueue.toLocaleString()} CBM
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">น้ำหนัก </th>
                            <td>
                              {totalWeight && totalWeight.toLocaleString()} kg
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดรวมค่านำเข้า จีน-ไทย </th>
                            <td>
                              {paymentAmountChineseThaiDelivery &&
                                paymentAmountChineseThaiDelivery.toLocaleString()}{" "}
                              บาท
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">ยอดชำระทั้งหมด </th>
                            <td>
                              {paymentAmountChineseThaiDelivery &&
                                paymentAmountChineseThaiDelivery.toLocaleString()}{" "}
                              บาท ( ชำระแล้ว)
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">เลือกขนส่ง </th>
                            <td>นัดรับ</td>
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
