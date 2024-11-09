import { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import apiInstance from "../../../../api/apiInstance";
import { endpoints } from "../../../../api/apiConfig";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";

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
      let responnse = await apiInstance.get(endpoints.categories, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
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
      let response = await apiInstance.delete(
        endpoints.deleteCategory(selectedId),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
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
      <div className="d-flex justify-content-between p-3 ">
        <div className="d-flex flex-column  ">
          <h4 className="fw-bold m-0 ">Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success d-flex align-items-center gap-1 btn-md h-100 ">
          <span className="d-lg-inline d-none d-sm-inline"> Add New </span>
          <span className="d-sm-none d-xs-inline ">
            <i className="fa fa-plus-circle"></i>
          </span>
          Category
        </button>
      </div>
      {loading ? (
        <div
          className="spinner-border text-success d-block mx-auto mt-5"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="p-md-3  p-0 ">
          <table className="table  table-striped  table-borderless table-responsive">
            <thead className="table-header ">
              <tr className="table-secondary  ">
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {categories?.map((category) => (
                <tr key={category.id} className="px-3">
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-trash text-danger mx-2 "
                      aria-hidden="true"
                      aria-label="delete"
                      onClick={() => handleShow(category.id)}
                    />
                    <i
                      className="fa fa-edit text-warning  "
                      aria-hidden="true"
                      aria-label="edit"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteConfirmation
        deleteItem={"Category"}
        deleteFun={deleteCategory}
        toggleShow={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default CategoriesList;
