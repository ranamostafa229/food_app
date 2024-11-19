import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../../services/validation/validationRules";
import { useEffect, useState } from "react";
import { apiInstance } from "../../../../services/api/apiInstance";
import { users_endpoints } from "../../../../services/api/apiConfig";
import { toast } from "react-toastify";

const Register = () => {
  const [passwordVisibility, setPasswordVisibility] = useState([false, false]);
  const [imgUrl, setImgUrl] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });
  const validationRules = getValidationRules(watch);
  const selectedImg = watch("profileImage");
  const imageName = selectedImg?.[0]?.name;

  useEffect(() => {
    if (selectedImg?.[0]) {
      setImgUrl(URL.createObjectURL(selectedImg?.[0]));
      selectedImg?.[0] !== undefined &&
        toast.success("Image uploaded successfully");
    }
  }, [selectedImg]);
  const togglePasswordVisibility = (index) => {
    setPasswordVisibility((prev) => {
      return prev.map((item, i) => {
        return i === index ? !item : item;
      });
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await apiInstance.post(
        users_endpoints.REGISTER,
        formData
      );
      if (response.status === 201) {
        toast.success(
          response?.data?.message ||
            "Register Successfully, A verification code has been sent to your email address."
        );
        navigate("/verfiy-account", {
          state: { email: formData.get("email") },
        });
      } else {
        toast.error("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="title my-3">
        <h1 className="h5 fw-bold">Register</h1>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3  ">
        <div className="col-lg-6 col-md-6 pe-lg-5">
          <div className="input-group mb-2">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <i
                className="fa fa-user "
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type="text"
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="UserName"
              aria-label="username"
              aria-describedby="input-group-left"
              {...register("userName", validationRules.userName)}
            />
          </div>
          {errors?.userName && (
            <span className="text-danger">{errors.userName.message}</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6 ">
          <div className="input-group mb-2 ">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <i
                className="fa fa-envelope "
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type="email"
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="input-group-left"
              {...register("email", validationRules.email)}
            />
          </div>
          {errors?.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6 pe-lg-5">
          <div className="input-group mb-2 ">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <i
                className="fa fa-globe"
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type="text"
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="Country"
              aria-label="Country"
              aria-describedby="input-group-left"
              {...register("country", validationRules.country)}
            />
          </div>
          {errors?.country && (
            <span className="text-danger">{errors.country.message}</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="input-group mb-2">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <i
                className="fa fa-mobile"
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type="number"
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="PhoneNumber"
              aria-label="PhoneNumber"
              aria-describedby="input-group-left"
              {...register("phoneNumber", validationRules.phoneNumber)}
            />
          </div>
          {errors?.phoneNumber && (
            <span className="text-danger">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6 pe-lg-5">
          <div className="input-group mb-2 ">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <i
                className="fa fa-key"
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type={passwordVisibility[0] ? "text" : "password"}
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="New Password"
              aria-label="password"
              aria-describedby="input-group-left"
              {...register("password", validationRules.password)}
            />
            <button
              type="button"
              className="btn btn-light border-0"
              id="input-group-button-right-1"
              onClick={() => togglePasswordVisibility(0)}
              aria-label="toggle password visibility"
            >
              <i
                className={`fa-regular ${
                  passwordVisibility[0] ? "fa-eye-slash" : "fa-eye"
                }  cursor-pointer text-muted `}
                aria-hidden="true"
              />
            </button>
          </div>
          {errors?.password && (
            <span className="text-danger ">{errors.password.message}</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="input-group mb-2  ">
            <span
              className="input-group-text border-0"
              id="input-group-left-example"
            >
              <span className="sr-only">
                {passwordVisibility[0] ? "Hide password" : "Show password"}
              </span>
              <i
                className="fa fa-key"
                aria-hidden="true"
                style={{ color: "#8391A1" }}
              />
            </span>
            <input
              type={passwordVisibility[1] ? "text" : "password"}
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
              placeholder="Confirm Password"
              aria-label="confirm password"
              aria-describedby="input-group-left"
              {...register("confirmPassword", validationRules.confirmPassword)}
            />
            <button
              type="button"
              className="btn btn-light border-0"
              id="input-group-button-right-2"
              onClick={() => togglePasswordVisibility(1)}
              aria-label="toggle confirm password visibility"
            >
              <span className="sr-only">
                {passwordVisibility[1]
                  ? "Hide confirm password"
                  : "Show confirm password"}
              </span>
              <i
                className={`fa-regular ${
                  passwordVisibility[1] ? "fa-eye-slash" : "fa-eye"
                }  cursor-pointer text-muted `}
                aria-hidden="true"
              />
            </button>
          </div>
          {errors?.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <label
          htmlFor="profileImage"
          className="upload-img-container d-flex flex-column align-items-center mx-auto py-3 text-center cursor-pointer "
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
          <span>Drag & Drop or Choose a Item Image to Upload</span>
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            aria-label="upload profile image"
            className="d-none"
            {...register("profileImage")}
            // ref={imgInputRef}
          />
        </label>
        {imgUrl && (
          <div
            className={`selected-img-container d-flex align-items-center img-thumbnail ${
              imgUrl ? "show" : ""
            }`}
          >
            <img src={imgUrl} className="img-thumbnail rounded-2" alt="" />
            <span>{imageName}</span>
          </div>
        )}
        <div className="links d-flex justify-content-end">
          <Link to="/login" className="text-decoration-none text-success">
            Login Now ?
          </Link>
        </div>
        <button
          disabled={isSubmitting}
          className="btn btn-success w-75  my-3 fw-bold mx-auto"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
