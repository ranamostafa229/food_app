import { useLocation } from "react-router-dom";
import headerImg from "../../../../assets/header-img.png";
import headerHomeImg from "../../../../assets/header-img2.png";
/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  const location = useLocation();
  return (
    <div
      className={` header-container mx-2 row py-5 px-3  align-items-center     `}
    >
      <div className="caption col-md-6">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className={` col-md-6 text-end`}>
        <img
          src={location.pathname === "/dashboard" ? headerHomeImg : headerImg}
          alt="header image"
          className="img-fluid  "
        />
      </div>
    </div>
  );
};

export default Header;
