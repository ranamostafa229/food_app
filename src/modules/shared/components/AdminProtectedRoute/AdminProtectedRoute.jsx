/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { loginData } = useContext(AuthContext);
  if (loginData?.userGroup === "SystemUser") {
    return <Navigate to="/not-found" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
