import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPass = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success(response.data.message);
      navigate("/reset-password");
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
              <div className="auth-title my-3">
                <h1 className="h5 fw-bold">Forgot Your Password?</h1>
                <span className="text-muted ">
                  No worries! Please enter your email and we will send a
                  password reset link
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-5 mb-2">
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
                    placeholder="Enter your E-mail"
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
                  <span className="text-danger ">{errors.email.message}</span>
                )}
                <button className="btn btn-success w-100 my-3 fw-bold  mt-5 ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
