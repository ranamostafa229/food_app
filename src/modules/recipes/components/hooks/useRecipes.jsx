import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import { apiInstance } from "../../../../services/api/apiInstance";

const useRecipes = () => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const getRecipes = async (pageNo = 1) => {
    let response = await apiInstance.get(recipes_endpoints.GET_RECIPES, {
      params: {
        pageSize: 3,
        pageNumber: pageNo,
      },
    });
    setArrayOfPages(
      Array(response?.data?.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );
    return response;
  };
  const { data, isLoading, isError, error, trigger, fetchCount } = useFetch(
    () => getRecipes(pageNo)
  );
  const triggerRecipes = (newPageNo) => {
    setPageNo(newPageNo);
    trigger();
  };
  return {
    recipes: data?.data,
    recipesError: error,
    recipesIsError: isError,
    recipesIsLoading: isLoading,
    triggerRecipes,
    arrayOfPages,
    setPageNo,
    pageNo,
    fetchCount,
  };
};

export default useRecipes;
