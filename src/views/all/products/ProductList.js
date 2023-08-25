import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../server/server";
import { useSelector, useDispatch } from "react-redux";

export default function ProductList() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = async () => {
      await Service.getProductType(dispatch); // ดึงสถานะสิค้า
      await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
    };

    fetchData();
  }, []);
  
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50" /> Generate Report
        </a>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              {/*  <h6 className="m-0 font-weight-bold text-primary">เพิ่มสินค้า</h6> */}
              <Link className="btn btn-primary" to="/create-product">
                เพิ่มสินค้า
              </Link>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table  align-middle table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
