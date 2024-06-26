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
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const { user_address } = useSelector((state) => state.get);
  const { status_list, product_type, status_code_data } = useSelector(
    (state) => state.post
  );
  const points = useSelector((state) => state.get.points);
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [statusBill, setStatusBill] = useState(false);
  const [errorMoney, setErrorMoney] = useState(null);
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
  const [price, sePrice] = useState(0);
  const itemsPerPage = 100; // จำนวนรายการต่อหน้า
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
    const getPoints = await Service.getPoints(user && user.id, dispatch);

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
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    /*   console.log(`Loading items from ${itemOffset} to ${endOffset}`); */
    let currentItems = productList && productList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(
      productList && productList.length / itemsPerPage
    );
    const maxItemOffset = (pageCount - 1) * itemsPerPage;

    setCurrentItems(currentItems);
    setPageCount(pageCount);
  }, [productList, itemOffset]);

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
        console.log("response2", response2);

        if (response2.status == "success") {
          setStatusModel(0);
        }
      }
    }
  };

  const handleAmount = async () => {
    const amount =
      selectedData &&
      selectedData
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
        .toFixed(2);

    sePrice(amount);
  };

  const handleSubmitBilling = async () => {
    /* const amount =
      selectedData &&
      Math.ceil(
        selectedData
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
      ); */

    console.log(
      "points.money > price",
      parseFloat(points.money),
      parseFloat(price)
    );
    if ((parseFloat(points.money), parseFloat(price))) {
      let point = parseFloat(points.money) - parseFloat(price);

      const response = await Service.createIssueBill(
        user && user.id,
        idAddress,
        selectedData,
        point,
        price,
        dispatch
      );
      console.log("response", response);
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
    } else {
      setErrorMoney(t("product_list_user.please_top_up"));
      setTimeout(() => {
        setErrorMoney(null);
      }, 3000);
    }
  };

  const searchData = (event) => {
    const { value } = event.target;

    if (value) {
      const filteredProducts = productList.filter((product) =>
        product.tech_china
          .trim()
          .toLowerCase()
          .includes(value.trim().toLowerCase())
      );

      setProductList(filteredProducts);
    } else {
      const filteredItems =
        product &&
        product.filter(
          (product) => product.customer_code === user.customerCode
        );
      setProductList(filteredItems);
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
                    <div className="form-check">
                      <input
                        className="form-check-input"
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
                      {t("product_list.show")}
                    </a>
                  </td>
                </tr>
              ))}
        </tbody>
      </>
    );
  };

  const newAddress = () => {
    return (
      <div className="row">
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("product_list_user.first_last_name")}
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={handleChangeAddress}
            placeholder={t("product_list_user.first_last_name")}
          />
          {errors.name && <div className="error-from">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("product_list_user.tel")}
          </label>
          <input
            type="text"
            name="tel"
            className="form-control"
            id="tel"
            onChange={handleChangeAddress}
            placeholder="เบอร์โทร"
          />
          {errors.tel && <div className="error-from">{errors.tel}</div>}
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            {t("address")}
          </label>
          <textarea
            className="form-control"
            name="address"
            onChange={handleChangeAddress}
            id="address"
            rows="3"
          ></textarea>
          {errors.address && <div className="error-from">{errors.address}</div>}
        </div>
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("subdistrict")}
          </label>
          <input
            type="text"
            name="subdistricts"
            className="form-control"
            id="subdistricts"
            onChange={handleChangeAddress}
            placeholder={t("subdistrict")}
          />
          {errors.subdistricts && (
            <div className="error-from">{errors.subdistricts}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("district")}
          </label>
          <input
            type="text"
            name="districts"
            className="form-control"
            id="districts"
            onChange={handleChangeAddress}
            placeholder={t("district")}
          />
          {errors.districts && (
            <div className="error-from">{errors.districts}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("province")}
          </label>
          <input
            type="text"
            name="provinces"
            className="form-control"
            id="provinces"
            onChange={handleChangeAddress}
            placeholder={t("province")}
          />
          {errors.provinces && (
            <div className="error-from">{errors.provinces}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="id_user" className="form-label">
            {t("zipCode")}
          </label>
          <input
            type="text"
            name="zip_code"
            className="form-control"
            id="zip_code"
            onChange={handleChangeAddress}
            placeholder={t("zipCode")}
          />
          {errors.zip_code && (
            <div className="error-from">{errors.zip_code}</div>
          )}
        </div>
      </div>
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
                  {t("product_list.add_parcel")}
                </Link>
              ) : (
                <>
                  <h6 className="m-0 font-weight-bold text-primary">
                    {t("product_list.all_parcel")}
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
                    onClick={() => handleAmount()}
                  >
                    {t("siaebar.issue_bil")}
                  </button>
                </>
              )}

              <div>
                {statusProductList == "success" && (
                  <span className="color-success">
                    {t("product_list.added_successfully")}
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
                    placeholder="Search เเทคจีน	"
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
              {statusBill && (
                <p style={{ color: "green" }}>
                  {t("product_list_user.bill_successfully")}
                </p>
              )}

              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={selectAll}
                            onChange={() => handleSelectAll()}
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            {t("product_list.all")}
                          </label>
                        </div>
                      </th>
                      <th scope="col">{t("customer_id")}</th>
                      <th scope="col">{t("product_list.chinese_tack")}</th>
                      <th scope="col">{t("product_list.chinese_warehouse")}</th>
                      <th scope="col">{t("product_list.close_cabinet")}</th>
                      <th scope="col">{t("product_list.to_thailand")}</th>
                      <th scope="col">{t("product_list.status")}</th>
                      <th scope="col">{t("create_product.quantity")}</th>
                      <th scope="col">{t("product_list.payment_amount")}</th>
                      <th scope="col">{t("product_list.show")}</th>
                    </tr>
                  </thead>
                  {systemUser()}
                </table>
              </div>
            </div>
          </div>
          {pageCount && pageCount > 1 && (
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
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {statusModel == 0
                  ? t("product_list_user.choose_address")
                  : t("product_list_user.add_address")}
              </h1>
              <p className="ml-3" style={{ color: "red" }}>
                {errorMoney}
              </p>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setStatusModel(0)}
              ></button>
            </div>
            <div className="modal-body">
              {statusModel == 0 ? (
                <div className="col-12">
                  <div className="col-12 mb-3 ">
                    <p style={{ fontSize: "24px", color: "darkred" }}>
                      ยอดบิลที่ต้องชำระ: {price.toLocaleString()} บาท
                    </p>
                  </div>
                  {addressData &&
                    addressData.map((item, index) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          onClick={() => setIdAddress(item.id)}
                          checked={idAddress === item.id}
                          name="idAddress"
                          id={`idAddress_${index}`}
                        />
                        <label className="form-check-label" for="idAddress">
                          {item.username}&nbsp; {item.tel}&nbsp; {item.address}
                          &nbsp;
                          {item.subdistricts}&nbsp; {item.districts} &nbsp;{" "}
                          {item.provinces}&nbsp;
                          {item.zip_code}
                        </label>
                      </div>
                    ))}

                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    onClick={() => setStatusModel(1)}
                  >
                    + {t("product_list_user.add_address")}
                  </button>
                </div>
              ) : (
                newAddress()
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="close-modal"
                className="btn btn-secondary"
                data-bs-dismiss={statusModel === 0 ? "modal" : undefined}
                onClick={statusModel === 0 ? null : () => setStatusModel(0)}
              >
                {t("product_list_user.close")}
              </button>
              <button
                type="button"
                className={
                  statusModel === 0
                    ? idAddress
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                    : "btn btn-primary"
                }
                onClick={
                  statusModel === 0
                    ? idAddress && handleSubmitBilling
                    : handleSubmitAddress
                }
              >
                {t("create_product.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
