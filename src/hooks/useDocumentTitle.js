import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replaceAll("/", "-");
    document.title = `foodapp${path}`;
  }, [location]);
};

export default useDocumentTitle;
