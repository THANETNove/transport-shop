import React, { useEffect, useState } from "react";
import Service from "../../server_api/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const NewPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAll } = useSelector((state) => state.get);
  const [data, setData] = useState(userAll);
  const [user, setUser] = useState(null);
  const [new_password, setNew_password] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    await Service.getUserAll(dispatch); // ดึงรหัสพัสดุ
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(userAll);
  }, [userAll]);

  const handleSubmit = async () => {
    const isConfirmed = window.confirm(t("new_password.change_your_password"));
    //thiuserHPQ4ei

    if (isConfirmed) {
      const response = await Service.updatePassword(
        user && user.id,
        new_password
      ); // ดึงรหัสพัสดุ

      if (response.status == "success") {
        setNew_password(null);
        document.getElementById("btn-close") &&
          document.getElementById("btn-close").click();
        setMessage(t("new_password.change_successful"));

        setTimeout(() => {
          setMessage(null);
          fetchData();
        }, 3000);
      }
      /*   console.log("response", response); */
    }
  };

  const searchData = (event) => {
    const { value } = event.target;
    setData(userAll);

    if (value) {
      const user = Object.values(userAll).filter((item) =>
        item.username.includes(value)
      );
      if (user.length > 0) {
        setData(user);
      } else {
        setData(userAll);
      }
    }
  };

  console.log("new_password", new_password);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {t("new_password.change_password")}
              <span className="mt-3" style={{ color: "green" }}>
                {message}
              </span>
              <div className="col-md-6 col-sm-8 col-8">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control  background-white bg-light border-0 small"
                    placeholder={t("customer_id")}
                    aria-label="Search"
                    /*   value={searchText} */
                    onChange={searchData}
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t("show_status.id")}</th>
                      <th scope="col">{t("new_password.name")}</th>
                      <th scope="col">{t("customer_id")}</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr>
                          <th scope="row">{++index}</th>
                          <td>{item.username}</td>
                          <td>{item.customerCode}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setUser(item)}
                            >
                              {t("new_password.change_password")}
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

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {user && user.username}
              </h1>
              <button
                type="button"
                className="btn-close"
                id="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                  {t("new_password.new_password")}
                </label>
                <input
                  type="text"
                  value={new_password || ""}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder={t("new_password.new_password")}
                  onChange={(event) => setNew_password(event.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                {t("create_product.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
