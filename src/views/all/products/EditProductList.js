import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../../server_api/server";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { useTranslation } from "react-i18next";

const EditProductList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    product,
    statusProduct,
    status_list,
    product_type,
    status_code_data,
  } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);
  const { users_code } = useSelector((state) => state.get);

  const [productList, setProductList] = useState(null);
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);
  const [preview, setPreview] = useState(null);
  const [codeData, setCodeData] = useState(status_code_data);
  const [userCode, setUserCode] = useState(users_code);
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
    idProduct: "",
    customer_code: "",
    tech_china: "",
    warehouse_code: "",
    cabinet_number: "",
    chinese_warehouse: "",
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
    thinkingFrom: null,
    old_image: null,
  });

  useEffect(() => {
    const result = product && product.find((product) => product.id == id);
    setProductList(result);
  }, [id]);

  useEffect(() => {
    setCodeData(status_code_data);
  }, [status_code_data]);

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

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // customer_code validation
    if (!formData.customer_code.trim()) {
      newErrors.customer_code = t("create_product.customer_code_required");
      isValid = false;
    }

    // tech_china validation
    if (!formData.tech_china.trim()) {
      newErrors.customerCode = t("create_product.tech_china_required");
      isValid = false;
    }

    // warehouse_code validation
    if (!formData.warehouse_code.trim()) {
      newErrors.warehouse_code = t("create_product.warehouse_code_required");
      isValid = false;
    }

    // cabinet_number validation
    if (!formData.cabinet_number.trim()) {
      newErrors.cabinet_number = t("create_product.cabinet_number_required");
      isValid = false;
    }

    // chinese_warehouse validation
    if (!formData.chinese_warehouse) {
      newErrors.chinese_warehouse = t(
        "create_product.chinese_warehouse_required"
      );
      isValid = false;
    }

    // quantity validation
    /*  if (!formData.quantity.trim()) {
      newErrors.quantity = "quantity is required";
      isValid = false;
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "quantity must be a number";
      isValid = false;
    }
 */
    if (typeof formData.total_weight !== "string") {
      formData.total_weight = formData.total_weight.toString(); // แปลงเป็นสตริง
    }
    // total_weight validation
    if (!formData.total_weight.trim()) {
      newErrors.total_weight = t("create_product.total_weight_required");
      isValid = false;
    } else if (isNaN(Number(formData.total_weight))) {
      newErrors.total_weight = t("create_product.total_weight_number");
      isValid = false;
    }
    // total_queue validation
    if (typeof formData.total_queue !== "string") {
      formData.total_queue = formData.total_queue.toString(); // แปลงเป็นสตริง
    }
    if (!formData.total_queue.trim()) {
      newErrors.total_queue = t("create_product.total_queue_required");
      isValid = false;
    } else if (isNaN(Number(formData.total_queue))) {
      newErrors.total_queue = t("create_product.total_queue_number");
      isValid = false;
    }

    // payment_amount_chinese_thai_delivery validation
    if (typeof formData.payment_amount_chinese_thai_delivery !== "string") {
      formData.payment_amount_chinese_thai_delivery =
        formData.payment_amount_chinese_thai_delivery.toString(); // แปลงเป็นสตริง
    }

    if (!formData.payment_amount_chinese_thai_delivery.trim()) {
      newErrors.payment_amount_chinese_thai_delivery = t(
        "create_product.payment_required"
      );
      isValid = false;
    } else if (isNaN(Number(formData.payment_amount_chinese_thai_delivery))) {
      newErrors.payment_amount_chinese_thai_delivery = t(
        "create_product.payment_number"
      );
      isValid = false;
    }
    // product_type validation
    if (!formData.product_type.trim()) {
      newErrors.product_type = t("create_product.product_type_required");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toTimeZone = (date, timeZone) => {
    const utcDate = zonedTimeToUtc(date, timeZone);
    return utcToZonedTime(utcDate, timeZone);
  };

  const handleDateChange = (name, date) => {
    const thailandTimeZone = "Asia/Bangkok"; // โซนเวลาของประเทศไทย
    const zonedDate = toTimeZone(date, thailandTimeZone);
    setFormData((prevState) => ({ ...prevState, [name]: zonedDate }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name == "customer_code") {
      if (userCode.some((type) => type.customerCode === value)) {
        setErrors((prevState) => ({
          ...prevState,
          ["customer_code"]: "",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          ["customer_code"]: t("create_product.not_match"),
        }));
      }
    }
  };
  const handleChangeType = (event) => {
    const selectedValue = event.target.value;
    const valuesArray = selectedValue.split(" ");

    const id = valuesArray[0]; // 15
    const kg = valuesArray[1]; // 2
    const cbm = valuesArray[2]; // 0.6

    /*  console.log("id", id);
    console.log("kg", kg);
    console.log("cbm", cbm); */

    if (selectedValue != t("create_product.select_parcel")) {
      // คำนวน kg* น้ำหนักรวม

      const calculate_kg = parseFloat(kg) * parseFloat(formData.total_weight);
      // คำนวน cbm*คิวรวม
      const calculate_cbm = parseFloat(cbm) * parseFloat(formData.total_queue);
      /* 
      console.log("calculate_kg", calculate_kg);
      console.log("calculate_cbm", calculate_cbm); */

      if (calculate_kg > calculate_cbm) {
        // กรณี calculate_kg มากกว่า calculate_cbm
        setFormData((prevState) => ({
          ...prevState,
          ["payment_amount_chinese_thai_delivery"]: calculate_kg.toFixed(2),
          thinkingFrom: t("create_product.weight"),
        }));
      } else {
        // กรณี calculate_cbm มากกว่าหรือเท่ากับ calculate_kg
        setFormData((prevState) => ({
          ...prevState,
          ["payment_amount_chinese_thai_delivery"]: calculate_cbm.toFixed(2),
          thinkingFrom: t("create_product.volume"),
        }));
      }
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ["product_type"]: t("create_product.select_parcel"),
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
          image: t("create_product.select_image"),
        }));
      }
    } else {
      setFormData((prevState) => ({ ...prevState, ["image"]: null }));
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const response = await Service.UpdateProduct(formData, dispatch);

      if (response.status == "success") {
        navigate("/product-list");
      } else {
        console.log("response", response);
      }
    }
  };

  useEffect(() => {
    setUserCode(users_code);
  }, [users_code]);

  // คิวต่อชิ้น  อันเก่า
  useEffect(() => {
    if (inputFields == null) {
      const qu =
        (formData.wide_size * formData.long_size * formData.height_size) /
        1000000;
      setFormData((prevState) => ({
        ...prevState,
        ["cue_per_piece"]: qu,
      }));
    }
  }, [formData.wide_size, formData.long_size, formData.height_size]);

  // คิวต่อชิ้น ใหม่
  useEffect(() => {
    if (inputFields != null) {
      for (let i = 0; i < inputFields.length; i++) {
        const { wideSize, lengthSize, heightSize, quantity } = inputFields[i];
        const result = (wideSize * lengthSize * heightSize) / 1000000;
        inputFields[i].cuePerPiece = result.toFixed(4);
      }

      for (let i = 0; i < inputFields.length; i++) {
        const { wideSize, lengthSize, heightSize, quantity } = inputFields[i];
        const result =
          ((wideSize * lengthSize * heightSize) / 1000000) * Number(quantity);
        inputFields[i].cuePerPieceSum = result.toFixed(4);
      }
    }
  }, [inputFields]);
  // คิวรวม  เก่า
  useEffect(() => {
    if (inputFields && inputFields.length == 0) {
      const quAll = formData.cue_per_piece * formData.quantity;
      setFormData((prevState) => ({
        ...prevState,
        ["total_queue"]: quAll,
      }));
    }
  }, [formData.quantity, formData.cue_per_piece]);

  // คิวรวม  ใหม่
  useEffect(() => {
    if (inputFields != null) {
      let cue_per_piece = 0;

      for (let i = 0; i < inputFields.length; i++) {
        cue_per_piece += parseFloat(inputFields[i].cuePerPiece);
      }
      let cue_per_piece_sum = 0;

      for (let i = 0; i < inputFields.length; i++) {
        cue_per_piece_sum += parseFloat(inputFields[i].cuePerPieceSum);
      }

      /*   setFormData((prevState) => ({
        ...prevState,
        ["cue_per_piece"]: cue_per_piece.toFixed(2),
      }));
 */

      let quantity_all = 0;
      for (let i = 0; i < inputFields.length; i++) {
        if (!isNaN(parseFloat(inputFields[i].quantity))) {
          quantity_all += parseFloat(inputFields[i].quantity);
        } else {
          quantity_all = formData.quantity;
          break; // ใส่ break เพื่อหยุดลูปเมื่อพบค่าไม่ถูกต้อง
        }
      }

      const quAll = Number(cue_per_piece) * Number(quantity_all);

      setFormData((prevState) => ({
        ...prevState,
        ["total_queue"]:
          cue_per_piece_sum != 0
            ? cue_per_piece_sum.toFixed(4)
            : quAll.toFixed(4),
      }));
    }
  }, [formData.quantity, inputFields]);

  // น้ำหนักรวม เก่า
  useEffect(() => {
    if (inputFields == null) {
      const totalWeight = formData.quantity * formData.weight;
      setFormData((prevState) => ({
        ...prevState,
        ["total_weight"]: totalWeight,
      }));
    }
  }, [formData.quantity, formData.weight]);

  // น้ำหนักรวม ใหม่
  useEffect(() => {
    if (inputFields != null) {
      let weight = 0;
      for (let i = 0; i < inputFields.length; i++) {
        weight += parseFloat(inputFields[i].weightFields);
      }

      let weight_all = 0;
      for (let i = 0; i < inputFields.length; i++) {
        if (!isNaN(parseFloat(inputFields[i].quantity))) {
          weight_all += parseFloat(inputFields[i].quantity);
        } else {
          weight_all = formData.quantity;
          break; // ใส่ break เพื่อหยุดลูปเมื่อพบค่าไม่ถูกต้อง
        }
      }

      // คำนวณค่า total_weight ใหม่
      const totalWeight = Number(weight_all) * weight;
      // อัปเดตค่าใน formData ด้วย setFormData
      /*   setFormData((prevState) => ({
        ...prevState,
        weightFieldsSum: totalWeight.toFixed(2), // ตรงนี้ใช้ "total_weight" แทน ["total_weight"]
      })); */

      setFormData((prevState) => ({
        ...prevState,
        total_weight: totalWeight.toFixed(4), // ตรงนี้ใช้ "total_weight" แทน ["total_weight"]
      }));
    }
  }, [formData.quantity, inputFields]);

  useEffect(() => {
    if (inputFields != null) {
      for (let i = 0; i < inputFields.length; i++) {
        const { weightFields, quantity } = inputFields[i];

        const resultSum = parseFloat(weightFields) * Number(quantity);
        inputFields[i].weightFieldsSum = resultSum.toFixed(4);
      }
    }
  }, [inputFields]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ["inputFields"]: JSON.stringify(inputFields),
    }));
  }, [inputFields]);

  // เพิ่มข้อมูลเเต่ละ value
  const handleChangeInput = (index, fieldName, event) => {
    const values = [...inputFields];
    values[index][fieldName] = event.target.value;
    setInputFields(values);
  };

  return (
    <div className="container-fluidaa">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {t("create_product.edit_parcel")}
              </h6>
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
                          {t("customer_id")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customer_code"
                          name="customer_code"
                          placeholder={t("customer_id")}
                          value={formData.customer_code}
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
                          {t("product_list.chinese_tack")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="tech_china"
                          name="tech_china"
                          placeholder={t("product_list.chinese_tack")}
                          value={formData.tech_china}
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
                          {t("product_list.warehouse")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="warehouse_code"
                          placeholder={t("product_list.warehouse")}
                          name="warehouse_code"
                          value={formData.warehouse_code}
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
                          {t("product_list.cabinet")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cabinet_number"
                          placeholder={t("product_list.cabinet")}
                          name="cabinet_number"
                          value={formData.cabinet_number}
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
                          {t("product_list.chinese_warehouse")}
                        </label>
                        <DatePicker
                          /* selected={startDate} */
                          placeholderText={t("create_product.select_date")}
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
                          {t("product_list.close_cabinet")}
                        </label>
                        <DatePicker
                          /*  selected={startDate} */
                          placeholderText="Select date"
                          selected={formData.close_cabinet}
                          className="form-control form-control-user"
                          placeholder={t("product_list.close_cabinet")}
                          onChange={(date) =>
                            handleDateChange("close_cabinet", date)
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
                          {t("product_list.to_thailand")}
                        </label>
                        <DatePicker
                          selected={formData.to_thailand}
                          placeholderText="Select date"
                          className="form-control form-control-user w-100"
                          placeholder={t("product_list.to_thailand")}
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
                          {t("create_product.product_status")}
                        </label>
                        <select
                          className="form-control"
                          id="parcel_status"
                          name="parcel_status"
                          value={formData.parcel_status || null}
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option selected>เลือก สถานะ</option>
                          {statusList &&
                            statusList.map((status, index) => (
                              <option value={status.id}>
                                {status.id === formData.parcel_status
                                  ? `Selected: ${status.statusProduct}`
                                  : status.statusProduct}
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
                      {inputFields == null && (
                        <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("create_product.quantity")}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="quantity"
                            placeholder={t("create_product.quantity")}
                            onChange={handleChange}
                            value={formData.quantity}
                            name="quantity"
                          />
                          {errors.quantity && (
                            <div className="error-from">{errors.quantity}</div>
                          )}
                        </div>
                      )}

                      {inputFields != null ? (
                        <>
                          {inputFields &&
                            inputFields.map((inputField, index) => (
                              <>
                                <div className="col-sm-6  col-md-6 col-lg-6 mt-3">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label"
                                  >
                                    {t("create_product.quantity")} {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="quantity"
                                    placeholder={`${t(
                                      "create_product.quantity"
                                    )} ${index + 1}`}
                                    name="quantity"
                                    value={inputField.quantity}
                                    onChange={(event) =>
                                      handleChangeInput(
                                        index,
                                        "quantity",
                                        event
                                      )
                                    }
                                  />
                                  {errors.quantity && (
                                    <div className="error-from">
                                      {errors.quantity}
                                    </div>
                                  )}
                                </div>
                                <div className="col-sm-6  col-md-6 col-lg-6 mt-3">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label"
                                  >
                                    {t("create_product.width_size")} {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="wide_size"
                                    placeholder={`${t(
                                      "create_product.width_size"
                                    )} ${index + 1}`}
                                    name="wide_size"
                                    value={inputField.wideSize}
                                    onChange={(event) =>
                                      handleChangeInput(
                                        index,
                                        "wideSize",
                                        event
                                      )
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
                                    {t("create_product.the_length")} {index + 1}
                                  </label>
                                  <input
                                    type="long_size"
                                    className="form-control form-control-user"
                                    id="long_size"
                                    placeholder={`${t(
                                      "create_product.the_length"
                                    )} ${index + 1}`}
                                    name="long_size"
                                    value={inputField.lengthSize}
                                    onChange={(event) =>
                                      handleChangeInput(
                                        index,
                                        "lengthSize",
                                        event
                                      )
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
                                    {t("create_product.height")} {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="height_size"
                                    placeholder={`${t(
                                      "create_product.height"
                                    )} ${index + 1}`}
                                    name="height_size"
                                    value={inputField.heightSize}
                                    onChange={(event) =>
                                      handleChangeInput(
                                        index,
                                        "heightSize",
                                        event
                                      )
                                    }
                                  />
                                  {errors.height_size && (
                                    <div className="error-from">
                                      {errors.height_size}
                                    </div>
                                  )}
                                </div>

                                <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label mt-3"
                                  >
                                    {t("create_product.cue")} {index + 1}
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
                                      handleChangeInput(
                                        index,
                                        "cuePerPiece",
                                        event
                                      )
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
                                    className="form-label mt-3"
                                  >
                                    {t("create_product.the_queue")} {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="cue_per_piece"
                                    name="cue_per_piece"
                                    /*  value={formData.cue_per_piece} */
                                    placeholder={`${t(
                                      "create_product.the_queue"
                                    )} ${index + 1}`}
                                    value={inputField.cuePerPieceSum}
                                    onChange={(event) =>
                                      handleChangeInput(
                                        index,
                                        "cuePerPiece",
                                        event
                                      )
                                    }
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
                                    className="form-label mt-3"
                                  >
                                    {t("create_product.the_weight")} {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="weight"
                                    name="weight"
                                    placeholder={`${t(
                                      "create_product.the_weight"
                                    )} ${index + 1}`}
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
                                <div className="col-sm-6  col-md-6 col-lg-6">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label mt-3"
                                  >
                                    {t("create_product.total_weigh")}{" "}
                                    {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-user"
                                    id="weight"
                                    name="weight"
                                    placeholder={`${t(
                                      "create_product.total_weigh"
                                    )} ${index + 1}`}
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
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="wide_size"
                              placeholder="ขนาดกว้าง"
                              name="wide_size"
                              value={formData.wide_size}
                              onChange={handleChange}
                            />
                            {errors.wide_size && (
                              <div className="error-from">
                                {errors.wide_size}
                              </div>
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
                              value={formData.long_size}
                              onChange={handleChange}
                            />
                            {errors.long_size && (
                              <div className="error-from">
                                {errors.long_size}
                              </div>
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
                              value={formData.height_size}
                              onChange={handleChange}
                            />
                            {errors.height_size && (
                              <div className="error-from">
                                {errors.height_size}
                              </div>
                            )}
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
                                placeholder="คิวต่อชิ้น"
                                value={formData.cue_per_piece}
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
                                value={formData.weight}
                                placeholder="น้ำหนัก"
                                onChange={handleChange}
                              />
                              {errors.weight && (
                                <div className="error-from">
                                  {errors.weight}
                                </div>
                              )}
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
                          {t("create_product.total_weigh_all")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_weight"
                          name="total_weight"
                          value={formData.total_weight}
                          placeholder={t("create_product.total_weigh_all")}
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
                          {t("create_product.total_queue")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_queue"
                          value={formData.total_queue}
                          placeholder={t("create_product.total_queue")}
                          name="total_queue"
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
                          {t("create_product.parcel_type")}
                        </label>
                        <select
                          className="form-control"
                          id="product_type"
                          name="product_type"
                          onChange={handleChangeType}
                          aria-label="Default select example"
                        >
                          {/* productType.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.id === formData.product_type
                                  ? `Selected: ${type.name}`
                                  : type.name}
                              </option> */}
                          <option disabled selected>
                            {t("create_product.select_parcel")}
                          </option>
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
                                  {type.id == formData.product_type
                                    ? `Selected: ${type.name}`
                                    : type.name}
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
                          {t("create_product.total_cost_china_thailand")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="payment_amount_chinese_thai_delivery"
                          name="payment_amount_chinese_thai_delivery"
                          placeholder={t(
                            "create_product.total_cost_china_thailand"
                          )}
                          value={formData.payment_amount_chinese_thai_delivery}
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
                          placeholder={t("create_product.upload_image_file")}
                        />
                        {errors.image && (
                          <div className="error-from">{errors.image}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="justify-content-center d-flex">
                        <div className="mt-5">
                          {preview ? (
                            <img
                              src={preview}
                              alt={t("create_product.image_preview")}
                              width="200"
                            />
                          ) : (
                            <img
                              src={url + formData.old_image}
                              alt={t("create_product.image_preview")}
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
                      {t("create_product.save")}
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

export default EditProductList;
