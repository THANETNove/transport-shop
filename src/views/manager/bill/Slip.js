import React, { useEffect, useState } from "react";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const MoneySlip = () => {
  const { t } = useTranslation();
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
      status == t("check_money.approved")
        ? t("check_money.you_want_approved")
        : t("check_money.you_want_not_approved")
    );

    if (isConfirmed) {
      const responsive = await Service.updateSlip(id, code_user, money, status);
      if (responsive.status == "success") {
        setMessage(t("check_money.update_successful"));
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
              {t("check_money.top_up")}
              <p className="mt-3" style={{ color: "green" }}>
                {message}
              </p>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t("show_status.id")}</th>
                      <th scope="col">{t("customer_id")}</th>
                      <th scope="col">{t("check_money.amount_money")}</th>
                      <th scope="col">{t("check_bill.date")}</th>
                      <th scope="col">{t("check_money.time")}</th>
                      <th scope="col">{t("product_list.status")}</th>
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
                              <td>
                                {item.time} {t("check_bill.n")}
                              </td>
                              <td>
                                {item.statusSlip == "รอการตรวจสอบ" && (
                                  <p style={{ color: "#858796" }}>
                                    {" "}
                                    {t("check_money.verification")}
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
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleApprove(
                                      item.id,
                                      item.code_user,
                                      item.money,
                                      "ไม่อนุมัติ"
                                    )
                                  }
                                >
                                  {t("check_money.not_approved")}
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-primary ml-3"
                                  onClick={() =>
                                    handleApprove(
                                      item.id,
                                      item.code_user,
                                      item.money,
                                      "อนุมัติ"
                                    )
                                  }
                                >
                                  {t("check_money.approved")}
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="exampleModalLabel"
                        ></h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
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
