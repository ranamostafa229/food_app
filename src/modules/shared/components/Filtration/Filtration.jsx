/* eslint-disable react/prop-types */
import { useState } from "react";
import useCategories from "../../../categories/components/hooks/useCategories";
import useTags from "../../../tags/components/hooks/useTags";

const Filtration = ({ query, pageName }) => {
  const tagsQuery = useTags();
  const categoriesQuery = useCategories();
  const [nameValue, setNameValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const getNameValue = (e) => {
    setNameValue(e.target.value);
    pageName === "recipes"
      ? query?.triggerRecipes(
          1,
          3,
          e.target.value.toLowerCase(),
          tagValue,
          categoryValue
        )
      : query?.triggerCategories(1, 3, e.target.value);
  };
  const getTagValue = (e) => {
    setTagValue(e.target.value);
    query?.triggerRecipes(1, 3, nameValue, e.target.value, categoryValue);
  };
  const getCategoryValue = (e) => {
    setCategoryValue(e.target.value);
    query?.triggerRecipes(1, 3, nameValue, tagValue, e.target.value);
  };

  return (
    <div className="row mx-2 ">
      <div className="col-md-6 input-group w-50">
        <span
          className="input-group-text border-end-0 bg-white"
          id="input-group-left-example"
        >
          <i className="fa fa-search " aria-hidden="true"></i>
        </span>
        <input
          type="text"
          placeholder="Search here"
          className="form-control border-start-0"
          onChange={getNameValue}
          value={nameValue}
        />
      </div>
      {pageName === "recipes" && (
        <>
          <div className="col-md-3">
            <select className="form-control" onChange={getTagValue}>
              <option value="">Tag</option>
              {tagsQuery?.tags?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getCategoryValue}>
              <option value="">Category</option>
              {categoriesQuery?.categories?.data.map(({ id, name }) => (
                <option key={id} value={id} className="custom-dropdown-item">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Filtration;
