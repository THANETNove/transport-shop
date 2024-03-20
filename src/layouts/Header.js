import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const savedLanguage = localStorage.getItem("i18nextLng");

  const { t } = useTranslation();
  console.log("savedLanguage", savedLanguage);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a className="logo  align-items-center">
          {/* <img src="assets/img/logo.png" alt /> */}
          <span className="text-name-navbar">{t("system_product")}</span>
        </a>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <select
                class="form-select ml-3 col-11 "
                aria-label="Default select example"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en" selected={savedLanguage == "en"}>
                  {t("lang_en")}
                </option>
                <option
                  value="th"
                  selected={savedLanguage == "th" || savedLanguage == null}
                >
                  {t("lang_th")}
                </option>
                <option value="ch" selected={savedLanguage == "ch"}>
                  {t("lang_ch")}
                </option>
              </select>
            </li>
            <li>
              <Link to="/login" className="nav-link ">
                <span>{t("login")}</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                {t("register")}
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
