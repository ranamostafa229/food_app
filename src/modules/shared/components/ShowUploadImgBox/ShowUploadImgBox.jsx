import { useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
const ShowUploadImgBox = ({ imgUrl, imageName }) => {
  const { pathname } = useLocation();
  return (
    <>
      {imgUrl && (
        <div
          className={`selected-img-container d-flex align-items-center
            ${imgUrl ? "show" : ""} ${
            pathname === "/register"
              ? "register-width bg-transparent justify-content-center"
              : "img-thumbnail w-100"
          }`}
        >
          <img
            src={imgUrl}
            className={`img-thumbnail rounded-2   ${
              pathname === "/register" ? "sm-img" : "lg-img"
            }`}
            alt=""
          />
          <span>{imageName}</span>
        </div>
      )}
    </>
  );
};

export default ShowUploadImgBox;
