// import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/3.png";
import RecipesIcon from "../../../../assets/recipesIcon.png";
import { useState } from "react";
const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
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
            component={
              <NavLink end activeClassName={"active"} to="/dashboard" />
            }
          >
            Home
          </MenuItem>
          <MenuItem
            icon={
              <i
                className="fa fa-users"
                aria-hidden="true"
                aria-label="users"
              />
            }
            component={<NavLink activeClassName={"active"} to="users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<img src={RecipesIcon} alt="recipes" />}
            component={<NavLink activeClassName={"active"} to="recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={
              <i
                className="fa-regular fa-calendar"
                aria-hidden="true"
                aria-label="categories"
              />
            }
            component={<NavLink activeClassName={"active"} to="categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
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
            component={<NavLink activeClassName={"active"} to="/login" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
