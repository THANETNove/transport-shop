import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const user = useSelector((state) => state.auth.user);

  const Logout = () => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: null,
    });
    navigate("/");
  };

  const activePath = (path) => {
    let pathUrl =
      currentPath && currentPath == path ? "nav-item active" : "nav-item";
    return pathUrl;
  };

  return (
    <>
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          {user && user.status == 0 ? (
            <>
              <div className="sidebar-brand-icon">
                <i class="fa-solid fa-users"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer">
                {" "}
                {t("siaebar.user")}
              </span>
            </>
          ) : user && user.status == 1 ? (
            <>
              <div className="sidebar-brand-icon">
                <i class="fa-solid fa-headset"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer">
                {" "}
                {t("siaebar.admin")}
              </span>
            </>
          ) : (
            <>
              <div className="sidebar-brand-icon">
                <i class="fa-solid fa-people-roof"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer">
                {" "}
                {t("siaebar.manager")}
              </span>
            </>
          )}
        </a>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">{t("siaebar.interface")}</div>
        <li className={activePath("/product-list")}>
          <Link className="nav-link" to="/product-list">
            <i class="fa-solid fa-table-columns"></i>
            <span>{t("siaebar.all_parcels")}</span>
          </Link>
        </li>

        {/* Users */}
        {user && user.status == 0 && (
          <>
            <li className={activePath("/product-code")}>
              <Link className="nav-link" to="/product-code">
                <i class="fa-solid fa-layer-group"></i>
                <span>{t("siaebar.create_agent_code")}</span>
              </Link>
            </li>
            <li className={activePath("/money")}>
              <Link className="nav-link" to="/money">
                <i class="fa-solid fa-sack-dollar"></i>
                <span>{t("siaebar.money_wallet")} </span>
              </Link>
            </li>
            <li className={activePath("/record-money-wallet")}>
              <Link className="nav-link" to="/record-money-wallet">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>{t("siaebar.top_up_history")} </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-warehouse"></i>
                <span>{t("siaebar.entering_thai")}</span>
              </Link>
            </li>
            <li className={activePath("/bill-all")}>
              <Link className="nav-link" to="/bill-all">
                <i class="fa-solid fa-file-invoice"></i>
                <span>{t("siaebar.issue_bil")}</span>
              </Link>
            </li>
            <li className={activePath("/bill-list")}>
              <Link className="nav-link" to="/bill-list">
                <i class="fa-solid fa-file-invoice"></i>
                <span>{t("siaebar.billed_list")}</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-arrow-up-9-1"></i>
                <span>{t("siaebar.additional")}</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-brands fa-product-hunt"></i>
                <span>{t("siaebar.order_chinese")}</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-qrcode"></i>
                <span>{t("siaebar.notify_qr")}</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-warehouse"></i>
                <span>{t("siaebar.chinese_address")} </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-server"></i>
                <span>{t("siaebar.interpreter")} </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>{t("siaebar.exchange_money")} </span>
              </Link>
            </li>
          </>
        )}

        {/* manager */}

        {user && user.status == 2 && (
          <>
            <li className={activePath("/status-list")}>
              <Link className="nav-link" to="/status-list">
                <i class="fa-solid fa-layer-group"></i>
                <span>{t("parcel_status")}</span>
              </Link>
            </li>
            <li className={activePath("/product-type-list")}>
              <Link className="nav-link" to="/product-type-list">
                <i class="fa-solid fa-notes-medical"></i>
                <span>{t("create_product.parcel_type")}</span>
              </Link>
            </li>
            <li className={activePath("/price-per-user")}>
              <Link className="nav-link" to="/price-per-user">
                <i class="fa-solid fa-tag"></i>
                <span>{t("price_per_user.price_user")}</span>
              </Link>
            </li>
          </>
        )}

        {user && user.status > 0 && (
          <>
            <li className={activePath("/check-bill")}>
              <Link className="nav-link" to="/check-bill">
                <i class="fa-solid fa-tag"></i>
                <span>{t("check_the_bill")}</span>
              </Link>
            </li>
            <li className={activePath("/record-bill")}>
              <Link className="nav-link" to="/record-bill">
                <i class="fa-solid fa-tag"></i>
                <span>{t("bill_check_history")}</span>
              </Link>
            </li>
            <li className={activePath("/bill-list")}>
              <Link className="nav-link" to="/bill-list-admin">
                <i class="fa-solid fa-file-invoice"></i>
                <span>{t("siaebar.billed_list")}</span>
              </Link>
            </li>
            <li className={activePath("/check-money")}>
              <Link className="nav-link" to="/check-money">
                <i class="fa-solid fa-sack-dollar"></i>
                <span>{t("top_up_approval")}</span>
              </Link>
            </li>
            <li className={activePath("/list-slip-money")}>
              <Link className="nav-link" to="/list-slip-money">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>{t("siaebar.top_up_history")} </span>
              </Link>
            </li>
            <li className={activePath("/new-password")}>
              <Link className="nav-link" to="/new-password">
                <i class="fa-solid fa-key"></i>
                <span>{t("change_password")} </span>
              </Link>
            </li>
          </>
        )}


        <li className="nav-item">
          <a className="nav-link" onClick={() => Logout()}>
            <i class="fas fa-sign-out-alt"></i>
            <span> {t("system.logout")}</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </>
  );
};

export default Sidebar;
