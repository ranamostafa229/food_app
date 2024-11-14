/* eslint-disable react/prop-types */
import { Dropdown } from "react-bootstrap";

const DropdownMenu = ({ handleShow }) => {
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
          <Dropdown.Item href="#/action-1">
            <i className="fa-solid fa-pen-to-square mx-2 text-success " />
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShow}>
            <i
              className="fa fa-trash mx-2 text-success "
              aria-hidden="true"
              aria-label="delete"
            />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
