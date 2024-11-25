/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useCategories from "../../../categories/components/hooks/useCategories";
import useTags from "../../../tags/components/hooks/useTags";
import { useLocation, useSearchParams } from "react-router-dom";

const Filtration = ({ query, pageName }) => {
  const tagsQuery = useTags(pageName === "recipes");
  const categoriesQuery = useCategories(pageName === "recipes");
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const getAllCategories = async () => {
      await categoriesQuery?.getAllCategories();
    };
    getAllCategories();
  }, []);
  const getNameValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name: value });
    pageName === "recipes" &&
      query?.triggerRecipes(
        1,
        3,
        value,
        searchParams.get("tag"),
        searchParams.get("category")
      );
    pageName === "categories" && query?.triggerCategories(1, 3, value);
    pageName === "users" &&
      query?.triggerUsers(
        1,
        3,
        value,
        searchParams.get("email"),
        searchParams.get("country"),
        searchParams.get("groups")
      );
  };
  const getTagValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), tag: value });
    query?.triggerRecipes(
      1,
      3,
      searchParams.get("name"),
      value,
      searchParams.get("category")
    );
  };
  const getCategoryValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), category: value });
    query?.triggerRecipes(
      1,
      3,
      searchParams.get("name"),
      searchParams.get("tag"),
      value
    );
  };
  const getEmailValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), email: value });
    query?.triggerUsers(
      1,
      3,
      searchParams.get("name"),
      value,
      searchParams.get("country"),
      searchParams.get("groups")
    );
  };
  const getCountryValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), country: value });
    query?.triggerUsers(
      1,
      3,
      searchParams.get("name"),
      searchParams.get("email"),
      value,
      searchParams.get("groups")
    );
  };
  const getGroupsValue = (e) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), groups: value });
    query?.triggerUsers(
      1,
      3,
      searchParams.get("name"),
      searchParams.get("email"),
      searchParams.get("country"),
      e.target.value
    );
  };

  return (
    <div className="row mx-2 gap-lg-0 gap-3 pb-3 ">
      <div
        className={`col  input-group ${
          pathname === "/recipes"
            ? " w-50 w-sm-auto col-md-6  "
            : pathname === "/categories"
            ? "w-75"
            : " col-md-3 w-auto pb-2" //w-25
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
          value={searchParams.get("name") || ""}
        />
      </div>
      {pageName === "recipes" && (
        <>
          <div className="col-md-3">
            <select
              className="form-control"
              onChange={getTagValue}
              value={searchParams.get("tag") || ""}
            >
              <option value="">Tag</option>
              {tagsQuery?.tags?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 ">
            <select
              className="form-control"
              onChange={getCategoryValue}
              value={searchParams.get("category") || ""}
            >
              <option value="">Category</option>
              {categoriesQuery?.allCategories?.map(({ id, name }) => (
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
          <div className=" col-md-3 input-group w-auto pb-2">
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
              value={searchParams.get("email") || ""}
            />
          </div>
          <div className="col-md-3 input-group w-auto">
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
              value={searchParams.get("country") || ""}
            />
          </div>
          <div className="col col-md-3 col-sm-12 input-group  w-25">
            <select
              className="form-control"
              onChange={getGroupsValue}
              value={searchParams.get("groups") || ""}
            >
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
