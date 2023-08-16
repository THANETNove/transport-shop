import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="Username"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="รหัสลูกค้า"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control form-control-user"
                        id="number"
                        placeholder="เบอร์ติดต่อ"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="number"
                        placeholder="ที่อยู่"
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="ตำบล"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="อำเภอ"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="จังหวัด"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="รหัสไปรษณีย์"
                        />
                      </div>
                    </div>
                    <a
                      href="login.html"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link to="/" className="small">
                      <span>go Back Home</span>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link to="/login" className="small">
                      <span> Already have an account? Login!</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
