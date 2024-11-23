import { useCallback, useState } from "react";
import { privateApiInstance } from "../../../../../services/api/apiInstance";
import { users_endpoints } from "../../../../../services/api/apiConfig";
import useFetch from "../../../../../hooks/useFetch";

const useUsers = (shouldFetch) => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [userName, setUserName] = useState("");
  const [pageSize, setPageSize] = useState(3);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [groups, setGroups] = useState([]);

  const getUsers = useCallback(
    async (pageNo = 1, pageSize = 3, userName, email, country, groups) => {
      let response = await privateApiInstance.get(users_endpoints.GET_USERS, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          userName: userName,
          email: email,
          country: country,
          groups: groups,
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
      () => getUsers(pageNo, pageSize, userName, email, country, groups),
      [pageNo, pageSize, userName, email, country, groups, getUsers]
    ),
    shouldFetch
  );
  const triggerUsers = (
    newPageNo = pageNo,
    newPageSize = pageSize,
    newName,
    newEmail,
    newCountry,
    newGroups
  ) => {
    setPageNo(newPageNo);
    setPageSize(newPageSize);
    setUserName(newName);
    setEmail(newEmail);
    setCountry(newCountry);
    setGroups(newGroups);
    trigger();
  };
  return {
    users: data?.data,
    usersError: error,
    usersIsError: isError,
    usersIsFetching: isFetching,
    triggerUsers,
    arrayOfPages,
    setPageNo,
    pageNo,
    fetchCount,
  };
};

export default useUsers;
