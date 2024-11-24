import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

// eslint-disable-next-line react/prop-types
const MainLayout = () => {
  useDocumentTitle();
  return (
    <div className="d-flex ">
      <SideBarMenu />
      <div className="d-flex flex-column content  me-3 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
