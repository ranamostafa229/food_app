import { toast } from "react-toastify";
import Header from "../../../shared/components/Header/Header";
import { lazy, Suspense, useEffect, useState } from "react";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import styles from "./RecipesList.module.css";
import NoData from "../../../shared/components/NoData/NoData";

const ConfirmDeleteModal = lazy(() =>
  import("../../../shared/components/DeleteConfirmation/DeleteConfirmation")
);
const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getRecipes = async () => {
    setLoading(true);
    try {
      let responnse = await privateApiInstance.get(
        recipes_endpoints.recipes(10, 1)
      );
      setLoading(false);
      setRecipes(responnse.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  const deleteRecipe = async () => {
    try {
      let response = await privateApiInstance.delete(
        recipes_endpoints.deleteRecipe(selectedId)
      );
      if (response.status === 200) {
        toast.success("Recipe deleted successfully");
        setRecipes((prev) => prev.filter((item) => item.id !== selectedId));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    handleClose();
  };
  return (
    <div>
      <Header
        title="Recipes List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="d-flex justify-content-between p-3 ">
        <div className="d-flex flex-column  ">
          <h4 className="fw-bold m-0 ">Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success d-flex align-items-center gap-1 btn-md h-100 ">
          <span className="d-lg-inline d-none d-sm-inline"> Add New </span>
          <span className="d-sm-none d-xs-inline ">
            <i className="fa fa-plus-circle"></i>
          </span>
          Recipe
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
        <div className="p-md-3  p-0  table-responsive">
          <table className="table  table-striped  table-borderless ">
            <thead className={styles.tableHeader}>
              <tr className="table-secondary  ">
                <th scope="col">Name</th>
                <th scope="col  ">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">tag</th>
                <th scope="col">category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {recipes.length > 0 ? (
                recipes?.map((recipe) => (
                  <tr key={recipe.id} className="px-3 align-middle">
                    <td>{recipe?.name}</td>
                    <td className="w-25 h-100 text-center ">
                      <img
                        src={`https://upskilling-egypt.com:3006/${recipe?.imagePath}`}
                        alt={`${recipe?.name}`}
                        className="rounded-2"
                        style={{
                          width: "60px",
                        }}
                      />
                    </td>
                    <td>{recipe?.price}</td>
                    <td>{recipe?.description}</td>
                    <td>{recipe?.tag.name}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>
                      <i
                        className="fa fa-trash text-danger mx-2 "
                        aria-hidden="true"
                        aria-label="delete"
                        onClick={() => handleShow(recipe.id)}
                      />
                      <i
                        className="fa fa-edit text-warning  "
                        aria-hidden="true"
                        aria-label="edit"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <NoData colspan={7} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Suspense fallback={null}>
        <ConfirmDeleteModal
          deleteItem={"Recipe"}
          deleteFun={deleteRecipe}
          toggleShow={show}
          handleClose={handleClose}
        />
      </Suspense>
    </div>
  );
};

export default RecipesList;
