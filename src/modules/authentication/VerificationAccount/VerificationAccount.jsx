import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getValidationRules } from "../../../services/validation/validationRules";
import { useEffect } from "react";

const VerificationAccount = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: { email: state?.email } });
  useEffect(() => {
    if (!state?.email) {
      navigate("/register");
    }
  }, [navigate, state]);

  const onSubmit = async (data) => {
    console.log(data);
  };
  const validationRules = getValidationRules(watch);
  return (
    <div>
      <div className="auth-title my-3">
        <h1 className="h5 fw-bold">Verify Your Account</h1>
        <span className="text-muted ">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-5 mb-2">
          <span className="input-group-text" id="input-group-left-example">
            <i
              className="fa fa-envelope "
              aria-hidden="true"
              style={{ color: "#8391A1" }}
            />
          </span>
          <input
            type="email"
            disabled={true}
            className="form-control bg-light"
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="input-group-left"
            {...register("email", validationRules.email)}
          />
        </div>
        {errors.email && (
          <span className="text-danger ">{errors.email.message}</span>
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
            {...register("code", {
              required: "Code is required",
            })}
          />
        </div>
        {errors?.code && (
          <span className="text-danger">{errors.code.message}</span>
        )}
        <button
          className="btn btn-success w-100 my-3 fw-bold  mt-5 "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VerificationAccount;
