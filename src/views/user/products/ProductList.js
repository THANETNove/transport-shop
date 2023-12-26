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
  const { user_address } = useSelector((state) => state.get);
  const { status_list, product_type, status_code_data } = useSelector(
    (state) => state.post
  );
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);
  const [statusBill, setStatusBill] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, statusProduct } = useSelector((state) => state.post);
  const [productList, setProductList] = useState(null);
  const [statusProductList, setStatusProductList] = useState(statusProduct);
  const [codeData, setCodeData] = useState(status_code_data);
  const [userdata, setUserdata] = useState([]);
  const [addressData, setAddressData] = useState(user_address);
  const [idAddress, setIdAddress] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50; // จำนวนรายการต่อหน้า
  const [selectedData, setSelectedData] = useState([]); // ข้อมูลที่ถูกเลือก
  const [statusModel, setStatusModel] = useState(0); // ข้อมูลที่ถูกเลือก

  const [formData, setFormData] = useState({
    id_user: user && user.id,
    name: "",
    tel: "",
    address: "",
    subdistricts: "",
    districts: "",
    provinces: "",
    zip_code: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    tel: "",
    address: "",
    subdistricts: "",
    districts: "",
    provinces: "",
    zip_code: "",
  });

  const fetchData = async () => {
    const pro_log_1 = await Service.getProductType(dispatch); // ดึงประเภทสินค้า
    const pro_log_2 = await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
    const pro_log_3 = await Service.getProduct(dispatch); // ดึงสิค้า
    const pro_log_4 = await Service.getProductCode(user.id, dispatch); // ดึงรหัสพัสดุ
    const pro_log_5 = await Service.getCustomerCodeAll(dispatch); // ดึงประเภทพัสดุ
    const pro_log_6 = await Service.getAddress(user && user.id, dispatch);

    setTimeout(() => {
      dispatch({
        type: "STATUS_PRODUCT_SUCCESS",
        payload: "default",
      });
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setAddressData(user_address);
  }, [user_address]);

  useEffect(() => {
    setStatusList(status_list);
  }, [status_list]);

  useEffect(() => {
    setStatusProductList(statusProduct);
  }, [statusProduct]);

  useEffect(() => {
    setCodeData(status_code_data);
  }, [status_code_data]);

  useEffect(() => {
    set_product();
  }, []);

  useEffect(() => {
    set_product();
  }, [product]);

  const set_product = () => {
    const filteredItems =
      product &&
      product.filter((product) => product.customer_code === user.customerCode);
    setProductList(filteredItems);
  };

  const showProduct = async (id) => {
    const re = await Service.getProduct(dispatch); // ดึงสิค้า
    if (re.status == "success") {
      navigate(`/show-product/${id}`);
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

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = productList && productList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productList && productList.length / itemsPerPage);
  const maxItemOffset = (pageCount - 1) * itemsPerPage;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;

    setItemOffset(newOffset);
  };

  const handleCheckboxChange = (item) => {
    const selectedIndex = selectedData.indexOf(item);
    if (selectedIndex === -1) {
      // เพิ่มข้อมูลเข้าใน selectedData
      setSelectedData([...selectedData, item]);
    } else {
      // ลบข้อมูลออกจาก selectedData
      const updatedData = [...selectedData];
      updatedData.splice(selectedIndex, 1);
      setSelectedData(updatedData);
    }
  };

  const [selectAll, setSelectAll] = useState(false);

  // ... (โค้ดที่เหลือ)

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedData(selectAll ? [] : productList);
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    /*    name: "",
    tel: "",
    address: "",
    subdistricts: "",
    districts: "",
    provinces: "",
    zip_code: "", */
    //  validation
    if (!formData.name.trim()) {
      newErrors.name = "name is required";
      isValid = false;
    }

    //  validation
    if (!formData.tel.trim()) {
      newErrors.tel = "tel is required";
      isValid = false;
    }

    //  validation
    if (!formData.address.trim()) {
      newErrors.address = "address is required";
      isValid = false;
    }

    //  validation
    if (!formData.subdistricts.trim()) {
      newErrors.subdistricts = "subdistricts is required";
      isValid = false;
    }
    //  validation
    if (!formData.districts.trim()) {
      newErrors.districts = "districts is required";
      isValid = false;
    }
    //  validation
    if (!formData.provinces.trim()) {
      newErrors.provinces = "provinces is required";
      isValid = false;
    }
    //  validation
    if (!formData.zip_code.trim()) {
      newErrors.zip_code = "zip_code is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitAddress = async (event) => {
    event.preventDefault();

    if (validate()) {
      const response = await Service.createAddress(formData, dispatch);
      if (response.status == "success") {
        const response2 = await Service.getAddress(user && user.id, dispatch);
        console.log("response", response);
        if (response2.status == "success") {
          setStatusModel(0);
        }
      }
    }
  };

  const handleSubmitBilling = async () => {
    const response = await Service.createIssueBill(
      user && user.id,
      idAddress,
      selectedData,
      dispatch
    );
    if (response.status == "success") {
      fetchData();
      setStatusModel(0);
      setIdAddress(null);
      setSelectedData([]);
      document.getElementById("close-modal") &&
        document.getElementById("close-modal").click();
      setStatusBill(true);
      setTimeout(() => {
        setStatusBill(false);
      }, 3000);
    }
  };

  const systemUser = () => {
    return (
      <>
        <tbody>
          {currentItems &&
            currentItems
              .filter((product) => product.customer_code === user.customerCode)
              .map((product, index) => (
                <tr key={product.id} className="text-center">
                  <th scope="row">{index + 1}</th>
                  <th>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={selectedData.includes(product)}
                        onChange={() => handleCheckboxChange(product)}
                      />
                    </div>
                  </th>
                  <td>{product.customer_code}</td>
                  <td>{product.tech_china}</td>
                  <td>
                    {format(new Date(product.chinese_warehouse), "dd-MM-yyyy")}
                  </td>
                  <td>
                    {product.close_cabinet &&
                    !["null", "NULL", ""].includes(product.close_cabinet)
                      ? format(new Date(product.close_cabinet), "dd-MM-yyyy")
                      : "N/A"}
                  </td>
                  <td>
                    {
                      product.to_thailand &&
                      !["null", "NULL", ""].includes(product.to_thailand)
                        ? format(new Date(product.to_thailand), "dd-MM-yyyy")
                        : "N/A" /* หรือข้อความอื่น ๆ ที่คุณต้องการแสดงถ้าเป็นค่า null, "NULL", หรือค่าว่าง */
                    }
                  </td>
                  <td>
                    {statusList &&
                      statusList.find(
                        (status) => status.id == product.parcel_status
                      ) && (
                        <span>
                          {statusList &&
                            statusList.find(
                              (status) => status.id == product.parcel_status
                            ).statusProduct}
                        </span>
                      )}
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.payment_amount_chinese_thai_delivery.length > 0 &&
                      parseFloat(
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
                </tr>
              ))}
        </tbody>
      </>
    );
  };

  const searchData = (event) => {
    const { value } = event.target;
    if (value) {
      const filteredProducts = productList.filter((product) =>
        product.customer_code.includes(value)
      );

      setProductList(filteredProducts);
    } else {
      setProductList(product);
    }
  };

  const newAddress = () => {
    return (
      <>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            ชื่อ นามสกุล
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="name"
            onChange={handleChangeAddress}
            placeholder="ชื่อ นามสกุล"
          />
          {errors.name && <div className="error-from">{errors.name}</div>}
        </div>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            เบอร์โทร
          </label>
          <input
            type="text"
            name="tel"
            class="form-control"
            id="tel"
            onChange={handleChangeAddress}
            placeholder="เบอร์โทร"
          />
          {errors.tel && <div className="error-from">{errors.tel}</div>}
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            ที่อยู่
          </label>
          <textarea
            class="form-control"
            name="address"
            onChange={handleChangeAddress}
            id="address"
            rows="3"
          ></textarea>
          {errors.address && <div className="error-from">{errors.address}</div>}
        </div>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            เเขวง/ตำบล
          </label>
          <input
            type="text"
            name="subdistricts"
            class="form-control"
            id="subdistricts"
            onChange={handleChangeAddress}
            placeholder="เเขวง/ตำบล"
          />
          {errors.subdistricts && (
            <div className="error-from">{errors.subdistricts}</div>
          )}
        </div>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            เขต/อำเภอ
          </label>
          <input
            type="text"
            name="districts"
            class="form-control"
            id="districts"
            onChange={handleChangeAddress}
            placeholder="เขต/อำเภอ"
          />
          {errors.districts && (
            <div className="error-from">{errors.districts}</div>
          )}
        </div>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            จังหวัด
          </label>
          <input
            type="text"
            name="provinces"
            class="form-control"
            id="provinces"
            onChange={handleChangeAddress}
            placeholder="จังหวัด"
          />
          {errors.provinces && (
            <div className="error-from">{errors.provinces}</div>
          )}
        </div>
        <div class="mb-3">
          <label for="id_user" class="form-label">
            รหัสไปรษณีย์
          </label>
          <input
            type="text"
            name="zip_code"
            class="form-control"
            id="zip_code"
            onChange={handleChangeAddress}
            placeholder="รหัสไปรษณีย์"
          />
          {errors.zip_code && (
            <div className="error-from">{errors.zip_code}</div>
          )}
        </div>
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
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              {user.status != 0 ? (
                <Link className="btn btn-primary" to="/create-product">
                  เพิ่มพัสดุ
                </Link>
              ) : (
                <>
                  <h6 className="m-0 font-weight-bold text-primary">
                    พัสดุทั้งหมด
                  </h6>
                  <button
                    type="button"
                    className={
                      selectedData.length > 0
                        ? "btn btn-info"
                        : "btn btn-secondary"
                    }
                    data-bs-toggle={selectedData.length > 0 ? "modal" : ""}
                    data-bs-target={
                      selectedData.length > 0 ? "#exampleModal" : ""
                    }
                  >
                    ออกบิล
                  </button>
                </>
              )}

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
              {statusBill && <p style={{ color: "green" }}>ออกบิลสำเร็จ</p>}

              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={selectAll}
                            onChange={() => handleSelectAll()}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            All
                          </label>
                        </div>
                      </th>
                      <th scope="col">รหัสลูกค้า</th>
                      <th scope="col">เเทคจีน</th>
                      <th scope="col">ถึงโกดังจีน</th>
                      <th scope="col">ปิดตู้</th>
                      <th scope="col">ถึงไทย</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">จำนวน</th>
                      <th scope="col">ยอดชำระ จีน-ไทย</th>
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

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {statusModel == 0 ? "เลือกที่อยู่" : "เพิ่มที่อยู่"}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setStatusModel(0)}
              ></button>
            </div>
            <div class="modal-body">
              {statusModel == 0 ? (
                <>
                  {addressData &&
                    addressData.map((item, index) => (
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          onClick={() => setIdAddress(item.id)}
                          checked={idAddress === item.id}
                          name="idAddress"
                          id={`idAddress_${index}`}
                        />
                        <label class="form-check-label" for="idAddress">
                          {item.username}&nbsp; {item.tel}&nbsp; {item.address}
                          &nbsp;
                          {item.subdistricts}&nbsp; {item.districts} &nbsp;{" "}
                          {item.provinces}&nbsp;
                          {item.zip_code}
                        </label>
                      </div>
                    ))}

                  <button
                    class="btn btn-primary mt-3"
                    type="submit"
                    onClick={() => setStatusModel(1)}
                  >
                    + เพิ่มที่อยู่
                  </button>
                </>
              ) : (
                newAddress()
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="close-modal"
                class="btn btn-secondary"
                data-bs-dismiss={statusModel === 0 ? "modal" : undefined}
                onClick={statusModel === 0 ? null : () => setStatusModel(0)}
              >
                Close
              </button>
              <button
                type="button"
                class={idAddress ? "btn btn-primary" : "btn btn-secondary"}
                onClick={
                  statusModel === 0
                    ? idAddress && handleSubmitBilling
                    : handleSubmitAddress
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
