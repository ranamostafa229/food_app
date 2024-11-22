import { toast } from "react-toastify";
import Header from "../../../shared/components/Header/Header";
import { useState } from "react";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import {
  favourites_endpoints,
  IMAGE_URL,
  recipes_endpoints,
} from "../../../../services/api/apiConfig";
import NoData from "../../../shared/components/NoData/NoData";
import Heading from "../../../shared/components/Heading/Heading";
import DropdownMenu from "../../../shared/components/DropdownMenu/DropdownMenu";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import NoDataImg from "../../../../assets/nodata.svg";

import { useNavigate } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";
import PaginationSection from "../../../shared/components/PaginationSection/PaginationSection";
import Filtration from "../../../shared/components/Filtration/Filtration";
import Loading from "../../../shared/components/Loading/Loading";
import RecipeDetailsModal from "../RecipeDetailsModal/RecipeDetailsModal";
import useFavorites from "../../../favorites/components/hooks/useFavorites";

const RecipesList = () => {
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const recipesQuery = useRecipes();
  const favoritesQuery = useFavorites();

  const handleClose = () => setShow(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleCloseDetails = () => setView(false);

  const handleShowEdit = (id) => {
    localStorage.removeItem("recipeData");
    navigate(`/recipes/${id}`);
  };
  const handleView = (id, description, img) => {
    console.log(id);
    setSelectedId(id);
    setSelectedRecipe({ description, img, isFavorite });
    setView(true);
  };

  const deleteRecipe = async () => {
    try {
      let response = await privateApiInstance.delete(
        recipes_endpoints.DELETE_RECIPE(selectedId)
      );
      if (response.status === 200) {
        toast.success("Recipe deleted successfully");
        recipesQuery?.triggerRecipes();
      }
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
      console.log(error);
    }
    handleClose();
  };
  const addToFavorite = async () => {
    try {
      const payload = { recipeId: selectedId };
      const response = await privateApiInstance.post(
        favourites_endpoints.POST_FAVOURITES,
        payload
      );
      if (response.status === 201) {
        toast.success("Recipe added to favorites successfully");
        setIsFavorite(true);
        favoritesQuery?.triggerFavorites();
        handleCloseDetails();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Recipes List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <Heading title={"Recipes"} />
      <Filtration query={recipesQuery} pageName={"recipes"} />
      {recipesQuery?.recipesIsLoading && recipesQuery?.fetchCount === 0 ? (
        <Loading />
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
              {recipesQuery?.recipes?.data.length > 0 ? (
                recipesQuery?.recipes?.data.map((recipe) => (
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
                        handleView={() =>
                          handleView(
                            recipe.id,
                            recipe?.description,
                            recipe?.imagePath
                          )
                        }
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
          <PaginationSection
            arrayOfPages={recipesQuery?.arrayOfPages}
            query={recipesQuery}
            page="recipes"
          />
        </div>
      )}
      <DeleteConfirmation
        deleteItem={"Recipe"}
        deleteFun={deleteRecipe}
        toggleShow={show}
        handleClose={handleClose}
      />
      <RecipeDetailsModal
        toggleShow={view}
        handleCloseDetails={handleCloseDetails}
        addToFavorite={addToFavorite}
        recipe={selectedRecipe}
      />
    </>
  );
};

export default RecipesList;
