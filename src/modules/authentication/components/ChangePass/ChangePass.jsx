/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import logo from "../../../../assets/logo.png";
import { useForm } from "react-hook-form";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { users_endpoints } from "../../../../services/api/apiConfig";
import { toast } from "react-toastify";
import { getValidationRules } from "../../../../services/validation/validationRules";
import useToggle from "../../../../hooks/useToggle";

const ChangePass = ({ toggleShow, handleClose }) => {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();
  const validationRules = getValidationRules(watch);

  const { visible: passwordVisibility, toggle: toggle1 } = useToggle(false);
  const { visible: newPasswordVisibility, toggle: toggle2 } = useToggle(false);
  const { visible: confirmPasswordVisibility, toggle: toggle3 } =
    useToggle(false);
  const onSubmit = async (data) => {
    try {
      const response = await privateApiInstance.put(
        users_endpoints.CHANGE_PASSWORD,
        data
      );
      toast.success(response?.data.message || "Password changed successfully");
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <Modal show={toggleShow} onHide={handleClose} centered className="px-3 ">
      <div className="row justify-content-center align-items-center mx-1   ">
        <div
          className={`col-md-12  bg-white rounded rounded-2 px-5 py-3  justify-content-center align-items-center `}
        >
          <div className="logo-container text-center">
            <img src={logo} alt="logo" className={"w-75"} />
          </div>
          <div>
            <div className="title my-3">
              <h1 className="h5 fw-bold">Change Your Password</h1>
              <span className="text-muted">Enter your details below</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2 mt-1">
                <span
                  className="input-group-text border-0"
                  id="input-group-left-example-1"
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
                  placeholder="Old Password"
                  aria-label="old password"
                  aria-describedby="input-group-left"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
                <button
                  type="button"
                  className="btn btn-light border-0"
                  id="input-group-button-right-1"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  onClick={toggle1}
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
              <div className="input-group mb-2 mt-1">
                <span
                  className="input-group-text border-0"
                  id="input-group-left-example-2"
                >
                  <i
                    className="fa fa-key"
                    aria-hidden="true"
                    style={{ color: "#8391A1" }}
                  />
                </span>
                <input
                  type={newPasswordVisibility ? "text" : "password"}
                  className="form-control bg-light border-top-0 border-end-0 border-bottom-0 "
                  placeholder="New Password"
                  aria-label="new Password"
                  aria-describedby="input-group-left"
                  {...register("newPassword", validationRules.password)}
                />
                <button
                  type="button"
                  className="btn btn-light border-0"
                  id="input-group-button-right-3"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  onClick={toggle2}
                  aria-label="toggle password visibility"
                >
                  <i
                    className={`fa-regular ${
                      newPasswordVisibility ? "fa-eye-slash" : "fa-eye"
                    }  cursor-pointer text-muted `}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-danger">
                  {errors.newPassword.message}
                </span>
              )}
              <div className="input-group mb-2 mt-1">
                <span
                  className="input-group-text border-0"
                  id="input-group-left-example-3"
                >
                  <i
                    className="fa fa-key"
                    aria-hidden="true"
                    style={{ color: "#8391A1" }}
                  />
                </span>
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  className="form-control bg-light border-top-0 border-end-0 border-bottom-0 "
                  placeholder="Confirm New Password"
                  aria-label="confirm new Password"
                  aria-describedby="input-group-left"
                  {...register(
                    "confirmNewPassword",
                    validationRules.confirmNewPassword
                  )}
                />
                <button
                  type="button"
                  className="btn btn-light border-0"
                  id="input-group-button-right-2"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  onClick={toggle3}
                  aria-label="toggle password visibility"
                >
                  <i
                    className={`fa-regular ${
                      confirmPasswordVisibility ? "fa-eye-slash" : "fa-eye"
                    }  cursor-pointer text-muted `}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger">
                  {errors.confirmNewPassword.message}
                </span>
              )}

              <button
                disabled={isSubmitting}
                className="btn btn-success w-100 my-3 fw-bold"
              >
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePass;
