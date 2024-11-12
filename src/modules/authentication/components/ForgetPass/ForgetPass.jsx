import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { apiInstance } from "../../../../services/api/apiInstance";
import { getValidationRules } from "../../../../services/validation/validationRules";
import { users_endpoints } from "../../../../services/api/apiConfig";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validationRules = getValidationRules();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await apiInstance.post(
        users_endpoints.resetRequest,
        data
      );
      setLoading(false);
      toast.success(response?.data?.message);
      navigate("/reset-password", { state: { email: data.email } });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="auth-title my-3">
        <h1 className="h5 fw-bold">Forgot Your Password?</h1>
        <span className="text-muted ">
          No worries! Please enter your email and we will send a password reset
          link
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
        <button
          className="btn btn-success w-100 my-3 fw-bold  mt-5 "
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPass;
