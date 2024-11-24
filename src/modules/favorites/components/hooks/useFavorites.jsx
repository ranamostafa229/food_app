import { useCallback } from "react";
import useFetch from "../../../../hooks/useFetch";
import { favourites_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useFavorites = (shouldFetch) => {
  const getFavorites = useCallback(async () => {
    let response = await privateApiInstance.get(
      favourites_endpoints.GET_FAVOURITES
    );
    return response;
  }, []);
  const { data, isFetching, isError, error, trigger, fetchCount, setData } =
    useFetch(getFavorites, shouldFetch);

  return {
    favorites: data?.data,
    favoritesError: error,
    favoritesIsError: isError,
    favoritesIsFetching: isFetching,
    triggerFavorites: trigger,
    setFavorites: setData,
    fetchCount,
  };
};

export default useFavorites;
