import { useEffect, useState } from "react";

const useFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);
  const trigger = () => {
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    })();
  }, [counter, fetchFn]);

  return { data, isLoading, isError, error, trigger };
};

export default useFetch;
