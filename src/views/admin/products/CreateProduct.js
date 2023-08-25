import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusListFromState = useSelector((state) => state.post.status_list);
  const [statusList, setStatusList] = useState(statusListFromState);
  useEffect(() => {
    setStatusList(statusListFromState);
  }, [statusListFromState]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                รายละเอียดสินค้า
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
                          placeholder="รหัสลูกค้า"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="parcel"
                          placeholder="พัสดุ"
                          name="parcel"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="box_page_code"
                          name="box_page_code"
                          placeholder="รหัสหน้ากล่อง"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="tech_china"
                          name="tech_china"
                          placeholder="เเทคจีน"
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
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cabinet_number"
                          placeholder="เลขตู้"
                          name="cabinet_number"
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
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="close_cabinet"
                          placeholder="ปิดตู้"
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
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="ถึงไทย"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <select
                          class="form-select"
                          id="parcel_status"
                          name="parcel_status"
                          aria-label="Default select example"
                        >
                          <option selected disabled>
                            เลือก สถานะ
                          </option>
                          {statusList &&
                            statusList.map((status, index) => (
                              <option value={status.statusProduct}>
                                {status.statusProduct}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="quantity"
                          placeholder="จำนวน"
                          name="quantity"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="size"
                          placeholder="ขนาด"
                          name="size"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="cue_per_piece"
                          name="cue_per_piece"
                          placeholder="คิวต่อชิ้น"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="weight"
                          name="weight"
                          placeholder="น้ำหนัก"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="total_queue"
                          placeholder="คิวรวม"
                          name="total_queue"
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
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="product_type"
                          placeholder="เลือกประเภทสินค้า"
                          name="product_type"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="file"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="อัพโหลดไฟล์ภาพ"
                        />
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
