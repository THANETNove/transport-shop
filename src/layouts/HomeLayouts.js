import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

import routes from "../routes.js";

const Home = (props) => {
  console.log("routes", routes);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log("prop", prop.layout);
      if (prop.layout == "/home") {
        return (
          <Route path={prop.path} element={<prop.component />} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Home;
