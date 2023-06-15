import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Roles } from "../Enum/Constants";
import useAuth from "../../../hooks/useAuth";
export const Navbar = () => {
  const roles = useAuth().roles;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="shark-navbar">
        <img src="./images/logo2.png" className="logo-img" alt="logo-img" />
        {/* <h4>Al Sharak</h4> */}
        <div className="menus-items">
          <button
            class="nav_link"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <a class="menu-icon">
              <i class="uil uil-bars"></i>
            </a>
          </button>
          <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
            {roles.includes(Roles.Logistic) && (
              <Link to="/add-case">
                <a className="dropdown-item">
                  <i class="uil uil-plus-circle"></i>
                  Create New
                </a>
              </Link>
            )}
            {roles.includes(Roles.Archiver) && (
              <>
                <Link to="/cases">
                  <a className="dropdown-item">
                    <i class="uil uil-clipboard-notes"></i>
                    Coming
                  </a>
                </Link>
                <Link to="/history">
                  <a className="dropdown-item">
                    <i class="uil uil-history"></i>
                    History
                  </a>
                </Link>
              </>
            )}
            {roles.includes(Roles.Accounter) && (
              <>
                <Link to="/under-process">
                  <a className="dropdown-item">
                    <i class="uil uil-sync"></i>
                    Under Process
                  </a>
                </Link>
              </>
            )}
            {roles.includes(Roles.Admin) && (
              <>
                <Link to="/add-case">
                  <a className="dropdown-item">
                    <i class="uil uil-plus-circle"></i>
                    Create New
                  </a>
                </Link>
                <Link to="/cases">
                  <a className="dropdown-item">
                    <i class="uil uil-clipboard-notes"></i>
                    Coming
                  </a>
                </Link>
                <Link to="/history">
                  <a className="dropdown-item">
                    <i class="uil uil-history"></i>
                    History
                  </a>
                </Link>
                <Link to="/under-process">
                  <a className="dropdown-item">
                    <i class="uil uil-sync"></i>
                    Under Process
                  </a>
                </Link>
              </>
            )}
            <Link
              onClick={() => {
                logout();
              }}
            >
              <a className="dropdown-item">
                <i class="uil uil-sign-out-alt"></i>
                Log out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
