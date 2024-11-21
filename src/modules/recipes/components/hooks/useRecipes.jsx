import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import { apiInstance } from "../../../../services/api/apiInstance";

const useRecipes = () => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [name, setName] = useState(" ");
  const [pageSize, setPageSize] = useState(3);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");

  const getRecipes = async (
    pageNo = 1,
    pageSize = 3,
    name = "",
    tag = "",
    category = ""
  ) => {
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
  };
  const { data, isLoading, isError, error, trigger, fetchCount } = useFetch(
    () => getRecipes(pageNo, pageSize, name, tag, category)
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
    recipesIsLoading: isLoading,
    triggerRecipes,
    arrayOfPages,
    setPageNo,
    pageNo,
    fetchCount,
  };
};

export default useRecipes;
