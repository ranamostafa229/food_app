import useFetch from "../../../../hooks/useFetch";
import { favourites_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useFavorites = () => {
  const getFavorites = async () => {
    let response = await privateApiInstance.get(
      favourites_endpoints.GET_FAVOURITES
    );

    return response;
  };
  const { data, isLoading, isError, error, trigger, fetchCount, setData } =
    useFetch(getFavorites);

  return {
    favorites: data?.data,
    favoritesError: error,
    favoritesIsError: isError,
    favoritesIsLoading: isLoading,
    triggerFavorites: trigger,
    setFavorites: setData,
    fetchCount,
  };
};

export default useFavorites;
