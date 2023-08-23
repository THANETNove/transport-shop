import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const Logout = () => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: null,
    });
    navigate("/");
  };
  return (
    <>
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          to="/dashboard"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          {user && user.status == 0 ? (
            <>
              <div className="sidebar-brand-icon rotate-n-15">
                <i class="fa-solid fa-users"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer"> User</span>
            </>
          ) : user && user.status == 1 ? (
            <>
              <div className="sidebar-brand-icon">
                <i class="fa-solid fa-headset"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer"> Admin</span>
            </>
          ) : (
            <>
              <div className="sidebar-brand-icon rotate-n-15">
                <i class="fa-solid fa-people-roof"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer">Manager</span>
            </>
          )}
        </Link>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i class="fa-solid fa-table-columns"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Interface</div>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item">Buttons</a>
              <a className="collapse-item">Cards</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={() => Logout()}>
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </>
  );
}
