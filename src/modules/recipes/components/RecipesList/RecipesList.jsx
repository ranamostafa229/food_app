import { toast } from "react-toastify";
import Header from "../../../shared/components/Header/Header";
import { useEffect, useState } from "react";
import {
  apiInstance,
  privateApiInstance,
} from "../../../../services/api/apiInstance";
import {
  IMAGE_URL,
  recipes_endpoints,
} from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import Heading from "../../../shared/components/Heading/Heading";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import NoDataImg from "../../../../assets/nodata.svg";

import { useNavigate } from "react-router-dom";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleShowEdit = (id) => {
    navigate(`/recipes/${id}`);
  };
  const getRecipes = async () => {
    setLoading(true);
    try {
      let responnse = await apiInstance.get(
        recipes_endpoints.GET_RECIPES(10, 1)
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
        recipes_endpoints.DELETE_RECIPE(selectedId)
      );
      if (response.status === 200) {
        toast.success("Recipe deleted successfully");
        setRecipes((prev) => prev.filter((item) => item.id !== selectedId));
        getRecipes();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    handleClose();
  };
  return (
    <>
      <Header
        title="Recipes List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <Heading title={"Recipes"} />
      {loading && recipes.length === 0 ? (
        <div
          className="spinner-border text-success d-block mx-auto mt-5"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="p-md-3  p-0  table-responsive ">
          <table className="table  table-striped  table-borderless ">
            <thead className={`table-header `}>
              <tr className="table-secondary  ">
                <th scope="col">Name</th>
                <th scope="col" className="table-header-img">
                  Image
                </th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">tag</th>
                <th scope="col">category</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {recipes.length > 0 ? (
                recipes?.map((recipe) => (
                  <tr key={recipe.id} className="px-3 align-middle">
                    <td>{recipe?.name}</td>
                    <td className="w-25 h-100 text-center ">
                      <img
                        src={
                          recipe?.imagePath
                            ? `${IMAGE_URL}/${recipe?.imagePath}`
                            : `${NoDataImg}`
                        }
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
                    <td className="text-center cursor-pointer">
                      <DropdownMenu
                        handleShowDelete={() => handleShowDelete(recipe.id)}
                        handleShowEdit={() => handleShowEdit(recipe.id)}
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
      <DeleteConfirmation
        deleteItem={"Recipe"}
        deleteFun={deleteRecipe}
        toggleShow={show}
        handleClose={handleClose}
      />
    </>
  );
};

export default RecipesList;
