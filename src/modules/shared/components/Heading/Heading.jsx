import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

/* eslint-disable react/prop-types */
const Heading = ({ title, handleShowAdd }) => {
  const { pathname, search } = useLocation();
  const { loginData } = useContext(AuthContext);
  const params = new URLSearchParams(search);
  return (
    <div className="d-flex justify-content-between  p-3   ">
      <div className="d-flex flex-column   ">
        <h3 className="fw-bold m-0 ">{title} Table Details</h3>
        <span>You can check all details</span>
      </div>
      {pathname !== "/users" && loginData?.userGroup !== "SystemUser" && (
        <Link
          to={{
            pathname: title === "Recipes" ? `new-recipe` : "",
            state: { pageNo: params.get("page") || 1 },
          }}
          className="btn  btn-success d-flex align-items-center 
        gap-1  fs-6 fw-bold px-lg-5  rounded heading-add-btn"
          onClick={handleShowAdd}
        >
          <span className="d-lg-inline d-none d-sm-inline"> Add New </span>
          <span className="d-sm-none d-xs-inline ">
            <i className="fa fa-plus-circle"></i>
          </span>
          Item
        </Link>
      )}
    </div>
  );
};

export default Heading;
