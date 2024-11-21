import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useCategories = () => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [name, setName] = useState("");

  // const [totalCategory, setTotalCategory] = useState(0);
  const getCategories = async (pageNo = 1, pageSize = 3, name = "") => {
    let response = await privateApiInstance.get(
      categories_endpoints.GET_CATEGORIES,
      {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          name: name,
        },
      }
    );
    setArrayOfPages(
      Array(response?.data?.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );
    // setTotalCategory(response?.data?.totalNumberOfPages);
    return response;
  };
  const { data, isLoading, isError, error, trigger, fetchCount, setData } =
    useFetch(() => getCategories(pageNo, pageSize, name));
  const triggerCategories = (newPageNo, newPageSize, newName) => {
    setPageNo(newPageNo);
    setPageSize(newPageSize);
    setName(newName);
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
    // totalCategory,
  };
};

export default useCategories;
