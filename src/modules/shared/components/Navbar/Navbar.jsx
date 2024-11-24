/* eslint-disable react/prop-types */
import { useContext } from "react";
import avatar from "../../../../assets/avatar.png";
import { AuthContext } from "../../../../context/AuthContext";
import { IMAGE_URL } from "../../../../services/api/apiConfig";

const Navbar = () => {
  const { loginData } = useContext(AuthContext);
  console.log(loginData?.imagePath);
  return (
    <div
      className="py-2 px-3 d-flex justify-content-end align-items-center gap-1 my-3 mx-3 rounded"
      style={{ backgroundColor: "#F8F9FB" }}
    >
      <img
        src={loginData?.imagePath ? IMAGE_URL + loginData?.imagePath : avatar}
        alt="user avatar"
        className="avatar"
      />
      <span>{loginData?.userName}</span>
    </div>
  );
};

export default Navbar;
