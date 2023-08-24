import React from "react";

export default function CreateProduct() {
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
                          id="username"
                          placeholder="พัสดุ"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="รหัสหน้ากล่อง"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="รหัสโกดัง"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="เเทคจีน"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="เลขตู้"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="ถึงโกดังจัน"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="ปิดตู้"
                          name="username"
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
                        {/* <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="สถานะ"
                          name="username"
                        /> */}
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected disabled>
                            เลือก สถานะ
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="invoice"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="จำนวน"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="รหัสลูกค้า"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="ขนาด"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="น้ำหนัก"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="คิวรวม"
                          name="username"
                        />
                      </div>
                      <div className="col-sm-6  col-md-6 col-lg-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="customerCode"
                          placeholder="รหัสลูกค้า"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6  col-md-6 col-lg-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="ยอดชำระค่าจัดส่ง จีน-ไทย"
                          name="username"
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
}
