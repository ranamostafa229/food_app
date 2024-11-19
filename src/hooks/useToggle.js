import { useState } from "react";

const useToggle = (initialValue) => {
  const [passwordVisibility, setPasswordVisibility] = useState(initialValue);
  const togglePasswordVisibility = (index) => {
    setPasswordVisibility((prev) => {
      return prev.map((item, i) => {
        return i === index ? !item : item;
      });
    });
  };
  return { passwordVisibility, togglePasswordVisibility };
};

export default useToggle;
