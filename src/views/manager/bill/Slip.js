import React, { useEffect, useState } from "react";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const MoneySlip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = Service.getUrlSlip();
  const user = useSelector((state) => state.auth.user);
  const { dataSlipAll } = useSelector((state) => state.get);

  const [data, setData] = useState(dataSlipAll);
  const [urlImage, setUrlImage] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    await Service.getSlipAll(user && user.customerCode, dispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(dataSlipAll);
  }, [dataSlipAll]);

  const handleApprove = async (id, code_user, money, status) => {
    const isConfirmed = window.confirm(
      status == "อนุมัติ"
        ? "คุณต้องการที่จะอนุมัติใช่หรือไม่?"
        : "คุณต้องการที่จะไม่อนุมัติใช่หรือไม่?"
    );

    if (isConfirmed) {
      const responsive = await Service.updateSlip(id, code_user, money, status);
      if (responsive.status == "success") {
        setMessage("update สำเร็จ");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        fetchData();
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              เติมเงิน
              <p className="mt-3" style={{ color: "green" }}>
                {message}
              </p>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">รหัสลูกค้า</th>
                      <th scope="col">จำนวนเงิน</th>
                      <th scope="col">วันที่</th>
                      <th scope="col">เวลา</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => {
                        if (item.statusSlip == "รอการตรวจสอบ") {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.code_user}</td>
                              <td>{Number(item.money).toLocaleString()}</td>
                              <td>{item.date}</td>
                              <td>{item.time} น.</td>
                              <td>
                                {item.statusSlip == "รอการตรวจสอบ" && (
                                  <p style={{ color: "#858796" }}>
                                    {" "}
                                    {item.statusSlip}
                                  </p>
                                )}
                              </td>
                              <td>
                                <img
                                  src={url + item.image}
                                  alt=""
                                  width={50}
                                  onClick={() => setUrlImage(url + item.image)}
                                  data-bs-toggle="modal"
                                  className="pointer"
                                  data-bs-target="#exampleModal"
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-danger"
                                  onClick={() =>
                                    handleApprove(
                                      item.id,
                                      item.code_user,
                                      item.money,
                                      "ไม่อนุมัติ"
                                    )
                                  }
                                >
                                  ไม่อนุมัติ
                                </button>

                                <button
                                  type="button"
                                  class="btn btn-primary ml-3"
                                  onClick={() =>
                                    handleApprove(
                                      item.id,
                                      item.code_user,
                                      item.money,
                                      "อนุมัติ"
                                    )
                                  }
                                >
                                  อนุมัติ
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id="exampleModalLabel"
                        ></h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <img src={urlImage} alt="" width={"60%"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneySlip;
