import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../../services/validation/validationRules";
import { useEffect, useState } from "react";
import { apiInstance } from "../../../../services/api/apiInstance";
import { users_endpoints } from "../../../../services/api/apiConfig";
import { toast } from "react-toastify";
import UploadImgBox from "../../../shared/components/UploadImgBox/UploadImgBox";
import ShowUploadImgBox from "../../../shared/components/ShowUploadImgBox/ShowUploadImgBox";
import useToggle from "../../../../hooks/useToggle";

const Register = () => {
  // const [passwordVisibility, setPasswordVisibility] = useState([false, false]);
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();
  const { passwordVisibility, togglePasswordVisibility } = useToggle([
    false,
    false,
  ]);
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
  // const togglePasswordVisibility = (index) => {
  //   setPasswordVisibility((prev) => {
  //     return prev.map((item, i) => {
  //       return i === index ? !item : item;
  //     });
  //   });
  // };

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
        <UploadImgBox
          register={{ ...register("profileImage") }}
          isSubmitting={isSubmitting}
        />
        <ShowUploadImgBox imgUrl={imgUrl} imageName={imageName} />
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
