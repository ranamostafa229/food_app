import { useEffect } from "react";

const useBeforeUnload = (callback, hasChanges) => {
  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      if (hasChanges) {
        e.preventDefault();
        callback && callback();
      }
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [callback, hasChanges]);
};

export default useBeforeUnload;
