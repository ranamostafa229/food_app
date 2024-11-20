import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useCategories = () => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const getCategories = async (pageNo = 1) => {
    let response = await privateApiInstance.get(
      categories_endpoints.GET_CATEGORIES,
      {
        params: {
          pageSize: 3,
          pageNumber: pageNo,
        },
      }
    );
    setArrayOfPages(
      Array(response?.data?.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );
    return response;
  };
  const { data, isLoading, isError, error, trigger, fetchCount, setData } =
    useFetch(() => getCategories(pageNo));
  const triggerCategories = (newPageNo) => {
    setPageNo(newPageNo);
    trigger();
  };
  return {
    categories: data?.data,
    categoriesError: error,
    categoriesIsError: isError,
    categoriesIsLoading: isLoading,
    triggerCategories,
    setCategories: setData,
    fetchCount,
    arrayOfPages,
    setPageNo,
  };
};

export default useCategories;
