import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  console.log("t", t("home.title"));
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a className="logo  align-items-center">
          {/* <img src="assets/img/logo.png" alt /> */}
          <span>ระบบเช็คสินค้า จีน - ไทย</span>
        </a>
        <nav id="navbar" className="navbar">
          <div>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("th")}>ไทย</button>
            <button onClick={() => changeLanguage("ch")}>จีน</button>
          </div>
          <h1>{t("welcome")}</h1>

          <ul>
            <li>
              <Link to="/login" className="nav-link ">
                <span>login</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                register
              </Link>
            </li>
            {/*  <li>
              <a className="getstarted scrollto">Get Started</a>
            </li> */}
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
        {/* .navbar */}
      </div>
    </header>
  );
}
