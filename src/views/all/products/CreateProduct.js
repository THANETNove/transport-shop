import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status_list, product_type } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);
  const [startDate, setStartDate] = useState(new Date());
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);

  /*   const [image, setImage] = useState(null); */
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({
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
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // customer_code validation
    if (!formData.customer_code.trim()) {
      newErrors.customer_code = "customer_code is required";
      isValid = false;
    }
    // tech_china validation
    if (!formData.tech_china.trim()) {
      newErrors.customerCode = "tech_china is required";
      isValid = false;
    }

    // warehouse_code validation
    if (!formData.warehouse_code.trim()) {
      newErrors.warehouse_code = "warehouse_code is required";
      isValid = false;
    }

    // cabinet_number validation
    if (!formData.cabinet_number.trim()) {
      newErrors.cabinet_number = "cabinet_number is required";
      isValid = false;
    }
    // chinese_warehouse validation
    if (!formData.chinese_warehouse) {
      newErrors.chinese_warehouse = "chinese_warehouse is required";
      isValid = false;
    }
    // close_cabinet validation
    if (!formData.close_cabinet) {
      newErrors.close_cabinet = "close_cabinet is required";
      isValid = false;
    }
    // to_thailand validation
    if (!formData.to_thailand) {
      newErrors.to_thailand = "to_thailand is required";
      isValid = false;
    }
    // parcel_status validation
    if (!formData.parcel_status.trim()) {
      newErrors.parcel_status = "parcel_status is required";
      isValid = false;
    }
    // quantity validation
    if (!formData.quantity.trim()) {
      newErrors.quantity = "quantity is required";
      isValid = false;
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "quantity must be a number";
      isValid = false;
    }
    // size validation
    if (!formData.size.trim()) {
      newErrors.size = "size is required";
      isValid = false;
    }
    // cue_per_piece validation
    if (!formData.cue_per_piece.trim()) {
      newErrors.cue_per_piece = "cue_per_piece is required";
      isValid = false;
    } else if (isNaN(Number(formData.cue_per_piece))) {
      newErrors.cue_per_piece = "cue_per_piece must be a number";
      isValid = false;
    }
    // weight validation
    if (!formData.weight.trim()) {
      newErrors.weight = "weight is required";
      isValid = false;
    } else if (isNaN(Number(formData.weight))) {
      newErrors.weight = "weight must be a number";
      isValid = false;
    }
    // total_queue validation
    if (!formData.total_queue.trim()) {
      newErrors.total_queue = "total_queue is required";
      isValid = false;
    } else if (isNaN(Number(formData.total_queue))) {
      newErrors.total_queue = "total_queue must be a number";
      isValid = false;
    }
    // payment_amount_chinese_thai_delivery validation
    if (!formData.payment_amount_chinese_thai_delivery.trim()) {
      newErrors.payment_amount_chinese_thai_delivery =
        "payment_amount_chinese_thai_delivery is required";
      isValid = false;
    } else if (isNaN(Number(formData.payment_amount_chinese_thai_delivery))) {
      newErrors.payment_amount_chinese_thai_delivery =
        "payment_amount_chinese_thai_delivery must be a number";
      isValid = false;
    }
    // product_type validation
    if (!formData.product_type.trim()) {
      newErrors.product_type = "product_type is required";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log("9999");

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/svg+xml",
      ];

      if (allowedMimeTypes.includes(file.type)) {
        setFormData((prevState) => ({ ...prevState, ["image"]: file }));
        // สร้าง URL ของภาพตัวอย่าง
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
      }
      /* setImage(file);

      // สร้าง URL ของภาพตัวอย่าง
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); */
    } else {
      setFormData((prevState) => ({ ...prevState, ["image"]: null }));
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const response = await Service.createProduct(formData, dispatch);

      if (response.status == "success") {
        navigate("/product-list");
      } else {
        console.log("response", response);
      }
    }
  };

  useEffect(() => {
    setStatusList(status_list);
    setProductType(product_type);
    setFormData((prevState) => ({
      ...prevState,
      ["status_recorder"]: user.status,
    }));
  }, []);

  useEffect(() => {
    setStatusList(status_list);
  }, [status_list]);

  useEffect(() => {
    setProductType(product_type);
  }, [productType]);

  return (
    <div className="container-fluidaa">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                รายละเอียดสินค้า
              </h6>
              <h6 className="m-0 font-weight-bold text-primary">
                เพิ่มปุ่มชำระเงิน (ชำระบิลนี้)
              </h6>
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-10">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <label for="exampleFormControlInput1" class="form-labe">
                          รหัสลูกค้า
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customer_code"
                          name="customer_code"
                          placeholder="รหัสลูกค้า"
                          onChange={handleChange}
                        />
                        {errors.customer_code && (
                          <div className="error-from">
                            {errors.customer_code}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label for="exampleFormControlInput1" class="form-labe">
                          เเทคจีน
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="tech_china"
                          name="tech_china"
                          placeholder="เเทคจีน"
                          onChange={handleChange}
                        />
                        {errors.tech_china && (
                          <div className="error-from">{errors.tech_china}</div>
                        )}
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
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="warehouse_code"
                          placeholder="รหัสโกดัง"
                          name="warehouse_code"
                          onChange={handleChange}
                        />
                        {errors.warehouse_code && (
                          <div className="error-from">
                            {errors.warehouse_code}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label for="exampleFormControlInput1" class="form-labe">
                          เลขตู้
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cabinet_number"
                          placeholder="เลขตู้"
                          name="cabinet_number"
                          onChange={handleChange}
                        />
                        {errors.cabinet_number && (
                          <div className="error-from">
                            {errors.cabinet_number}
                          </div>
                        )}
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
                        <DatePicker
                          /*  selected={startDate} */
                          placeholderText="Select date"
                          selected={formData.chinese_warehouse}
                          className="form-control form-control-user"
                          onChange={(date) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              ["chinese_warehouse"]: date,
                            }))
                          }
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.date && (
                          <div className="error-from">{errors.date}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6 ">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label mr-5"
                        >
                          ปิดตู้
                        </label>
                        <DatePicker
                          /*  selected={startDate} */
                          placeholderText="Select date"
                          selected={formData.close_cabinet}
                          className="form-control form-control-user"
                          placeholder="ปิดตู้"
                          onChange={(date) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              ["close_cabinet"]: date,
                            }))
                          }
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.close_cabinet && (
                          <div className="error-from">
                            {errors.close_cabinet}
                          </div>
                        )}
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
                        <DatePicker
                          /* selected={startDate} */
                          selected={formData.to_thailand}
                          placeholderText="Select date"
                          className="form-control form-control-user w-100"
                          placeholder="ถึงไทย"
                          onChange={(date) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              ["to_thailand"]: date,
                            }))
                          }
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.to_thailand && (
                          <div className="error-from">{errors.to_thailand}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <select
                          class="form-select"
                          id="parcel_status"
                          name="parcel_status"
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option selected disabled>
                            เลือก สถานะ
                          </option>
                          {statusList &&
                            statusList.map((status, index) => (
                              <option value={status.id}>
                                {status.statusProduct}
                              </option>
                            ))}
                        </select>
                        {errors.parcel_status && (
                          <div className="error-from">
                            {errors.parcel_status}
                          </div>
                        )}
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
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="quantity"
                          placeholder="จำนวน"
                          onChange={handleChange}
                          name="quantity"
                        />
                        {errors.quantity && (
                          <div className="error-from">{errors.quantity}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          ขนาด
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="size"
                          placeholder="ขนาด"
                          name="size"
                          onChange={handleChange}
                        />
                        {errors.size && (
                          <div className="error-from">{errors.size}</div>
                        )}
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
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cue_per_piece"
                          name="cue_per_piece"
                          placeholder="คิวต่อชิ้น"
                          onChange={handleChange}
                        />
                        {errors.cue_per_piece && (
                          <div className="error-from">
                            {errors.cue_per_piece}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          น้ำหนัก
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="weight"
                          name="weight"
                          placeholder="น้ำหนัก"
                          onChange={handleChange}
                        />
                        {errors.weight && (
                          <div className="error-from">{errors.weight}</div>
                        )}
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
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_queue"
                          placeholder="คิวรวม"
                          name="total_queue"
                          onChange={handleChange}
                        />
                        {errors.total_queue && (
                          <div className="error-from">{errors.total_queue}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          ยอดชำระค่าจัดส่ง จีน-ไทย
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="payment_amount_chinese_thai_delivery"
                          name="payment_amount_chinese_thai_delivery"
                          placeholder="ยอดชำระค่าจัดส่ง จีน-ไทย"
                          onChange={handleChange}
                        />
                        {errors.payment_amount_chinese_thai_delivery && (
                          <div className="error-from">
                            {errors.payment_amount_chinese_thai_delivery}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <select
                          class="form-select"
                          id="product_type"
                          name="product_type"
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option selected disabled>
                            เลือกประเภทสินค้า
                          </option>
                          {productType &&
                            productType.map((type, index) => (
                              <option value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        {errors.product_type && (
                          <div className="error-from">
                            {errors.product_type}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="file"
                          className="form-control form-control-user"
                          id="image"
                          name="image"
                          onChange={handleImageChange}
                          placeholder="อัพโหลดไฟล์ภาพ"
                        />
                        {errors.image && (
                          <div className="error-from">{errors.image}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="justify-content-center d-flex">
                        <div className="mt-5">
                          {preview && (
                            <img
                              src={preview}
                              alt="Image Preview"
                              width="200"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block mt-5 mb-5"
                    >
                      บันทึก
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
