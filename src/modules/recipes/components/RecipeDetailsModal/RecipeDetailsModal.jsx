/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import noImg from "../../../../assets/nodata.svg";
import { IMAGE_URL } from "../../../../services/api/apiConfig";

const RecipeDetailsModal = ({
  toggleShow,
  handleCloseDetails,
  addToFavorite,
  recipe,
}) => {
  return (
    <Modal
      show={toggleShow}
      onHide={handleCloseDetails}
      centered
      className="px-3 "
    >
      <Modal.Header
        closeButton
        className="border-0 fw-bold d-flex justify-content-between m-3"
      >
        <h5 className=" fw-bold">Recipe Details</h5>
        <i
          className="fa-regular fa-circle-xmark text-danger fs-4 cursor-pointer "
          onClick={handleCloseDetails}
        />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3 ">
        {recipe?.img !== "" ? (
          <img
            src={IMAGE_URL + recipe?.img}
            alt="recipe image"
            className="w-50 rounded mx-auto"
          />
        ) : (
          <img
            src={noImg}
            alt="no image"
            className="w-50 rounded text-center mx-auto"
          />
        )}
        <span className="mx-3">{recipe?.description}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-outline-dark fw-bold"
          variant="white"
          onClick={addToFavorite}
          disabled={recipe?.isFavorite}
        >
          {recipe?.isFavorite ? "Added to favorite" : "Favorite"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeDetailsModal;
