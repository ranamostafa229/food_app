import { lazy, Suspense, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import Heading from "../../../shared/components/Heading/Heading";
import CategoryActionsModal from "../../../shared/components/CategoryActionsModal/CategoryActionsModal";

const ConfirmDeleteModal = lazy(() =>
  import("../../../shared/components/DeleteConfirmation/DeleteConfirmation")
);
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [action, setAction] = useState(null);

  const handleClose = () => setShow(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleShowEdit = (id, name) => {
    setSelectedId(id);
    setSelectedCategory(name);
    setShowEdit(true);
    setAction("Update");
  };
  const handleCloseActions = () => {
    setShowAdd(false);
    setShowEdit(false);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
    setAction("Add");
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      let response = await privateApiInstance.get(
        categories_endpoints.GET_CATEGORIES(10, 1)
      );
      setLoading(false);
      setCategories(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    try {
      let response = await privateApiInstance.delete(
        categories_endpoints.DELETE_CATEGORY(selectedId)
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        setCategories((prev) => prev.filter((item) => item.id !== selectedId));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    handleClose();
  };
  const addCategory = async (data) => {
    try {
      let response = await privateApiInstance.post(
        categories_endpoints.POST_CATEGORY,
        data
      );
      setCategories((prev) => [response?.data, ...prev]);
      handleCloseActions();
      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
      console.log(error);
    }
  };
  const editCategory = async (data) => {
    console.log(data);
    try {
      let response = await privateApiInstance.put(
        categories_endpoints.UPDATE_CATEGORY(selectedId),
        data
      );
      setCategories((prev) =>
        prev.map((item) => (item.id === selectedId ? response?.data : item))
      );
      handleCloseActions();
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
      console.log(error);
      handleCloseActions();
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    action === "Add" ? await addCategory(data) : editCategory(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (showEdit) setAction("Update");
  }, [showEdit]);
  console.log(selectedCategory);
  return (
    <div className=" mx-2">
      <Header
        title="Categories List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <Heading
        title={"Categories"}
        item={"Category"}
        handleShowAdd={handleShowAdd}
      />
      {loading ? (
        <div
          className="spinner-border text-success d-block mx-auto mt-5"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="p-md-3  p-0 table-responsive ">
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
              {categories?.length > 0 ? (
                categories?.map((category) => (
                  <tr key={category?.id}>
                    <td>{category?.name}</td>
                    <td>{category?.creationDate}</td>
                    <td className="text-center cursor-pointer">
                      <DropdownMenu
                        handleShowDelete={() => handleShowDelete(category?.id)}
                        handleShowEdit={() =>
                          handleShowEdit(category?.id, category?.name)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <NoData colspan={3} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Suspense fallback={null}>
        <ConfirmDeleteModal
          deleteItem={"Category"}
          deleteFun={deleteCategory}
          toggleShow={show}
          handleClose={handleClose}
        />
      </Suspense>
      <CategoryActionsModal
        show={action === "Add" ? showAdd : showEdit}
        handleCloseAdd={handleCloseActions}
        handleFunc={onSubmit}
        action={action}
        selectedCategory={action === "Update" ? selectedCategory : ""}
      />
    </div>
  );
};
{
  /* <Modal.Footer>
          <Button
            className="btn-success"
            variant="white"
          >
            save
          </Button>
        </Modal.Footer> */
}
export default CategoriesList;
