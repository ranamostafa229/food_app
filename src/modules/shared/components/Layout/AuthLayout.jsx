import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";

const AuthLayout = () => {
  const [isAuthenticated] = useState(() => !!localStorage.getItem("token")); // call function only first time
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  console.log(location);
  return (
    <>
      {!isAuthenticated && (
        <div className="auth-container ">
          <div className="container-fluid bg-overlay ">
            <div className="row vh-100 justify-content-center align-items-center mx-1 ">
              <div
                className={`${
                  location.pathname === "/register" ? "col-lg-7 " : "col-lg-5"
                } col-md-6  bg-white rounded rounded-2 px-5 py-3 `}
              >
                <div className="logo-container text-center">
                  <img
                    src={logo}
                    alt="logo"
                    className={
                      location.pathname === "/register" ? "w-50" : "w-75"
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
//   {
//   const token = localStorage.getItem("token");
//   if (token) return true;
//   return false;
// }
