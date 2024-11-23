import { useEffect, useState } from "react";

const useFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);

  const trigger = () => {
    setFetchCount((prev) => prev + 1);
  };

  useEffect(() => {
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
  }, [fetchCount]);

  return { data, isFetching, isError, error, trigger, fetchCount, setData };
};

export default useFetch;
