import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

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
  const [userCustomerCode, setUserCustomerCode] = useState(null);

  const [inputFields, setInputFields] = useState([
    {
      quantity: 0,
      wideSize: 0,
      wideSize: 0,
      lengthSize: 0,
      heightSize: 0,
      cuePerPiece: 0,
      cuePerPieceSum: 0,
      weightFields: 0,
      weightFieldsSum: 0,
    },
  ]);

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
    wide_size: null,
    long_size: null,
    height_size: null,
    cue_per_piece: null,
    weight: null,
    inputFields: null,
    total_weight: "",
    total_queue: "",
    payment_amount_chinese_thai_delivery: "",
    product_type: "",
    thinkingFrom: null,
    image: null,
    status_recorder: "",
  });

  const [errors, setErrors] = useState({
    customer_code: "",
    tech_china: "",
    warehouse_code: "",
    cabinet_number: "",
    chinese_warehouse: "",
    quantity: "",
    total_weight: "",
    total_queue: "",
    payment_amount_chinese_thai_delivery: "",
    product_type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await Service.getCustomerCodeAll(dispatch); // ดึงประเภทพัสดุ
    };
    fetchData();
  }, []);

  const toTimeZone = (date, timeZone) => {
    const utcDate = zonedTimeToUtc(date, timeZone);
    return utcToZonedTime(utcDate, timeZone);
  };

  const handleDateChange = (name, date) => {
    const thailandTimeZone = "Asia/Bangkok"; // โซนเวลาของประเทศไทย
    const zonedDate = toTimeZone(date, thailandTimeZone);
    setFormData((prevState) => ({ ...prevState, [name]: zonedDate }));
  };

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

    // quantity validation
    /*   if (!formData.quantity.trim()) {
      newErrors.quantity = "quantity is required";
      isValid = false;
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "quantity must be a number";
      isValid = false;
    } */

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

    if (typeof formData.payment_amount_chinese_thai_delivery !== "string") {
      formData.payment_amount_chinese_thai_delivery =
        formData.payment_amount_chinese_thai_delivery.toString(); // แปลงเป็นสตริง
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

  const handleChangeCustomerCode = (event) => {
    const { name, value } = event.target;

    const uniqueCodes = [];
    const filteredArray = userCode.filter((item) => {
      if (!uniqueCodes.includes(item.customerCode)) {
        uniqueCodes.push(item.customerCode);
        return true;
      }
      return false;
    });
    const filtered = filteredArray.filter((customer) =>
      customer.customerCode.includes(value)
    );

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (value.length == 0) {
      setUserCustomerCode(null);
    }
    if (filtered.length > 0) {
      if (filtered.length == 1) {
        if (userCustomerCode == null) {
          setFormData((prevState) => ({
            ...prevState,
            [name]: filtered[0].customerCode,
          }));
          setUserCustomerCode(filtered[0].customerCode);
        }
        if (userCustomerCode != null) {
          setFormData((prevState) => ({ ...prevState, [name]: value }));
        }

        setErrors((prevState) => ({
          ...prevState,
          ["customer_code"]: "",
        }));
      }
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ["customer_code"]: "รหัสลูกค้าไม่ตรง",
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeType = (event) => {
    const selectedValue = event.target.value;
    const valuesArray = selectedValue.split(" ");

    const id = valuesArray[0]; // 15
    const kg = valuesArray[1]; // 2
    const cbm = valuesArray[2]; // 0.6

    /* console.log("id", id);
    console.log("kg", kg);
    console.log("cbm", cbm); */

    if (selectedValue != "เลือกประเภทพัสดุ") {
      setErrors((prevState) => ({
        ...prevState,
        ["product_type"]: "",
      }));
      setFormData((prevState) => ({
        ...prevState,
        ["product_type"]: id,
      }));

      // คำนวน kg* น้ำหนักรวม

      const calculate_kg = parseFloat(kg) * parseFloat(formData.total_weight);
      // คำนวน cbm*คิวรวม
      const calculate_cbm = parseFloat(cbm) * parseFloat(formData.total_queue);

      /* console.log("calculate_kg", calculate_kg);
      console.log("calculate_cbm", calculate_cbm); */
      if (calculate_kg > calculate_cbm) {
        // กรณี calculate_kg มากกว่า calculate_cbm
        setFormData((prevState) => ({
          ...prevState,
          ["payment_amount_chinese_thai_delivery"]: calculate_kg.toFixed(2),
          thinkingFrom: "น้ำหนัก",
        }));
      } else {
        // กรณี calculate_cbm มากกว่าหรือเท่ากับ calculate_kg
        setFormData((prevState) => ({
          ...prevState,
          ["payment_amount_chinese_thai_delivery"]: calculate_cbm.toFixed(2),
          thinkingFrom: "ปริมาตร",
        }));
      }
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

  // คิวต่อชิ้น // คิวรวมต่อชิ้น
  useEffect(() => {
    for (let i = 0; i < inputFields.length; i++) {
      const { wideSize, lengthSize, heightSize, quantity } = inputFields[i];
      // คิวต่อชิ้น
      const result =
        // กว้าง*ยาว*สุง/1000000*สุง
        (wideSize * lengthSize * heightSize) / 1000000;
      inputFields[i].cuePerPiece = result.toFixed(4);

      // คิวรวมต่อชิ้น
      const resultSum =
        // กว้าง*ยาว*สุง/1000000*สุง
        ((wideSize * lengthSize * heightSize) / 1000000) * Number(quantity);
      inputFields[i].cuePerPieceSum = resultSum.toFixed(4);

      console.log("resultSum", resultSum);
      console.log("resultSum.toFixed(4)", resultSum.toFixed(4));
    }
  }, [inputFields]);
  // น้ำหนักรวมต่อชิ้น

  useEffect(() => {
    for (let i = 0; i < inputFields.length; i++) {
      const { weightFields, quantity } = inputFields[i];

      const resultSum = weightFields * Number(quantity);
      inputFields[i].weightFieldsSum = resultSum.toFixed(4);
    }
  }, [inputFields]);

  // คิวรวม
  useEffect(() => {
    let cue_per_piece = 0;
    let quantity_all = 0;
    for (let i = 0; i < inputFields.length; i++) {
      cue_per_piece += parseFloat(inputFields[i].cuePerPieceSum);
    }
    for (let i = 0; i < inputFields.length; i++) {
      quantity_all += parseFloat(inputFields[i].quantity);
    }

    /*  const quAll = cue_per_piece * quantity_all;
       setFormData((prevState) => ({
      ...prevState,
      ["cue_per_piece"]: cue_per_piece.toFixed(2),
    })); */

    setFormData((prevState) => ({
      ...prevState,
      ["total_queue"]: cue_per_piece.toFixed(4),
    }));
  }, [formData.quantity, inputFields]);

  // น้ำหนักรวม
  useEffect(() => {
    let weight = 0;

    for (let i = 0; i < inputFields.length; i++) {
      weight += parseFloat(inputFields[i].weightFieldsSum);
    }
    // อัปเดตค่าใน formData ด้วย setFormData
    setFormData((prevState) => ({
      ...prevState,
      total_weight: weight.toFixed(4), // ตรงนี้ใช้ "total_weight" แทน ["total_weight"]
    }));
  }, [formData.quantity, inputFields]);

  useEffect(() => {
    setUserCode(users_code);
  }, [users_code]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ["inputFields"]: JSON.stringify(inputFields),
    }));
  }, [inputFields]);

  //เพิ่ม input
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        quantity: 0,
        wideSize: 0,
        lengthSize: 0,
        heightSize: 0,
        cuePerPiece: 0,
        cuePerPieceSum: 0,
        weightFields: 0,
        weightFieldsSum: 0,
      },
    ]);
  };
  // เพิ่มข้อมูลเเต่ละ value
  const handleChangeInput = (index, fieldName, event) => {
    const values = [...inputFields];
    values[index][fieldName] = event.target.value;
    setInputFields(values);
  };
  //เพิ่มลบ input
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

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
                          value={formData.customer_code}
                          placeholder="รหัสลูกค้า"
                          onChange={handleChangeCustomerCode}
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
                          id="chinese_warehouse"
                          name="chinese_warehouse"
                          selected={formData.chinese_warehouse}
                          className="form-control form-control-user"
                          onChange={(date) =>
                            handleDateChange("chinese_warehouse", date)
                          }
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.chinese_warehouse && (
                          <div className="error-from">
                            {errors.chinese_warehouse}
                          </div>
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
                          id="close_cabinet"
                          name="close_cabinet"
                          className="form-control form-control-user"
                          placeholder="ปิดตู้"
                          onChange={(date) =>
                            handleDateChange("close_cabinet", date)
                          }
                          dateFormat="dd/MM/yyyy"
                        />
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
                          id="to_thailand"
                          name="to_thailand"
                          placeholderText="Select date"
                          className="form-control form-control-user w-100"
                          placeholder="ถึงไทย"
                          onChange={(date) =>
                            handleDateChange("to_thailand", date)
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
                      {/*      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
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
                      </div> */}

                      {inputFields.map((inputField, index) => (
                        <>
                          <div className="col-sm-6  col-md-6 col-lg-6">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              จำนวน {index + 1}
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="quantity"
                              placeholder={`จำนวน ${index + 1}`}
                              name="quantity"
                              value={inputField.quantity}
                              onChange={(event) =>
                                handleChangeInput(index, "quantity", event)
                              }
                            />
                            {errors.quantity && (
                              <div className="error-from">
                                {errors.quantity}
                              </div>
                            )}
                          </div>
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
                              placeholder={`ขนาดความกว้างชิ้นที่ ${index + 1}`}
                              name="wide_size"
                              value={inputField.wideSize}
                              onChange={(event) =>
                                handleChangeInput(index, "wideSize", event)
                              }
                            />
                            {errors.wide_size && (
                              <div className="error-from">
                                {errors.wide_size}
                              </div>
                            )}
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
                              placeholder={`ขนาดความยาวชิ้นที่ ${index + 1}`}
                              name="long_size"
                              value={inputField.lengthSize}
                              onChange={(event) =>
                                handleChangeInput(index, "lengthSize", event)
                              }
                            />
                            {errors.long_size && (
                              <div className="error-from">
                                {errors.long_size}
                              </div>
                            )}
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
                              placeholder={`ขนาดความสุงชิ้นที่ ${index + 1}`}
                              name="height_size"
                              value={inputField.heightSize}
                              onChange={(event) =>
                                handleChangeInput(index, "heightSize", event)
                              }
                            />
                            {errors.height_size && (
                              <div className="error-from">
                                {errors.height_size}
                              </div>
                            )}
                          </div>
                          <div className="form-group row mt-3">
                            <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
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
                                onChange={(event) =>
                                  handleChangeInput(index, "cuePerPiece", event)
                                }
                              />
                              {errors.cue_per_piece && (
                                <div className="error-from">
                                  {errors.cue_per_piece}
                                </div>
                              )}
                            </div>
                            <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                คิวรวมชิ้นที่ {index + 1}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                id="cue_per_piece_sum"
                                name="cue_per_piece_sum"
                                /*  value={formData.cue_per_piece} */
                                placeholder={`คิวรวมชิ้นที่ ${index + 1}`}
                                value={inputField.cuePerPieceSum}
                                onChange={(event) =>
                                  handleChangeInput(index, "cuePerPiece", event)
                                }
                              />
                              {errors.cue_per_piece && (
                                <div className="error-from">
                                  {errors.cue_per_piece}
                                </div>
                              )}
                            </div>
                            <div className="col-sm-6  col-md-6 col-lg-6 mt-3">
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
                                placeholder={`น้ำหนัก ชิ้นที่ ${index + 1}`}
                                value={inputField.weightFields}
                                onChange={(event) =>
                                  handleChangeInput(
                                    index,
                                    "weightFields",
                                    event
                                  )
                                }
                              />
                              {errors.weight && (
                                <div className="error-from">
                                  {errors.weight}
                                </div>
                              )}
                            </div>
                            <div className="col-sm-6  col-md-6 col-lg-6 mt-3">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                น้ำหนักรวมชิ้นที่ {index + 1}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                id="weightSum"
                                name="weightSum"
                                placeholder={`น้ำหนัก ชิ้นที่ ${index + 1}`}
                                value={inputField.weightFieldsSum}
                                onChange={(event) =>
                                  handleChangeInput(
                                    index,
                                    "weightFields",
                                    event
                                  )
                                }
                              />
                              {errors.weight && (
                                <div className="error-from">
                                  {errors.weight}
                                </div>
                              )}
                            </div>
                            {index > 0 && (
                              <div className="col-2  mb-3 mt-3">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleRemoveFields(index)}
                                >
                                  ลบ
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      ))}
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddFields}
                        >
                          เพิ่ม Input Fields
                        </button>
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
                          onChange={handleChangeType}
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
                          value={formData.payment_amount_chinese_thai_delivery}
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
