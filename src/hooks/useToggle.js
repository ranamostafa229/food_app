import { useCallback, useState } from "react";

const useToggle = (initialValue) => {
  const [visible, setVisible] = useState(initialValue);
  const toggle = useCallback(
    () => setVisible((prevVisible) => !prevVisible),
    []
  );
  return { visible, toggle };
};

export default useToggle;
