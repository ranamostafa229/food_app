import { useCallback, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { categories_endpoints } from "../../../../services/api/apiConfig";
import { privateApiInstance } from "../../../../services/api/apiInstance";

const useCategories = (shouldFetch) => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [name, setName] = useState("");
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
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
    setArrayOfPages(
      Array(response?.data?.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );

    return response;
  }, []);

  const getAllCategories = useCallback(async () => {
    try {
      // Fetch total number of records
      const totalRecordsResponse = await privateApiInstance.get(
        categories_endpoints.GET_CATEGORIES,
        {
          params: {
            pageSize: 1,
            // Fetch only one record to get the total number of records
            pageNumber: 1,
          },
        }
      );
      const totalRecords = totalRecordsResponse?.data?.totalNumberOfRecords;
      // Fetch all categories using the total number of records as page size
      const response = await privateApiInstance.get(
        categories_endpoints.GET_CATEGORIES,
        {
          params: {
            pageSize: totalRecords,
            pageNumber: 1,
          },
        }
      );
      setAllCategories(response?.data?.data);
      return response;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  }, []);

  const { data, isFetching, isError, error, trigger, fetchCount, setData } =
    useFetch(
      useCallback(
        () => getCategories(pageNo, pageSize, name),
        [getCategories, pageNo, pageSize, name]
      ),
      shouldFetch
    );

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
    categoriesIsFetching: isFetching,
    triggerCategories,
    setCategories: setData,
    fetchCount,
    arrayOfPages,
    setPageNo,
    pageSize,
    totalNumberOfRecords,
    getAllCategories,
    allCategories,
  };
};

export default useCategories;
