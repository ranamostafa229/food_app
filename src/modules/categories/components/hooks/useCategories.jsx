import { useCallback, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useCategories = (shouldFetch) => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [name, setName] = useState("");
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);

  const getCategories = useCallback(async (pageNo, pageSize, name = "") => {
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
    setTotalNumberOfRecords(response?.data?.totalNumberOfRecords);
    console.log(response?.data?.totalNumberOfRecords);
    setArrayOfPages(
      Array(response?.data?.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );

    return response;
  }, []);

  const { data, isFetching, isError, error, trigger, fetchCount, setData } =
    useFetch(
      useCallback(
        () => getCategories(pageNo, pageSize, name),
        [getCategories, pageNo, pageSize, name]
      ),
      shouldFetch
    );

  const triggerCategories = useCallback(
    (newPageNo, newPageSize, newName) => {
      setPageNo(newPageNo);
      setPageSize(newPageSize);
      setName(newName);
      trigger();
    },
    [trigger]
  );
  return {
    categories: data?.data,
    categoriesError: error,
    categoriesIsError: isError,
    categoriesIsFetching: isFetching,
    triggerCategories,
    setCategories: setData,
    fetchCount,
    arrayOfPages,
    setPageNo,
    pageSize,
    totalNumberOfRecords,
    // totalCategory,
  };
};

export default useCategories;
