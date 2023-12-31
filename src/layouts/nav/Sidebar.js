import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const user = useSelector((state) => state.auth.user);

  const Logout = () => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: null,
    });
    navigate("/");
  };

  const activePath = (path) => {
    let pathUrl =
      currentPath && currentPath == path ? "nav-item active" : "nav-item";
    return pathUrl;
  };

  return (
    <>
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          {user && user.status == 0 ? (
            <>
              <div className="sidebar-brand-icon">
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
              <div className="sidebar-brand-icon">
                <i class="fa-solid fa-people-roof"></i>
              </div>
              <span className="sidebar-brand-text mx-3 a-pointer">Manager</span>
            </>
          )}
        </a>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Interface</div>
        <li className={activePath("/product-list")}>
          <Link className="nav-link" to="/product-list">
            <i class="fa-solid fa-table-columns"></i>
            <span>พัสดุทั้งหมด</span>
          </Link>
        </li>

        {/* Users */}
        {user && user.status == 0 && (
          <>
            <li className={activePath("/product-code")}>
              <Link className="nav-link" to="/product-code">
                <i class="fa-solid fa-layer-group"></i>
                <span>สร้างรหัสตัวแทน</span>
              </Link>
            </li>
            <li className={activePath("/money")}>
              <Link className="nav-link" to="/money">
                <i class="fa-solid fa-sack-dollar"></i>
                <span>เติมเงินเข้ากระเป๋า </span>
              </Link>
            </li>
            <li className={activePath("/record-money-wallet")}>
              <Link className="nav-link" to="/record-money-wallet">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>ประวัติเติมเงิน </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-warehouse"></i>
                <span>สินค้าเข้าโกดังไทย</span>
              </Link>
            </li>
            <li className={activePath("/bill-all")}>
              <Link className="nav-link" to="/bill-all">
                <i class="fa-solid fa-file-invoice"></i>
                <span>ออกบิล</span>
              </Link>
            </li>
            <li className={activePath("/bill-list")}>
              <Link className="nav-link" to="/bill-list">
                <i class="fa-solid fa-file-invoice"></i>
                <span>รายการพัสดุออกบิล</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-arrow-up-9-1"></i>
                <span>แจ้งเลขพัสดุเพิ่มเติม</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-brands fa-product-hunt"></i>
                <span>สั่งซื้อสินค้าจีน</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-qrcode"></i>
                <span>แจ้งQCสินค้า</span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-warehouse"></i>
                <span>ที่อยู่โกดังจีน </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-server"></i>
                <span>ใช้บริการล่ามรายครึ่งปี </span>
              </Link>
            </li>
            <li className={activePath("/money-wallet1")}>
              <Link className="nav-link" to="/money-wallet">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>แลกเงิน </span>
              </Link>
            </li>
          </>
        )}

        {/* manager */}

        {user && user.status == 2 && (
          <>
            <li className={activePath("/status-list")}>
              <Link className="nav-link" to="/status-list">
                <i class="fa-solid fa-layer-group"></i>
                <span>สถานะ พัสดุ</span>
              </Link>
            </li>
            <li className={activePath("/product-type-list")}>
              <Link className="nav-link" to="/product-type-list">
                <i class="fa-solid fa-notes-medical"></i>
                <span>ประเภทพัสดุ</span>
              </Link>
            </li>
            <li className={activePath("/price-per-user")}>
              <Link className="nav-link" to="/price-per-user">
                <i class="fa-solid fa-tag"></i>
                <span>ราคาต่อ User</span>
              </Link>
            </li>
          </>
        )}

        {user && user.status > 0 && (
          <>
            <li className={activePath("/check-bill")}>
              <Link className="nav-link" to="/check-bill">
                <i class="fa-solid fa-tag"></i>
                <span>ตรวจสอบบิล</span>
              </Link>
            </li>
            <li className={activePath("/record-bill")}>
              <Link className="nav-link" to="/record-bill">
                <i class="fa-solid fa-tag"></i>
                <span>ประวัติตรวจสอบบิล</span>
              </Link>
            </li>
            <li className={activePath("/check-money")}>
              <Link className="nav-link" to="/check-money">
                <i class="fa-solid fa-sack-dollar"></i>
                <span>อนุมัติเติมเงิน</span>
              </Link>
            </li>
            <li className={activePath("/list-slip-money")}>
              <Link className="nav-link" to="/list-slip-money">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>ประวัติเติมเงิน </span>
              </Link>
            </li>
            <li className={activePath("/new-password")}>
              <Link className="nav-link" to="/new-password">
                <i class="fa-solid fa-key"></i>
                <span>เปลี่ยน password </span>
              </Link>
            </li>
          </>
        )}
        {/* <li className="nav-item">
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
        </li>*/}

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
};

export default Sidebar;
