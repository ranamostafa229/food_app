import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const AuthLayout = () => {
  const [isAuthenticated] = useState(() => !!localStorage.getItem("token")); // call function only first time
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  useDocumentTitle();
  return (
    <>
      {!isAuthenticated && (
        <div className="auth-container  ">
          <div className="container-fluid  bg-overlay">
            <div
              className="row justify-content-center align-items-center mx-1   "
              style={{ minHeight: "100vh" }}
            >
              <div
                className={`${
                  location.pathname === "/register"
                    ? "col-lg-7 mt-5 mb-2"
                    : "col-lg-5"
                } col-md-6  bg-white rounded rounded-2 px-5 py-3  justify-content-center align-items-center `}
              >
                <div className="logo-container text-center">
                  <img
                    src={logo}
                    alt="logo"
                    className={
                      location.pathname === "/register"
                        ? "register-logo"
                        : "w-75"
                    }
                  />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
