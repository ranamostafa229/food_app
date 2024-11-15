import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ loginData, removeLoginData }) => {
  // col-1  w-auto sidebar-container h-100 bg-danger
  return (
    <div className="d-flex ">
      <SideBarMenu removeLoginData={removeLoginData} />
      <div className="col-10 ps-5 col-md-11 mx-auto   ">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
