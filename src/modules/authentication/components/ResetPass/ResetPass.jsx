import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPass = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      toast.success(response?.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay ">
        <div className="row vh-100 justify-content-center align-items-center mx-1 ">
          <div className="col-lg-4 col-md-6  bg-white rounded rounded-2 px-5 py-3 ">
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
                    className="input-group-text"
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
                    className="form-control bg-light"
                    placeholder="E-mail"
                    aria-label="email"
                    aria-describedby="input-group-left"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: "Email is not valid",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
                <div className="input-group mb-2 mt-2">
                  <span
                    className="input-group-text"
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
                    className="form-control  bg-light"
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
                    className="input-group-text"
                    id="input-group-left-example"
                  >
                    <i
                      className="fa fa-key"
                      aria-hidden="true"
                      style={{ color: "#8391A1" }}
                    />
                  </span>
                  <input
                    type="password"
                    className="form-control  bg-light"
                    placeholder="New Password"
                    aria-label="password"
                    aria-describedby="input-group-left"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-danger ">
                    {errors.password.message}
                  </span>
                )}
                <div className="input-group mb-2 mt-2">
                  <span
                    className="input-group-text"
                    id="input-group-left-example"
                  >
                    <i
                      className="fa fa-key"
                      aria-hidden="true"
                      style={{ color: "#8391A1" }}
                    />
                  </span>
                  <input
                    type="password"
                    className="form-control  bg-light"
                    placeholder="Confirm New Password"
                    aria-label="confirm password"
                    aria-describedby="input-group-left"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-danger">
                    {errors.confirmPassword.message}
                  </span>
                )}

                <button className="btn btn-success w-100 my-3 fw-bold">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
