import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({data}) {
  
  const location = useLocation();
  const isActive = location.pathname;

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        className="left-nav bg-white p-0 offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header d-flex justify-content-between ">
          <a className=" navbar-brand sidebarlogo py-3">DS Services</a>
          <button
            type="button"
            className="btn-close my-4 mx-2 d-block d-sm-none d-md-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column mb-auto">
            {data.map((e, i) => {
              return (               
                  <li
                    key={i}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    <div
                       className="nav-link"
                       data-bs-toggle="collapse"
                       data-bs-target={`#collapseUtilities${i}`}
                       aria-expanded="true"
                       aria-controls={`collapseUtilities${i}`}
                    >
                      <Link to={e.link}>
                        <i className={`fa-solid ${e.icon}`}></i>
                        <span>{e.title}</span>
                      </Link>
                    </div>
                  </li>
              )
            })}

            <button
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              onClick={logout}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
