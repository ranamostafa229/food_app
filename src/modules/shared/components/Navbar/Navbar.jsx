/* eslint-disable react/prop-types */
import avatar from "../../../../assets/avatar.png";

const Navbar = ({ loginData }) => {
  console.log(loginData);
  return (
    <div className="bg-white py-3 d-flex justify-content-end align-items-center gap-1">
      <img src={avatar} alt="user avatar" className="avatar" />
      <span>{loginData?.userName}</span>
    </div>
  );
};

export default Navbar;
