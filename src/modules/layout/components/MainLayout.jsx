import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import Header from "../../shared/components/Header/Header";
import Sidebar from "../../shared/components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex vh-100 ">
      <div className="w-25 bg-light">
        <Sidebar />
      </div>
      <div className="w-100 bg-info">
        <Navbar />
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
