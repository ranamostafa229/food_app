import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import Navbar from "../shared/components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="d-flex gap-5">
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
