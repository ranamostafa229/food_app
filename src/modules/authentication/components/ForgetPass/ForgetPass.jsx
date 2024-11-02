import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column">
      ForgetPass
      <button onClick={() => navigate("/reset-password")}>
        Go to Reset Password
      </button>
    </div>
  );
};

export default ForgetPass;
