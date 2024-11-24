import { useCallback, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import { apiInstance } from "../../../../services/api/apiInstance";

const useRecipes = (shouldFetch) => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState();
  const [name, setName] = useState("");
  const [pageSize, setPageSize] = useState();
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");

  const getRecipes = useCallback(
    async (pageNo, pageSize, name = "", tag = "", category = "") => {
      let response = await apiInstance.get(recipes_endpoints.GET_RECIPES, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          name: name,
          tagId: tag,
          categoryId: category,
        },
      });
      setArrayOfPages(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      return response;
    },
    []
  );
  const { data, isFetching, isError, error, trigger, fetchCount } = useFetch(
    useCallback(
      () => getRecipes(pageNo, pageSize, name, tag, category),
      [pageNo, pageSize, name, tag, category, getRecipes]
    ),
    shouldFetch
  );
  const triggerRecipes = (
    newPageNo,
    newPageSize,
    newName,
    newTag,
    newCategory
  ) => {
    setPageNo(newPageNo);
    setPageSize(newPageSize);
    setName(newName);
    setTag(newTag);
    setCategory(newCategory);
    trigger();
  };
  return {
    recipes: data?.data,
    recipesError: error,
    recipesIsError: isError,
    recipesIsFetching: isFetching,
    triggerRecipes,
    arrayOfPages,
    setPageNo,
    pageNo,
    fetchCount,
  };
};

export default useRecipes;
