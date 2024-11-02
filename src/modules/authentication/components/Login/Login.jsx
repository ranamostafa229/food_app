import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="d-flex flex-column">
      login
      <Link to="register">Register Now</Link>
      <Link to="forget-password">Fotgot Password</Link>
    </div>
  );
};

export default Login;
