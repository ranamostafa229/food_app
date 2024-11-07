import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay ">
        <div className="row vh-100 justify-content-center align-items-center mx-1 ">
          <div className="col-lg-4 col-md-6  bg-white rounded rounded-2 px-5 py-3 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
