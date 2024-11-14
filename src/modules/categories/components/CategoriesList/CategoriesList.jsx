import { lazy, Suspense, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import Heading from "../../../shared/components/Heading/Heading";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getRequiredMessage } from "../../../../services/validation/validationRules";

const ConfirmDeleteModal = lazy(() =>
  import("../../../shared/components/DeleteConfirmation/DeleteConfirmation")
);
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
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

  useEffect(() => {
    getCategories();
  }, []);
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
  const onSubmit = async (data) => {
    try {
      let response = await privateApiInstance.post(
        categories_endpoints.POST_CATEGORY,
        data
      );
      console.log(response.data);
      setCategories(response.data.data);
      handleCloseAdd();
      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
      console.log(error);
    }
  };

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
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton className="border-0 fw-bold ">
          <span className="p-3">Add Category</span>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column w-100 p-3  ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control bg-light border-top-0 border-end-0 border-bottom-0 "
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="input-group-left"
                {...register("name", {
                  required: getRequiredMessage("Name"),
                })}
              />
              {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )}
              <hr className="text-muted " />
              <div className="d-flex justify-content-end">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-success fw-bold"
                >
                  save
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            className="btn-success"
            variant="white"
          >
            save
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default CategoriesList;
