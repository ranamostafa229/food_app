import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const [isAuthenticated] = useState(() => !!localStorage.getItem("token")); // call function only first time
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      {!isAuthenticated && (
        <div className="auth-container ">
          <div className="container-fluid bg-overlay ">
            <div className="row vh-100 justify-content-center align-items-center mx-1 ">
              <div className="col-lg-4 col-md-6  bg-white rounded rounded-2 px-5 py-3 ">
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
