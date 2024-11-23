import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useObjectUrl = (image) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!image) return;
    const objectUrl = URL.createObjectURL(image);
    setUrl(objectUrl);
    toast.success("Image uploaded successfully");

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);
  return { url, setUrl };
};

export default useObjectUrl;
