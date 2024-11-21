/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loginData } = useContext(AuthContext);
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
