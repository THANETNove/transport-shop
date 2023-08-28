import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";

export default function StatusList() {
  const dispatch = useDispatch();
  const { status_list } = useSelector((state) => state.post);
  const [statusList, setStatusList] = useState(status_list);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);

  const deleteStatusProduct = async (event) => {
    const response = await Service.deleteStatusList(event, dispatch);
    if (response.status == "success") {
      /*  navigate("/status-list"); */
      setStatusSuccess(response.message);
      setStatusResponse(1);
    } else {
      setStatusSuccess(response.error);
      setStatusResponse(2);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
    };

    fetchData();
  }, []);

  useEffect(() => {
    setStatusList(status_list);
  }, [status_list]);

  useEffect(() => {
    setTimeout(() => {
      setStatusSuccess(null);
    }, 1000);
  }, [statusSuccess]);

  useEffect(() => {
    setTimeout(() => {
      setStatusResponse(null);
    }, 1000);
  }, [statusSuccess]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มพัสดุ</h6> */}
              <Link className="btn btn-primary" to="/create-status">
                เพิ่ม สถานะ
              </Link>
              <span
                className={
                  statusResponse == "1"
                    ? "color-success"
                    : statusResponse == "2" && "color-error"
                }
              >
                {statusSuccess && statusSuccess != null && statusSuccess}
              </span>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">ชื่อ สถานะ</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusList &&
                      statusList.map((status, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{status.statusProduct}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "คุณต้องการลบ ข้อมูลใช่หรือไม่ ! "
                                  )
                                ) {
                                  deleteStatusProduct(status.id);
                                }
                              }}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
