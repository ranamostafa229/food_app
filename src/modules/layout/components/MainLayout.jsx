import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import SideBar from "../../shared/components/SideBar/SideBar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ loginData }) => {
  return (
    <div className="d-flex vh-100 ">
      <div>
        <SideBar />
      </div>
      <div className="w-100 ">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
