import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import Header from "../../shared/components/Header/Header";
import SideBar from "../../shared/components/SideBar/SideBar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ loginData }) => {
  return (
    <div className="d-flex vh-100 ">
      <div>
        <SideBar />
      </div>
      <div className="w-100 bg-success">
        <Navbar loginData={loginData} />
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
