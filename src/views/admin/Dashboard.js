import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  /*   console.log(useSelector((state) => ({ ...state }))); */
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Earnings Overview
              </h6>
            </div>

            <div className="card-body">
              <div className="chart-area">
                <canvas id="myAreaChart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
