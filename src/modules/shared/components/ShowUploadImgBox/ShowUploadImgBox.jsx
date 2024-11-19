import { useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
const ShowUploadImgBox = ({ imgUrl, imageName }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      {imgUrl && (
        <div
          className={`selected-img-container d-flex align-items-center img-thumbnail 
            ${imgUrl ? "show" : ""} ${
            pathname === "/register" ? "wwidth" : "w-100"
          }`}
        >
          <img src={imgUrl} className="img-thumbnail rounded-2" alt="" />
          <span>{imageName}</span>
        </div>
      )}
    </>
  );
};

export default ShowUploadImgBox;
