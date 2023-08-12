import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import routes from "../routes.js";

import Sidebar from "./nav/Sidebar.js";
import Navbar from "./nav/Navbar.js";
import Footer from "./nav/Footer.js";

const Auth = (props) => {
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
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Navbar />
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>

      <a className="scroll-ToTop" onClick={scrollToTop}>
        <i class="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Auth;
