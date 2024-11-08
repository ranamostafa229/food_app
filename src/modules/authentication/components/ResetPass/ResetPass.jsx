import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import apiInstance from "../../../../api/apiInstance";
import { endpoints } from "../../../../api/apiConfig";
import { getValidationRules } from "../../../../validation/validationRules";

const ResetPass = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState([false, false]);
  const validationRules = getValidationRules(watch);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await apiInstance.post(endpoints.reset, data);
      setLoading(false);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const togglePasswordVisibility = (index) => {
    setPasswordVisibility((prev) => {
      return prev.map((item, i) => {
        return i === index ? !item : item;
      });
    });
  };

  return (
    <div>
      <div className="logo-container text-center">
        <img src={logo} alt="logo" className="w-75" />
      </div>
      <div className="title my-3">
        <h1 className="h5 fw-bold">Reset Password</h1>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-2">
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
            placeholder="E-mail"
            aria-label="email"
            aria-describedby="input-group-left"
            {...register("email", validationRules.email)}
            value={state?.email}
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
        <div className="input-group mb-2 mt-2">
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
            type="text"
            className="form-control  bg-light border-top-0 border-end-0 border-bottom-0"
            placeholder="OTP"
            aria-label="otp"
            aria-describedby="input-group-left"
            {...register("seed", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.seed && (
          <span className="text-danger">{errors.seed.message}</span>
        )}
        <div className="input-group mb-2 mt-2">
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
        {errors.password && (
          <span className="text-danger ">{errors.password.message}</span>
        )}
        <div className="input-group mb-2 mt-2">
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
            type={passwordVisibility[1] ? "text" : "password"}
            className="form-control bg-light border-top-0 border-end-0 border-bottom-0"
            placeholder="Confirm New Password"
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
            <i
              className={`fa-regular ${
                passwordVisibility[1] ? "fa-eye-slash" : "fa-eye"
              }  cursor-pointer text-muted `}
              aria-hidden="true"
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}

        <button
          className="btn btn-success w-100 my-3 fw-bold"
          aria-label="submit button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
