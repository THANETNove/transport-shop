import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../../server/server";
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
      close_cabinet: new Date(productList && productList.close_cabinet), // date
      to_thailand: new Date(productList && productList.to_thailand), // date*/
      parcel_status: productList && productList.parcel_status,
      quantity: productList && productList.quantity,
      size: productList && productList.size,
      cue_per_piece: productList && productList.cue_per_piece,
      weight: productList && productList.weight,
      total_queue: productList && productList.total_queue,
      payment_amount_chinese_thai_delivery:
        productList && productList.payment_amount_chinese_thai_delivery,
      product_type: productList && productList.product_type,
      old_image: productList && productList.image,
      status_recorder: user.status,
    }));
  }, [productList]);

  console.log("formData", formData.image);
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
                            class="form-labe"
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
                            class="form-labe"
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
                            class="form-label"
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
                            class="form-labe"
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
                            class="form-label mr-4"
                          >
                            ถึงโกดังจีน
                          </label>
                          <p className="form-control form-control-user">
                            {formData.to_thailand
                              ? format(formData.chinese_warehouse, "dd-MM-yyyy")
                              : ""}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6 ">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label mr-5"
                          >
                            ปิดตู้
                          </label>
                          <p className="form-control form-control-user">
                            {formData.to_thailand
                              ? format(formData.close_cabinet, "dd-MM-yyyy")
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label mr-5"
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
                            class="form-label mr-5"
                          >
                            สถานะ
                          </label>
                          <select
                            class="form-control"
                            id="parcel_status"
                            name="parcel_status"
                            value={formData.parcel_status}
                            aria-label="Default select example"
                            disabled
                          >
                            <option selected disabled>
                              เลือก สถานะ
                            </option>
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
                            class="form-label"
                          >
                            จำนวน
                          </label>
                          <p className="form-control form-control-user">
                            {formData.quantity}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            ขนาด
                          </label>
                          <p className="form-control form-control-user">
                            {formData.size}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            คิวต่อชิ้น
                          </label>
                          <p className="form-control form-control-user">
                            {formData.cue_per_piece}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            น้ำหนัก
                          </label>
                          <p className="form-control form-control-user">
                            {formData.weight}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            คิวรวม
                          </label>

                          <p className="form-control form-control-user">
                            {formData.total_queue}
                          </p>
                        </div>
                        <div className="col-sm-6  col-md-6 col-lg-6">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            ยอดชำระค่าจัดส่ง จีน-ไทย
                          </label>
                          <p className="form-control form-control-user">
                            {formData.payment_amount_chinese_thai_delivery}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            เลือกประเภทพัสดุ
                          </label>
                          <select
                            class="form-control"
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
                        <div className="col-sm-6  col-md-6 col-lg-6"></div>
                      </div>
                      <div className="form-group mb-5">
                        <div className="justify-content-center d-flex">
                          <div className="mt-5">
                            {formData.old_image && (
                              <img
                                src={
                                  "http://192.168.1.10/project/API/image/product/" +
                                  formData.old_image
                                }
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
