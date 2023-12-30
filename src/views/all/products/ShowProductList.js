import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../../server_api/server";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

const ShowProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, statusProduct, status_list, product_type } = useSelector(
    (state) => state.post
  );
  const user = useSelector((state) => state.auth.user);
  const [productList, setProductList] = useState(null);
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [preview, setPreview] = useState(null);
  const [inputFields, setInputFields] = useState(null);

  const url = Service.getUrlImage();


  const { id } = useParams();

  const [formData, setFormData] = useState({
    idProduct: "",
    customer_code: "",
    tech_china: "",
    warehouse_code: "",
    cabinet_number: "",
    chinese_warehouse: "",
    close_cabinet: "",
    to_thailand: "",
    parcel_status: "",
    quantity: "",
    size: "",
    cue_per_piece: "",
    weight: "",
    total_queue: "",
    payment_amount_chinese_thai_delivery: "",
    product_type: "",
    image: null,
    status_recorder: "",
  });

  useEffect(() => {
    const result = product && product.find((product) => product.id == id);
    setProductList(result);
  }, [id]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      idProduct: productList && productList.id,
      customer_code: productList && productList.customer_code,
      tech_china: productList && productList.tech_china,
      warehouse_code: productList && productList.warehouse_code,
      cabinet_number: productList && productList.cabinet_number,
      chinese_warehouse: new Date(productList && productList.chinese_warehouse), // date
      close_cabinet:
        productList && !["null", "NULL", ""].includes(productList.close_cabinet)
          ? new Date(productList.close_cabinet)
          : null, // date
      to_thailand:
        productList && !["null", "NULL", ""].includes(productList.to_thailand)
          ? new Date(productList.to_thailand)
          : null,
      parcel_status:
        productList && productList.parcel_status
          ? productList.parcel_status
          : null,
      quantity: productList && productList.quantity,
      wide_size: productList && productList.wide_size,
      long_size: productList && productList.long_size,
      height_size: productList && productList.height_size,
      cue_per_piece: productList && productList.cue_per_piece,
      weight: productList && productList.weight,
      total_weight: productList && productList.total_weight,
      total_queue: productList && productList.total_queue,
      payment_amount_chinese_thai_delivery:
        productList && productList.payment_amount_chinese_thai_delivery,
      product_type: productList && productList.product_type,
      old_image: productList && productList.image,
      status_recorder: user.status,
    }));

    setInputFields(productList && JSON.parse(productList.inputFields));
  }, [productList]);


  return (
    <>
      <div className="container-fluidaa">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  รายละเอียดพัสดุ
                </h6>
              </div>

              <div className="card-body ">
                <div className="d-flex justify-content-center">
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-labe"
                          >
                            รหัสลูกค้า
                          </label>
                          <p className="form-control form-control-user">
                            {formData.customer_code}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-labe"
                          >
                            เเทคจีน
                          </label>
                          <p className="form-control form-control-user">
                            {formData.tech_china}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            รหัสโกดัง
                          </label>
                          <p className="form-control form-control-user">
                            {formData.warehouse_code}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-labe"
                          >
                            เลขตู้
                          </label>
                          <p className="form-control form-control-user">
                            {formData.cabinet_number}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label mr-4"
                          >
                            ถึงโกดังจีน
                          </label>
                          <p className="form-control form-control-user">
                            {formData.chinese_warehouse
                              ? format(formData.chinese_warehouse, "dd-MM-yyyy")
                              : ""}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6 ">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label mr-5"
                          >
                            ปิดตู้
                          </label>
                          <p className="form-control form-control-user">
                            {formData.close_cabinet
                              ? format(formData.close_cabinet, "dd-MM-yyyy")
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label mr-5"
                          >
                            ถึงไทย
                          </label>
                          <p className="form-control form-control-user">
                            {formData.to_thailand
                              ? format(formData.to_thailand, "dd-MM-yyyy")
                              : ""}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label mr-5"
                          >
                            สถานะ
                          </label>
                          <select
                            className="form-control"
                            id="parcel_status"
                            name="parcel_status"
                            value={formData.parcel_status}
                            aria-label="Default select example"
                            disabled
                          >
                            <option selected>เลือก สถานะ</option>
                            {statusList &&
                              statusList.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.id === formData.parcel_status
                                    ? `Selected: ${status.statusProduct}`
                                    : status.statusProduct}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            จำนวน
                          </label>
                          <p className="form-control form-control-user">
                            {formData.quantity}
                          </p>
                        </div>

                        {inputFields != null ? (
                          <>
                            {inputFields &&
                              inputFields.map((inputField, index) => (
                                <>
                                  <div className="col-sm-6  col-md-6 col-lg-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      ขนาดความกว้างชิ้นที่ {index + 1}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control form-control-user"
                                      id="wide_size"
                                      placeholder={`ขนาดความกว้างชิ้นที่ ${
                                        index + 1
                                      }`}
                                      name="wide_size"
                                      value={inputField.wideSize}
                                    />
                                  </div>
                                  <div className="col-sm-6  col-md-6 col-lg-6 mt-3">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      ขนาดความยาวชิ้นที่ {index + 1}
                                    </label>
                                    <input
                                      type="long_size"
                                      className="form-control form-control-user"
                                      id="long_size"
                                      placeholder={`ขนาดความยาวชิ้นที่ ${
                                        index + 1
                                      }`}
                                      name="long_size"
                                      value={inputField.lengthSize}
                                    />
                                  </div>
                                  <div className="col-sm-6  col-md-6 col-lg-6  mt-3">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      ขนาดความสุงชิ้นที่ {index + 1}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control form-control-user"
                                      id="height_size"
                                      placeholder={`ขนาดความสุงชิ้นที่ ${
                                        index + 1
                                      }`}
                                      name="height_size"
                                      value={inputField.heightSize}
                                    />
                                  </div>

                                  <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label mt-3"
                                    >
                                      คิวชิ้นที่ {index + 1}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control form-control-user"
                                      id="cue_per_piece"
                                      name="cue_per_piece"
                                      /*  value={formData.cue_per_piece} */
                                      placeholder={`คิวต่อชิ้นที่ ${index + 1}`}
                                      value={inputField.cuePerPiece}
                                    />
                                  </div>
                                  <div className="col-sm-6  col-md-6 col-lg-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      น้ำหนักชิ้นที่ {index + 1}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control form-control-user"
                                      id="weight"
                                      name="weight"
                                      placeholder={`น้ำหนัก ชิ้นที่ ${
                                        index + 1
                                      }`}
                                      value={inputField.weightFields}
                                    />
                                  </div>
                                </>
                              ))}
                          </>
                        ) : (
                          <>
                            <div className="col-sm-6  col-md-6 col-lg-6">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                ขนาดกว้าง
                              </label>
                              <p className="form-control form-control-user">
                                {formData.wide_size}
                              </p>
                            </div>

                            <div className="form-group row">
                              <div className="col-12  mb-3 mb-sm-0">
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  ขนาดยาว
                                </label>
                                <p className="form-control form-control-user">
                                  {formData.long_size}
                                </p>
                              </div>
                              <div className="col-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  ขนาดสุง
                                </label>
                                <p className="form-control form-control-user">
                                  {formData.height_size}
                                </p>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-12 ml-3">
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  คิวต่อชิ้น
                                </label>
                                <p className="form-control form-control-user">
                                  {formData.cue_per_piece}
                                </p>
                              </div>
                              <div className="col-12 ml-3">
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  น้ำหนักต่อชิ้น
                                </label>
                                <p className="form-control form-control-user">
                                  {formData.weight}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            น้ำหนักรวม
                          </label>

                          <p className="form-control form-control-user">
                            {formData.total_weight}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            คิวรวม
                          </label>

                          <p className="form-control form-control-user">
                            {formData.total_queue}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            เลือกประเภทพัสดุ
                          </label>
                          <select
                            className="form-control"
                            id="product_type"
                            name="product_type"
                            value={formData.product_type}
                            aria-label="Default select example"
                            disabled
                          >
                            <option selected disabled>
                              เลือกประเภทพัสดุ
                            </option>
                            {productType &&
                              productType.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.id === formData.product_type
                                    ? `Selected: ${type.name}`
                                    : type.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            ยอดชำระค่าจัดส่ง จีน-ไทย
                          </label>
                          <p className="form-control form-control-user">
                            {formData.payment_amount_chinese_thai_delivery}
                          </p>
                        </div>
                      </div>
                      <div className="form-group mb-5">
                        <div className="justify-content-center d-flex">
                          <div className="mt-5">
                            {formData.old_image && (
                              <img
                                src={url + formData.old_image}
                                alt="Image Preview"
                                width="200"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProductList;
