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
      <Helmet>
        <link
          href="assetsAuth/vendor/fontawesome-free/css/all.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
        <link href="assetsAuth/css/sb-admin-2.min.css" rel="stylesheet" />

        {/* body */}

        <script src="assetsAuth/vendor/jquery/jquery.min.js"></script>
        <script src="assetsAuth/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="assetsAuth/vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="assetsAuth/js/sb-admin-2.min.js"></script>

        <script src="assetsAuth/vendor/chart.js/Chart.min.js"></script>
      </Helmet>
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
