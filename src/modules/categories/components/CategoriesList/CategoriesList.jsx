import { lazy, Suspense, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import Heading from "../../../shared/components/Heading/Heading";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import useCategories from "../hooks/useCategories";
import PaginationSection from "../../../shared/components/PaginationSection/PaginationSection";
import Filtration from "../../../shared/components/Filtration/Filtration";
import { useLocation } from "react-router-dom";
import Loading from "../../../shared/components/Loading/Loading";
const CategoryActionsModal = lazy(() =>
  import("../../../shared/components/CategoryActionsModal/CategoryActionsModal")
);
const CategoriesList = () => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [action, setAction] = useState(null);
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const categoriesQuery = useCategories(pathname.includes("/categories"));
  const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    if (categoriesQuery?.categories?.data) {
      setNewCategories(categoriesQuery?.categories?.data);
    }
  }, [categoriesQuery?.categories?.data]);
  const handleClose = () => setShow(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleShowEdit = (id, name) => {
    setSelectedCategory(name);
    setShowEdit(true);
    setSelectedId(id);
    setAction("Update");
  };
  const handleCloseActions = () => {
    setShowAdd(false);
    setShowEdit(false);
  };
  const handleShowAdd = () => {
    setAction("Add");
    setSelectedCategory("");
    setShowAdd(true);
  };

  const deleteCategory = async () => {
    if (show) {
      setNewCategories(newCategories.filter((item) => item.id !== selectedId));
      handleClose();
    }
    try {
      let response = await privateApiInstance.delete(
        categories_endpoints.DELETE_CATEGORY(selectedId)
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        categoriesQuery?.triggerCategories(params.get("page") || 1);
      }
    } catch (error) {
      toast.error(error?.response?.data.message || "something went wrong");
      console.log(error);
    }
    handleClose();
  };

  const handleCategory = async (data) => {
    if (action === "Add") {
      setNewCategories((prev) => [data, ...prev]);
      handleCloseActions();
    } else {
      setNewCategories(
        newCategories.map((item) =>
          item.id === selectedId ? { ...item, ...data } : item
        )
      );
      handleCloseActions();
    }
    try {
      let response = await privateApiInstance[
        action === "Add" ? "post" : "put"
      ](
        action === "Add"
          ? categories_endpoints.POST_CATEGORY
          : categories_endpoints.UPDATE_CATEGORY(selectedId),
        data
      );
      handleCloseActions();
      if (response.status === 201) {
        toast.success("Category added successfully");
        categoriesQuery?.triggerCategories(params.get("page") || 1);
      } else if (response.status === 200) {
        toast.success("Category updated successfully");
        categoriesQuery?.triggerCategories(params.get("page") || 1);
      }
    } catch (error) {
      toast.error(error?.response?.data.message || "something went wrong");
      console.log(error);
    }
  };

  return (
    <div className=" mx-2">
      <Header
        title="Categories List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <Heading title={"Categories"} handleShowAdd={handleShowAdd} />
      <Filtration query={categoriesQuery} pageName={"categories"} />
      {categoriesQuery?.categoriesIsFetching &&
      categoriesQuery?.fetchCount === 0 ? (
        <Loading />
      ) : (
        <div className="p-md-3 px-3  p-0 table-responsive ">
          <table className="table  table-striped  table-borderless ">
            <thead className="table-header ">
              <tr className="table-secondary  ">
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {newCategories?.length > 0 &&
                newCategories?.map((category) => (
                  <tr key={category?.id + category?.name}>
                    <td>{category?.name}</td>
                    <td>
                      {category?.creationDate
                        ? new Date(category?.creationDate).toLocaleDateString()
                        : ".."}
                    </td>
                    <td
                      className="text-center cursor-pointer"
                      onClick={() => setSelectedCategory(category?.name)}
                    >
                      <DropdownMenu
                        handleShowDelete={() => handleShowDelete(category?.id)}
                        handleShowEdit={() =>
                          handleShowEdit(category?.id, category?.name)
                        }
                      />
                    </td>
                  </tr>
                ))}
              {!categoriesQuery?.categoriesIsLoading &&
                !newCategories?.length === 0 && (
                  <tr>
                    <NoData colspan={3} />
                  </tr>
                )}
            </tbody>
          </table>
          <PaginationSection
            arrayOfPages={categoriesQuery?.arrayOfPages}
            query={categoriesQuery}
            page={"categories"}
          />
        </div>
      )}

      <DeleteConfirmation
        deleteItem={"Category"}
        deleteFun={deleteCategory}
        toggleShow={show}
        handleClose={handleClose}
      />
      <Suspense fallback={null}>
        <CategoryActionsModal
          show={action === "Add" ? showAdd : showEdit}
          handleCloseAdd={handleCloseActions}
          handleFunc={handleCategory}
          action={action}
          selectedCategory={selectedCategory}
        />
      </Suspense>
    </div>
  );
};

export default CategoriesList;
