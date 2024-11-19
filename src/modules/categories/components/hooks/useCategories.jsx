import useFetch from "../../../../hooks/useFetch";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const getCategories = async () => {
  let response = await privateApiInstance.get(
    categories_endpoints.GET_CATEGORIES(10, 1)
  );
  return response;
};
const useCategories = () => {
  const { data, isLoading, isError, error, trigger } = useFetch(getCategories);
  return {
    categories: data?.data,
    categoriesError: error,
    categoriesIsError: isError,
    categoriesIsLoading: isLoading,
    triggerCategories: trigger,
  };
};

export default useCategories;
