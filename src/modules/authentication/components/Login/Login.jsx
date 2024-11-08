/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import apiInstance from "../../../../api/apiInstance";
import { endpoints } from "../../../../api/apiConfig";
import { getValidationRules } from "../../../../validation/validationRules";

const Login = ({ saveLoginData }) => {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const validationRules = getValidationRules();

  const onSubmit = async (data) => {
    try {
      const response = await apiInstance.post(endpoints.login, data);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <div>
      <div className="logo-container text-center">
        <img src={logo} alt="logo" className="w-75" />
      </div>
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
            onClick={togglePasswordVisibility}
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
        <button className="btn btn-success w-100 my-3 fw-bold">Login</button>
      </form>
    </div>
  );
};

export default Login;
