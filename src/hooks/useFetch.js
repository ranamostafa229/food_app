import { useCallback, useEffect, useMemo, useState } from "react";

const useFetch = (fetchFn, shouldFetch) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);

  const trigger = useCallback(() => {
    setFetchCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;
    (async () => {
      setIsFetching(true);
      setIsError(false);
      setError(null);
      try {
        const response = await fetchFn();
        setData(response);
      } catch (error) {
        setError(error);
        setIsError(true);
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [fetchCount, fetchFn, shouldFetch]);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedError = useMemo(() => error, [error]);

  return {
    data: memoizedData,
    isFetching,
    isError,
    error: memoizedError,
    trigger,
    fetchCount,
    setData,
  };
};

export default useFetch;
