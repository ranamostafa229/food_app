import { useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
const UploadImgBox = ({ register }) => {
  const { pathname } = useLocation();
  return (
    <label
      htmlFor="profileImage"
      className={`upload-img-container d-flex flex-column align-items-center ${
        pathname === "/register" ? "mx-auto " : "w-100"
      }
      py-3 text-center cursor-pointer`}
    >
      <svg
        width="37"
        height="22"
        viewBox="0 0 37 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.1472 13.6199C1.78241 13.6199 2.29734 13.9113 2.29734 14.2707V17.5249C2.29734 18.2437 3.3272 18.8265 4.59761 18.8265H32.2008C33.4712 18.8265 34.5011 18.2437 34.5011 17.5249V14.2707C34.5011 13.9113 35.016 13.6199 35.6512 13.6199C36.2864 13.6199 36.8014 13.9113 36.8014 14.2707V17.5249C36.8014 18.9626 34.7416 20.1282 32.2008 20.1282H4.59761C2.0568 20.1282 -0.00292969 18.9626 -0.00292969 17.5249V14.2707C-0.00292969 13.9113 0.512003 13.6199 1.1472 13.6199Z"
          fill="#4F4F4F"
        />
        <path
          d="M17.5859 2.22578C18.0351 1.97162 18.7633 1.97162 19.2125 2.22578L26.1133 6.13074C26.5624 6.3849 26.5624 6.79698 26.1133 7.05115C25.6641 7.30531 24.9359 7.30531 24.4868 7.05115L19.5494 4.25722V15.7025C19.5494 16.062 19.0344 16.3533 18.3992 16.3533C17.764 16.3533 17.2491 16.062 17.2491 15.7025V4.25722L12.3117 7.05115C11.8625 7.30531 11.1343 7.30531 10.6851 7.05115C10.236 6.79698 10.236 6.3849 10.6851 6.13074L17.5859 2.22578Z"
          fill="#4F4F4F"
        />
      </svg>

      <span className="">
        Drag & Drop or{" "}
        <span className="text-success">Choose a Item Image </span>
        to Upload
      </span>
      <input
        type="file"
        accept="image/*"
        id="profileImage"
        aria-label="upload profile image"
        className="d-none"
        {...register}
      />
    </label>
  );
};

export default UploadImgBox;
