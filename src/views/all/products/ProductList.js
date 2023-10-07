import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import DatePicker from "react-datepicker";
import ExcelExport from "./ExcelExport";

const ProductList = () => {
  const user = useSelector((state) => state.auth.user);
  const { status_list, product_type, status_code_data } = useSelector(
    (state) => state.post
  );
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, statusProduct } = useSelector((state) => state.post);
  const [productList, setProductList] = useState(product);
  const [statusProductList, setStatusProductList] = useState(statusProduct);
  const [codeData, setCodeData] = useState(status_code_data);
  const [userdata, setUserdata] = useState([]);

  const fetchData = async () => {
    const pro_log_1 = await Service.getProductType(dispatch); // ดึงประเภทสินค้า
    const pro_log_2 = await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
    const pro_log_3 = await Service.getProduct(dispatch); // ดึงสิค้า
    const pro_log_4 = await Service.getProductCode(user.id, dispatch); // ดึงรหัสพัสดุ
    const pro_log_5 = await Service.getCustomerCodeAll(dispatch); // ดึงประเภทพัสดุ

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
    setStatusList(status_list);
  }, [status_list]);

  useEffect(() => {
    setStatusProductList(statusProduct);
  }, [statusProduct]);

  useEffect(() => {
    setCodeData(status_code_data);
  }, [status_code_data]);

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
    console.log("name", name, value, id);
    const response = await Service.updateStatusProductList(id, value, dispatch);
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

  const systemUser = () => {
    return (
      <>
        <tbody>
          {productList &&
            productList
              .filter((product) => product.customer_code === user.customerCode)
              .map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
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
                        (status) => status.id === product.parcel_status
                      ) && (
                        <span>
                          {statusList &&
                            statusList.find(
                              (status) => status.id === product.parcel_status
                            ).statusProduct}
                        </span>
                      )}
                  </td>
                  <td>{product.quantity}</td>
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
      console.log(filteredProducts);

      setProductList(filteredProducts);
    } else {
      setProductList(product);
    }
  };
  const toTimeZone = (date, timeZone) => {
    const utcDate = zonedTimeToUtc(date, timeZone);
    return utcToZonedTime(utcDate, timeZone);
  };

  const handleDateChange = async (name, id, date) => {
    const thailandTimeZone = "Asia/Bangkok"; // โซนเวลาของประเทศไทย
    const zonedDate = toTimeZone(date, thailandTimeZone);

    if (name == "close_cabinet") {
      const response = await Service.updateProductDateCloseCabinet(
        id,
        zonedDate
      );
      if (response.status == "success") {
        fetchData();
      }
    } else {
      const response = await Service.updateProductDateToThailand(id, zonedDate);
      if (response.status == "success") {
        fetchData();
      }
    }
    /*   setFormData((prevState) => ({ ...prevState, [name]: zonedDate })); */
  };

  /* console.log("product.to_thailand", productList); */

  const systemAdmin = () => {
    return (
      <tbody>
        {productList &&
          productList.map((product, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{product.customer_code} </td>
              {/*   <td>{product.tech_china}</td> */}
              {/*       <td>{product.warehouse_code}</td>
            <td>{product.cabinet_number}</td> */}
              <td>
                {format(new Date(product.chinese_warehouse), "dd-MM-yyyy")}
              </td>
              <td>
                {/* {product.close_cabinet &&
                !["null", "NULL", ""].includes(product.close_cabinet)
                  ? format(new Date(product.close_cabinet), "dd-MM-yyyy")
                  : "N/A"} */}
                <DatePicker
                  placeholderText="Select date"
                  selected={
                    product &&
                    !["null", "NULL", ""].includes(product.close_cabinet)
                      ? new Date(product.close_cabinet)
                      : null
                  }
                  className="form-control form-control-user"
                  onChange={(date) =>
                    handleDateChange("close_cabinet", product.id, date)
                  }
                  dateFormat="dd/MM/yyyy"
                />
              </td>
              <td>
                {/*  {product.to_thailand &&
                  product.to_thailand &&
                  format(new Date(product.to_thailand), "dd-MM-yyyy")} */}
                {/* {
                  product.to_thailand &&
                  !["null", "NULL", ""].includes(product.to_thailand)
                    ? format(new Date(product.to_thailand), "dd-MM-yyyy")
                    : "N/A" 
                } */}

                <DatePicker
                  placeholderText="Select date"
                  selected={
                    product &&
                    !["null", "NULL", ""].includes(product.to_thailand)
                      ? new Date(product.to_thailand)
                      : null
                  }
                  className="form-control form-control-user"
                  onChange={(date) =>
                    handleDateChange("to_thailand", product.id, date)
                  }
                  dateFormat="dd/MM/yyyy"
                />
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
                  value={product.parcel_status || ""} // Use empty string instead of null
                  onChange={(event) =>
                    handleChangeStatus(
                      product.id,
                      event.target.name,
                      event.target.value
                    )
                  }
                  aria-label="Default select example"
                >
                  <option value="" disabled>
                    {" "}
                    {/* Use value="" to represent the default "Select" option */}
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
              </td>
              {/*   <td>{product.quantity}</td> */}
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
                  onClick={() => {
                    if (window.confirm("คุณต้องการลบ ข้อมูลใช่หรือไม่ ! ")) {
                      deleteProductList(product.id, product.image);
                    }
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    );
  };

  function Exportexcel() {
    useEffect(() => {
      const getuserdata = async () => {
        /* const userreq= await fetch("http://localhost/devopsdeveloper/users"); */
        const jsonData = [
          { name: "John", age: 30 },
          { name: "Jane", age: 25 },
          { name: "Bob", age: 35 },
        ];
        const userres = await jsonData.json();
        console.log(userres);
        setUserdata(userres);
      };
      getuserdata();
    }, []);
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800"></h1>

        <ExcelExport />
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
                <h6 className="m-0 font-weight-bold text-primary">
                  พัสดุทั้งหมด
                </h6>
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
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">รหัสลูกค้า</th>
                      {/*  <th scope="col">เเทคจีน</th> */}
                      {/*  <th scope="col">รหัสโกดัง</th>
            <th scope="col">เลขตู้</th> */}
                      <th scope="col">ถึงโกดังจีน</th>
                      <th scope="col">ปิดตู้</th>
                      <th scope="col">ถึงไทย</th>
                      <th scope="col">สถานะ</th>
                      {/*  <th scope="col">จำนวน</th> */}
                      {/*     <th scope="col">ขนาด</th>
            <th scope="col">คิวต่อชิ้น</th>
            <th scope="col">น้ำหนัก</th>
            <th scope="col">คิวรวม</th> */}
                      <th scope="col">ยอดชำระ จีน-ไทย</th>
                      <th scope="col">show</th>
                      {user.status != 0 && (
                        <>
                          <th scope="col">Edit</th>
                          <th scope="col">delete</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {user.status == 0 ? systemUser() : systemAdmin()}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
