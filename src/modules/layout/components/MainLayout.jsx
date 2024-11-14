import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import SideBar from "../../shared/components/SideBarMenu/SideBar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ loginData, removeLoginData }) => {
  return (
    <div className="d-flex ">
      <SideBar removeLoginData={removeLoginData} />
      <div className="col-9 col-md-11 mx-auto">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
