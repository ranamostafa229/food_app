import { useCallback } from "react";
import useFetch from "../../../../hooks/useFetch";
import { tags_endpoints } from "../../../../services/api/apiConfig";
import { apiInstance } from "../../../../services/api/apiInstance";

const useTags = (shouldFetch) => {
  const getTags = useCallback(async () => {
    let response = await apiInstance.get(tags_endpoints.GET_TAGS);
    return response;
  }, []);
  const { data, isFetching, isError, error, trigger } = useFetch(
    getTags,
    shouldFetch
  );

  return {
    tags: data?.data,
    tagsError: error,
    tagsIsError: isError,
    tagsIsFetching: isFetching,
    triggerTags: trigger,
  };
};

export default useTags;
