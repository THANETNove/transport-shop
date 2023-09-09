import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status_list, product_type, status_code_data } = useSelector(
    (state) => state.post
  );
  const { users_code } = useSelector((state) => state.get);
  const user = useSelector((state) => state.auth.user);
  const [startDate, setStartDate] = useState(new Date());
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [codeData, setCodeData] = useState(status_code_data);

  const [userCode, setUserCode] = useState(users_code);

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
    wide_size: "",
    long_size: "",
    height_size: "",
    cue_per_piece: "",
    weight: "",
    total_weight: "",
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
    quantity: "",
    wide_size: "",
    long_size: "",
    height_size: "",
    cue_per_piece: "",
    weight: "",
    total_weight: "",
    total_queue: "",
    payment_amount_chinese_thai_delivery: "",
    product_type: "",
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

    // quantity validation
    if (!formData.quantity.trim()) {
      newErrors.quantity = "quantity is required";
      isValid = false;
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "quantity must be a number";
      isValid = false;
    }

    //ขนาดความกว้าง  validation
    if (!formData.wide_size.trim()) {
      newErrors.wide_size = "wide_size is required";
      isValid = false;
    } else if (isNaN(Number(formData.wide_size))) {
      newErrors.wide_size = "wide_size must be a number";
      isValid = false;
    }

    // ขนาดความยาว validation
    if (!formData.long_size.trim()) {
      newErrors.long_size = "long_size is required";
      isValid = false;
    } else if (isNaN(Number(formData.long_size))) {
      newErrors.long_size = "long_size must be a number";
      isValid = false;
    }

    // ขนาดความสุง validation
    if (!formData.height_size.trim()) {
      newErrors.height_size = "height_size is required";
      isValid = false;
    } else if (isNaN(Number(formData.height_size))) {
      newErrors.height_size = "height_size must be a number";
      isValid = false;
    }

    if (typeof formData.cue_per_piece !== "string") {
      formData.cue_per_piece = formData.cue_per_piece.toString(); // แปลงเป็นสตริง
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

    if (typeof formData.total_weight !== "string") {
      formData.total_weight = formData.total_weight.toString(); // แปลงเป็นสตริง
    }
    // total_weight validation
    if (!formData.total_weight.trim()) {
      newErrors.total_weight = "total_weight is required";
      isValid = false;
    } else if (isNaN(Number(formData.total_weight))) {
      newErrors.total_weight = "total_weight must be a number";
      isValid = false;
    }
    if (typeof formData.total_queue !== "string") {
      formData.total_queue = formData.total_queue.toString(); // แปลงเป็นสตริง
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

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (userCode.some((type) => type.customerCode === value)) {
      setErrors((prevState) => ({
        ...prevState,
        ["customer_code"]: "",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ["customer_code"]: "รหัสลูกค้าไม่ตรง",
      }));
    }
  };

  const handleChangeType = (event) => {
    const selectedValue = event.target.value;
    const valuesArray = selectedValue.split(" ");

    const id = valuesArray[0]; // 15
    const kg = valuesArray[1]; // 2
    const cbm = valuesArray[2]; // 0.6

    if (selectedValue != "เลือกประเภทพัสดุ") {
      setErrors((prevState) => ({
        ...prevState,
        ["product_type"]: "",
      }));

      setFormData((prevState) => ({
        ...prevState,
        ["product_type"]: id,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ["product_type"]: "เลือกประเภทพัสดุ",
      }));
    }
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

  useEffect(() => {
    setCodeData(status_code_data);
  }, [status_code_data]);

  useEffect(() => {
    if (user.status == 0) {
      setFormData((prevState) => ({
        ...prevState,
        ["parcel_status"]: "31",
      }));
    }
  }, []);

  // คิวต่อชิ้น
  useEffect(() => {
    const qu =
      (formData.wide_size * formData.long_size * formData.height_size) /
      1000000;

    setFormData((prevState) => ({
      ...prevState,
      ["cue_per_piece"]: qu,
    }));
  }, [formData.wide_size, formData.long_size, formData.height_size]);

  // คิวรวม
  useEffect(() => {
    const quAll = formData.cue_per_piece * formData.quantity;
    setFormData((prevState) => ({
      ...prevState,
      ["total_queue"]: quAll,
    }));
  }, [formData.quantity, formData.cue_per_piece]);

  // น้ำหนักรวม
  useEffect(() => {
    const totalWeight = formData.quantity * formData.weight;

    setFormData((prevState) => ({
      ...prevState,
      ["total_weight"]: totalWeight,
    }));
  }, [formData.quantity, formData.weight]);

  useEffect(() => {
    setUserCode(users_code);
  }, [users_code]);

  /*   console.log("userCode", formData.customer_code, userCode); */

  return (
    <div className="container-fluidaa">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">สร้างพัสดุ</h6>
              {/*  <h6 className="m-0 font-weight-bold text-primary">
                เพิ่มปุ่มชำระเงิน (ชำระบิลนี้)
              </h6> */}
            </div>

            <div className="card-body ">
              <div className="d-flex justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-10">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <label
                          for="exampleFormControlInput1"
                          className="form-labe"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-labe"
                        >
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
                          className="form-label"
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-labe"
                        >
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
                          className="form-label mr-4"
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
                          className="form-label mr-5"
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
                          className="form-label mr-5"
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          สถานะสินค้า
                        </label>
                        <select
                          className="form-control"
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
                          className="form-label"
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
                          className="form-label"
                        >
                          ขนาดกว้าง
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="wide_size"
                          placeholder="ขนาดกว้าง"
                          name="wide_size"
                          onChange={handleChange}
                        />
                        {errors.wide_size && (
                          <div className="error-from">{errors.wide_size}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          ขนาดยาว
                        </label>
                        <input
                          type="long_size"
                          className="form-control form-control-user"
                          id="long_size"
                          placeholder="ขนาดยาว"
                          name="long_size"
                          onChange={handleChange}
                        />
                        {errors.long_size && (
                          <div className="error-from">{errors.long_size}</div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          ขนาดสุง
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="height_size"
                          placeholder="ขนาดสุง"
                          name="height_size"
                          onChange={handleChange}
                        />
                        {errors.height_size && (
                          <div className="error-from">{errors.height_size}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          คิวต่อชิ้น
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cue_per_piece"
                          name="cue_per_piece"
                          value={formData.cue_per_piece}
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
                          className="form-label"
                        >
                          น้ำหนักต่อชิ้น
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
                          className="form-label"
                        >
                          น้ำหนักรวม
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_weight"
                          name="total_weight"
                          value={formData.total_weight}
                          placeholder="น้ำหนักรวม"
                          onChange={handleChange}
                        />
                        {errors.total_weight && (
                          <div className="error-from">
                            {errors.total_weight}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          คิวรวม
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_queue"
                          placeholder="คิวรวม"
                          name="total_queue"
                          value={formData.total_queue}
                          onChange={handleChange}
                        />
                        {errors.total_queue && (
                          <div className="error-from">{errors.total_queue}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          ประเภทพัสดุ
                        </label>
                        <select
                          className="form-select"
                          id="product_type"
                          name="product_type"
                          /*  onChange={handleChangeType} */
                          aria-label="Default select example"
                        >
                          <option>เลือกประเภทพัสดุ</option>
                          {userCode &&
                            userCode
                              .filter(
                                (type) =>
                                  formData &&
                                  formData.customer_code == type.customerCode
                              )
                              .map((type, index) => (
                                <option
                                  key={index}
                                  value={`${type.id_type} ${type.kg} ${type.cbm}`}
                                >
                                  {type.name}
                                </option>
                              ))}
                        </select>
                        {errors.product_type && (
                          <div className="error-from">
                            {errors.product_type}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
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
                        <input
                          type="file"
                          className="form-control"
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
