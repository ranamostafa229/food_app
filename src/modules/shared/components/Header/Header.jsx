import headerImg from "../../../../assets/header-img.png";
/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  return (
    <div className="header-container  mx-3 p-5 d-flex justify-content-between align-items-center  ">
      <div className="caption">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="header-img">
        <img src={headerImg} alt="header image" />
      </div>
    </div>
  );
};

export default Header;
