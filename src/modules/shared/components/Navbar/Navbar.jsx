/* eslint-disable react/prop-types */
import { useContext } from "react";
import avatar from "../../../../assets/avatar.png";
import { AuthContext } from "../../../../context/AuthContext";

const Navbar = () => {
  const { loginData } = useContext(AuthContext);
  return (
    <div
      className="py-2 px-3 d-flex justify-content-end align-items-center gap-1 my-3 mx-3 rounded"
      style={{ backgroundColor: "#F8F9FB" }}
    >
      <img src={avatar} alt="user avatar" className="avatar" />
      <span>{loginData?.userName}</span>
    </div>
  );
};

export default Navbar;
