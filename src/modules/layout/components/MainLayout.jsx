import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import SideBar from "../../shared/components/SideBar/SideBar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ loginData }) => {
  return (
    <div className="d-flex min-vh-100">
      <SideBar />
      <div className="main-layout w-100 d-flex flex-column ">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
