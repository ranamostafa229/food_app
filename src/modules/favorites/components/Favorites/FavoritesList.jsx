import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header/Header";
import useFavorites from "../hooks/useFavorites";
import FavoritesCard from "./FavoritesCard";
import Loading from "../../../shared/components/Loading/Loading";
import NoData from "../../../shared/components/NoData/NoData";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { favourites_endpoints } from "../../../../services/api/apiConfig";
import { toast } from "react-toastify";

const FavoritesList = () => {
  const { loginData } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const favoritesQuery = useFavorites(pathname === "/favorites");

  useEffect(() => {
    if (loginData?.userGroup === "AdminUser") {
      navigate("/not-found");
    }
  }, [loginData?.userGroup, navigate]);
  useEffect(() => {
    if (loginData?.token) {
      favoritesQuery?.triggerFavorites();
    }
  }, [loginData?.token, favoritesQuery]);
  const removeFromFavorite = async (selectedId) => {
    try {
      const response = await privateApiInstance.delete(
        favourites_endpoints.DELETE_FAVOURITES(selectedId)
      );
      if (response.status === 200) {
        toast.success("Recipe removed from favorites successfully");
        favoritesQuery?.triggerFavorites();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };
  return (
    <div>
      <Header
        title="Favorite List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      {favoritesQuery?.favoritesIsFetching &&
      favoritesQuery?.fetchCount === 0 ? (
        <Loading />
      ) : (
        <>
          {favoritesQuery?.favorites?.data?.length > 0 ? (
            <div className="d-flex flex-wrap w-100 justify-content-center gap-3 mx-2 w-25 pt-5 pb-5">
              {favoritesQuery?.favorites?.data.map((recipeItem) => {
                return (
                  <FavoritesCard
                    recipeItem={recipeItem}
                    key={recipeItem.id}
                    removeFromFavorite={() => removeFromFavorite(recipeItem.id)}
                  />
                );
              })}
            </div>
          ) : (
            <table className="d-flex justify-content-center ">
              <tbody>
                <tr>
                  <NoData colspan={7} />
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesList;
