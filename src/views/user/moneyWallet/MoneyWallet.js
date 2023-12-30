import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProductCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { status_code, status_code_data } = useSelector((state) => state.post);
  const [messageCode, setMessageCode] = useState(status_code);
  const [codeData, setCodeData] = useState(status_code_data);

  useEffect(() => {
    setMessageCode(status_code);
    setTimeout(() => {
      dispatch({
        type: "CODE_SUCCESS",
        payload: "default",
      });
    }, 1000);
  }, [status_code]);

  useEffect(() => {
    const fetchData = async () => {
      await Service.getProductCode(user.id, dispatch); // ดึงรหัสพัสดุ
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCodeData(status_code_data);
  }, [status_code_data]);



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              {/*   <Link className="btn btn-primary" to="/create-product-code">
                สร้างรหัสตัวแทนย่อย
              </Link>
              <span className="color-success">
                {messageCode == "success" && "เพิ่มรหัสพัสดุสำเร็จ"}
              </span> */}
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <h1 className="text-center mt-5 mb-5">
                  กำลังปรับปรุงระบบ จะใช้ได้ในเร็วๆนี้
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCode;
