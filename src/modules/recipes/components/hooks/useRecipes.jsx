import useFetch from "../../../../hooks/useFetch";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import { apiInstance } from "../../../../services/api/apiInstance";

const getRecipes = async () => {
  let response = await apiInstance.get(recipes_endpoints.GET_RECIPES(10, 1));
  //   console.log(response);
  return response;
};
// console.log(getRecipes());
const useRecipes = () => {
  const { data, isLoading, isError, error, trigger } = useFetch(getRecipes);
  console.log(data?.data);
  return {
    recipes: data?.data,
    recipesError: error,
    recipesIsError: isError,
    recipesIsLoading: isLoading,
    triggerRecipes: trigger,
  };
};

export default useRecipes;
