/* eslint-disable react/prop-types */
import { useState } from "react";
import useCategories from "../../../categories/components/hooks/useCategories";
import useTags from "../../../tags/components/hooks/useTags";
import { useLocation } from "react-router-dom";

const Filtration = ({ query, pageName }) => {
  const tagsQuery = useTags(pageName === "recipes");
  const categoriesQuery = useCategories(pageName === "recipes");
  const [nameValue, setNameValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [groupsValue, setGroupsValue] = useState([]);
  const { pathname } = useLocation();

  const getNameValue = (e) => {
    setNameValue(e.target.value);
    pageName === "recipes" &&
      query?.triggerRecipes(
        1,
        3,
        e.target.value.toLowerCase(),
        tagValue,
        categoryValue
      );
    pageName === "categories" && query?.triggerCategories(1, 3, e.target.value);
    pageName === "users" &&
      query?.triggerUsers(
        1,
        3,
        e.target.value,
        emailValue,
        countryValue,
        groupsValue
      );
  };
  const getTagValue = (e) => {
    setTagValue(e.target.value);
    query?.triggerRecipes(1, 3, nameValue, e.target.value, categoryValue);
  };
  const getCategoryValue = (e) => {
    setCategoryValue(e.target.value);
    query?.triggerRecipes(1, 3, nameValue, tagValue, e.target.value);
  };
  const getEmailValue = (e) => {
    setEmailValue(e.target.value);
    query?.triggerUsers(
      1,
      3,
      nameValue,
      e.target.value,
      countryValue,
      groupsValue
    );
  };
  const getCountryValue = (e) => {
    setCountryValue(e.target.value);
    query?.triggerUsers(
      1,
      3,
      nameValue,
      emailValue,
      e.target.value,
      groupsValue
    );
  };
  const getGroupsValue = (e) => {
    setGroupsValue(e.target.value);
    query?.triggerUsers(
      1,
      3,
      nameValue,
      emailValue,
      countryValue,
      e.target.value
    );
  };

  return (
    <div className="row mx-2 ">
      <div
        className={`col-md-6 input-group ${
          pathname === "/recipes" ? "w-50" : "w-25"
        } `}
      >
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
      {pageName === "users" && (
        <>
          <div className="col-md-3 input-group w-25">
            <span
              className="input-group-text border-end-0 bg-white"
              id="input-group-left-example"
            >
              <i className="fa fa-envelope " aria-hidden="true"></i>
            </span>
            <input
              type="text"
              placeholder="Email"
              className="form-control border-start-0"
              onChange={getEmailValue}
              value={emailValue}
            />
          </div>
          <div className="col-md-3 input-group w-25">
            <span
              className="input-group-text border-end-0 bg-white"
              id="input-group-left-example"
            >
              <i className="fa fa-globe " aria-hidden="true"></i>
            </span>
            <input
              type="text"
              placeholder="Country"
              className="form-control border-start-0"
              onChange={getCountryValue}
              value={countryValue}
            />
          </div>
          <div className="col-md-3 input-group w-25">
            <select className="form-control" onChange={getGroupsValue}>
              <option value="">User Type</option>
              <option value={1}>Admin user</option>
              <option value={2}>System user</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Filtration;
