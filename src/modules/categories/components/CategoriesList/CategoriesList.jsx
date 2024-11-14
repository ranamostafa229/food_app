import { lazy, Suspense, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import Heading from "../../../shared/components/Heading/Heading";

const ConfirmDeleteModal = lazy(() =>
  import("../../../shared/components/DeleteConfirmation/DeleteConfirmation")
);
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      let responnse = await privateApiInstance.get(
        categories_endpoints.categories(10, 1)
      );
      setLoading(false);
      setCategories(responnse.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const deleteCategory = async () => {
    try {
      let response = await privateApiInstance.delete(
        categories_endpoints.deleteCategory(selectedId)
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
  return (
    <div className=" mx-2">
      <Header
        title="Categories List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <Heading title={"Categories"} item={"Category"} />
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
              {categories.length > 0 ? (
                categories?.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td className="text-center cursor-pointer">
                      <DropdownMenu
                        handleShow={() => handleShow(category.id)}
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
    </div>
  );
};

export default CategoriesList;
