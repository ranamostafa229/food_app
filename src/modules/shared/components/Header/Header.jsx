import { useLocation } from "react-router-dom";
import headerImg from "../../../../assets/header-img.png";
import headerHomeImg from "../../../../assets/header-img2.png";
/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname === "/dashboard" && "header-container-dashboard"
      } header-container mx-2 px-5 py-1 d-flex justify-content-between align-items-center`}
    >
      <div className="caption">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div
        className={`${
          location.pathname === "/dashboard" && "header-img"
        } w-75 d-flex justify-content-end`}
      >
        <img
          src={location.pathname === "/dashboard" ? headerHomeImg : headerImg}
          alt="header image"
        />
      </div>
    </div>
  );
};

export default Header;
