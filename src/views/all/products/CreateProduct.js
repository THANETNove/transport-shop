import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status_list, product_type } = useSelector((state) => state.post);
  const [statusList, setStatusList] = useState(status_list);
  const [productType, setProductType] = useState(product_type);

  const [image, setImage] = useState(null);
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
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // username validation
    if (!formData.username.trim()) {
      newErrors.username = "username is required";
      isValid = false;
    }
    // customerCode validation
    if (!formData.customerCode.trim()) {
      newErrors.customerCode = "รหัสลูกค้า is required";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Email format is invalid";
      isValid = false;
    }

    // password validation
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
      isValid = false;
    } else if (formData.password.length <= 5) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    // name_surname validation
    if (!formData.name_surname.trim()) {
      newErrors.name_surname = "name_surname is required";
      isValid = false;
    }
    // phone_number validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "phone_number is required";
      isValid = false;
    }
    // address validation
    if (!formData.address.trim()) {
      newErrors.address = "address is required";
      isValid = false;
    }
    // subdistrict validation
    if (!formData.subdistrict.trim()) {
      newErrors.subdistrict = "subdistrict is required";
      isValid = false;
    }
    // district validation
    if (!formData.district.trim()) {
      newErrors.district = "district is required";
      isValid = false;
    }
    // province validation
    if (!formData.province.trim()) {
      newErrors.province = "province is required";
      isValid = false;
    }
    // zipCode validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "zipCode is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name, value", name, value);
    if (name != "image") {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    const file = event.target.files[0];
    if (name == "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: file, // อัพเดตค่า image ใน state formData ด้วยไฟล์ที่เลือก
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      // สร้าง URL ของภาพตัวอย่าง
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const response = await Service.register(formData, dispatch);

      /* if (response.status == "success") {
        navigate("/dashboard");
      } else {
        if (response.error == "Username already exists!") {
          setErrors((prevState) => ({
            ...prevState,
            ["username"]: response.error,
          }));
        } else if ("Email already exists!") {
          setErrors((prevState) => ({
            ...prevState,
            ["email"]: response.error,
          }));
        }
      } */
    }
  };

  useEffect(() => {
    setStatusList(status_list);
    setProductType(product_type);
  }, []);

  useEffect(() => {
    setStatusList(status_list);
  }, [status_list]);

  useEffect(() => {
    setProductType(product_type);
  }, [productType]);

  console.log("formData", formData);

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
                  <form>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customer_code"
                          name="customer_code"
                          placeholder="รหัสลูกค้า"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="tech_china"
                          name="tech_china"
                          placeholder="เเทคจีน"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="warehouse_code"
                          placeholder="รหัสโกดัง"
                          name="warehouse_code"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cabinet_number"
                          placeholder="เลขตู้"
                          name="cabinet_number"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="chinese_warehouse"
                          placeholder="ถึงโกดังจีน"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="close_cabinet"
                          placeholder="ปิดตู้"
                          onChange={handleChange}
                          name="close_cabinet"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="to_thailand"
                          placeholder="ถึงไทย"
                          name="to_thailand"
                          onChange={handleChange}
                        />
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
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="quantity"
                          placeholder="จำนวน"
                          onChange={handleChange}
                          name="quantity"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="size"
                          placeholder="ขนาด"
                          name="size"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cue_per_piece"
                          name="cue_per_piece"
                          placeholder="คิวต่อชิ้น"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="weight"
                          name="weight"
                          placeholder="น้ำหนัก"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_queue"
                          placeholder="คิวรวม"
                          name="total_queue"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="payment_amount_chinese_thai_delivery"
                          name="payment_amount_chinese_thai_delivery"
                          placeholder="ยอดชำระค่าจัดส่ง จีน-ไทย"
                        />
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
