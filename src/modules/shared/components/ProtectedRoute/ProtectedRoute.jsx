/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loginData, children }) => {
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
