/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const DropdownMenu = ({ handleShowDelete, handleShowEdit, handleView }) => {
  const { pathname } = useLocation();
  const { loginData } = useContext(AuthContext);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="outlined" id="dropdown-basic">
          <span className="sr-only">Click to see actions</span>
          <i
            className="fa-solid fa-ellipsis "
            aria-hidden="true"
            aria-label="actions"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pathname !== "/users" && loginData?.userGroup !== "SystemUser" && (
            <Dropdown.Item onClick={handleShowEdit}>
              <i className="fa-solid fa-pen-to-square mx-2 text-success " />
              Edit
            </Dropdown.Item>
          )}
          {loginData?.userGroup !== "SystemUser" && (
            <Dropdown.Item onClick={handleShowDelete}>
              <i
                className="fa fa-trash mx-2 text-success "
                aria-hidden="true"
                aria-label="delete"
              />
              Delete
            </Dropdown.Item>
          )}
          {loginData?.userGroup === "SystemUser" && (
            <Dropdown.Item onClick={handleView}>
              <i
                className="fa-regular fa-eye mx-2 text-success "
                aria-hidden="true"
                aria-label="delete"
              />
              View
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
