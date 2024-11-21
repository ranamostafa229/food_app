import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import { Container } from "react-bootstrap";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

// eslint-disable-next-line react/prop-types
const MainLayout = () => {
  useDocumentTitle();
  return (
    <div className="d-flex ">
      <SideBarMenu />
      <Container fluid className="d-flex flex-column content ">
        <Navbar />
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
