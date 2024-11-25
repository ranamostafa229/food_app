import { useLocation } from "react-router-dom";
import { IMAGE_URL } from "../../../../services/api/apiConfig";

/* eslint-disable react/prop-types */
const ShowUploadImgBox = ({ imgUrl, imageName, uploadedImage }) => {
  const { pathname } = useLocation();
  console.log("uploadedImage", uploadedImage);
  return (
    <>
      {(imgUrl || pathname !== "/recipes/new-recipe") && (
        <div
          className={`selected-img-container d-flex align-items-center
            ${imgUrl || uploadedImage !== "" ? "show" : ""} ${
            pathname === "/register"
              ? "register-width bg-transparent justify-content-center"
              : "img-thumbnail w-100"
          }`}
        >
          <img
            src={
              uploadedImage !== "" && !imgUrl
                ? IMAGE_URL + uploadedImage
                : imgUrl
            }
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
