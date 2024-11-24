/* eslint-disable react/prop-types */
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/3.png";
import RecipesIcon from "../../../../assets/recipesIcon.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import ChangePass from "../../../authentication/components/ChangePass/ChangePass";

const saveSideBarState = (state) => {
  localStorage.setItem("sideBarState", JSON.stringify(state));
};
const getSideBarState = () => {
  const state = localStorage.getItem("sideBarState");
  return state ? JSON.parse(state) : { collapsed: true };
};

const SideBarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(getSideBarState().collapsed);
  const [show, setShow] = useState(false);
  const { loginData, removeLoginData } = useContext(AuthContext);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    saveSideBarState({ collapsed: isCollapsed });
  }, [isCollapsed]);
  const handleClose = () => setShow(false);

  return (
    <div
      className={`sidebar-container position-fixed   ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <Sidebar collapsed={isCollapsed} className=" ">
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            icon={<img src={logo} alt="logo" />}
            className={` logo-menu-item my-5   ${
              isCollapsed ? "ms-1 small-logo" : "ms-5 "
            } transation-all duration-300 ease-in-out`}
          ></MenuItem>
          <MenuItem
            icon={
              <i className="fa fa-home " aria-hidden="true" aria-label="home" />
            }
            component={<NavLink end to="/dashboard" />}
          >
            Home
          </MenuItem>
          {loginData?.userGroup !== "SystemUser" && (
            <MenuItem
              icon={
                <i
                  className="fa fa-users"
                  aria-hidden="true"
                  aria-label="users"
                />
              }
              component={<NavLink to="users?page=1" />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<img src={RecipesIcon} alt="recipes" />}
            component={<NavLink to="recipes?page=1" />}
          >
            Recipes
          </MenuItem>
          {loginData?.userGroup !== "SystemUser" && (
            <MenuItem
              icon={
                <i
                  className="fa-regular fa-calendar"
                  aria-hidden="true"
                  aria-label="categories"
                />
              }
              component={<NavLink to="categories?page=1" />}
            >
              Categories
            </MenuItem>
          )}
          {loginData?.userGroup === "SystemUser" && (
            <MenuItem
              icon={
                <i
                  className="fa-regular fa-heart  "
                  aria-hidden="true"
                  aria-label="categories"
                />
              }
              component={<NavLink to="favorites" />}
            >
              Favourites
            </MenuItem>
          )}
          <MenuItem
            onClick={() => setShow(true)}
            icon={
              <i
                className="fa fa-lock"
                aria-hidden="true"
                aria-label="change password"
              />
            }
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={
              <i
                className="fa fa-sign-out"
                aria-hidden="true"
                aria-label="logout"
              />
            }
            component={
              <NavLink
                to="/login"
                onClick={() => {
                  localStorage.clear();
                  removeLoginData();
                }}
              />
            }
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <ChangePass toggleShow={show} handleClose={handleClose} />
    </div>
  );
};

export default SideBarMenu;
