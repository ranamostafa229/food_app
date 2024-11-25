/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getValidationRules } from "../../../../services/validation/validationRules";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { users_endpoints } from "../../../../services/api/apiConfig";
import useToggle from "../../../../hooks/useToggle";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const Login = () => {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const validationRules = getValidationRules();
  const { visible: passwordVisibility, toggle } = useToggle(false);

  const { saveLoginData } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      const response = await privateApiInstance.post(
        users_endpoints.LOGIN,
        data
      );
      localStorage.setItem("token", response?.data?.token);
      saveLoginData();
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="title my-3">
        <h1 className="h5 fw-bold">Login</h1>
        <span className="text-muted">
          Welcome Back! Please enter your details
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
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="input-group-left"
            {...register("email", validationRules.email)}
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
        <div className="input-group mb-2 mt-1">
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
            type={passwordVisibility ? "text" : "password"}
            className="form-control bg-light border-top-0 border-end-0 border-bottom-0 "
            placeholder="Enter your Password"
            aria-label="password"
            aria-describedby="input-group-left"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <button
            type="button"
            className="btn btn-light border-0"
            id="input-group-button-right-1"
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            onClick={toggle}
            aria-label="toggle password visibility"
          >
            <i
              className={`fa-regular ${
                passwordVisibility ? "fa-eye-slash" : "fa-eye"
              }  cursor-pointer text-muted `}
              aria-hidden="true"
            />
          </button>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
        <div className="links d-flex justify-content-between">
          <Link to="/register" className="text-decoration-none text-muted">
            Register Now?
          </Link>
          <Link
            to="/forget-password"
            className="text-decoration-none text-success"
          >
            Fotgot Password?
          </Link>
        </div>
        <button
          disabled={isSubmitting}
          className="btn btn-success w-100 my-3 fw-bold"
        >
          {isSubmitting ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
