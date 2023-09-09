import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt /> */}
          <span>ระบบเช็คสินค้า จีน - ไทย</span>
        </a>
        <nav id="navbar" className="navbar">
          <ul>
            {/*  <li>
              <a className="nav-link scrollto active" href="#hero">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#services">
                Services
              </a>
            </li> */}
            {/* <li className="dropdown">
              <a href="#">
                <span>Drop Down</span> <i className="bi bi-chevron-down" />
              </a>
              <ul>
                <li>
                  <a href="#">Drop Down 1</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Deep Drop Down</span>{" "}
                    <i className="bi bi-chevron-right" />
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Drop Down 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Drop Down 2</a>
                </li>
                <li>
                  <a href="#">Drop Down 3</a>
                </li>
                <li>
                  <a href="#">Drop Down 4</a>
                </li>
              </ul>
            </li>
            <li className="dropdown megamenu">
              <a href="#">
                <span>Mega Menu</span> <i className="bi bi-chevron-down" />
              </a>
              <ul>
                <li>
                  <a href="#">Column 1 link 1</a>
                  <a href="#">Column 1 link 2</a>
                  <a href="#">Column 1 link 3</a>
                </li>
                <li>
                  <a href="#">Column 2 link 1</a>
                  <a href="#">Column 2 link 2</a>
                  <a href="#">Column 3 link 3</a>
                </li>
                <li>
                  <a href="#">Column 3 link 1</a>
                  <a href="#">Column 3 link 2</a>
                  <a href="#">Column 3 link 3</a>
                </li>
                <li>
                  <a href="#">Column 4 link 1</a>
                  <a href="#">Column 4 link 2</a>
                  <a href="#">Column 4 link 3</a>
                </li>
              </ul>
            </li> */}
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
