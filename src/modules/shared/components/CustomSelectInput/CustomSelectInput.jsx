/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const CustomSelectInput = ({ categories, register }) => {
  const [selectedOption, setSelectedOption] = useState("Category");
  const handleSelect = (eventKey) => {
    const selectedCategory = categories.find(
      (category) => category.id === eventKey
    );
    setSelectedOption(selectedCategory ? selectedCategory.name : "Category");
  };
  return (
    <Dropdown className="" onSelect={handleSelect}>
      <Dropdown.Toggle className="w-100" id="dropdown-basic ">
        Category
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu">
        <Dropdown.Item className="custom-dropdown-item" href="#" eventKey={""}>
          {selectedOption}
        </Dropdown.Item>
        {categories.map(({ id, name }) => (
          <Dropdown.Item
            key={id}
            eventKey={id}
            className="custom-dropdown-item"
            href="#"
            {...register}
            // {...register("categoriesIds", getRequiredMessage("Category"))}
            value={id}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomSelectInput;
