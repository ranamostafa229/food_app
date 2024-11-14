/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getRequiredMessage } from "../../../../services/validation/validationRules";
// defaultValues: { name: action === "Update" ? selectedCategory : "" },

const CategoryActionsModal = ({
  show,
  handleCloseAdd,
  handleFunc,
  action,
  selectedCategory,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: { name: selectedCategory },
  });
  return (
    <Modal show={show} onHide={handleCloseAdd}>
      <Modal.Header closeButton className="border-0 fw-bold ">
        <span className="p-3">{action} Category</span>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column w-100 p-3  ">
          <form onSubmit={handleSubmit(handleFunc)}>
            <input
              type="text"
              className="form-control bg-light border-top-0 border-end-0 border-bottom-0 "
              placeholder="Category Name"
              aria-label="name"
              aria-describedby="input-group-left"
              {...register("name", {
                required: getRequiredMessage("Name"),
              })}
              //   value={selectedCategory}
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
    </Modal>
  );
};

export default CategoryActionsModal;
