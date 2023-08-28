import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import createRoutes from "../routes.js";

import Sidebar from "./nav/Sidebar.js";
import Navbar from "./nav/Navbar.js";
import Footer from "./nav/Footer.js";

const Auth = (props) => {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  if (location.pathname != "/login" && location.pathname != "/register") {
    if (!user) {
      return <Navigate to="/" />;
    }
  }

  var status = null;
  if (user && user.status == 0) {
    status = "user";
  } else if (user && user.status == 1) {
    status = "admin";
  } else if (user && user.status == 2) {
    status = "manager";
  }
  const routes = createRoutes(status);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout == "/auth") {
        return (
          <Route path={prop.path} element={<prop.component />} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Helmet>
       

        {(location.pathname === "/login" ||
          location.pathname === "/register") && (
          <style type="text/css">
            {`
            body {
                margin: 0;
                font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #858796;
                text-align: left;
                background: url(../assets/img/hero-bg.png);
            }
        `}
          </style>
        )}



      </Helmet> 

      {location.pathname == "/login" || location.pathname == "/register" ? (
        <>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      ) : (
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="*"
                  element={<Navigate to="/product-list" replace />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
