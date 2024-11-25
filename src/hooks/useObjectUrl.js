import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useObjectUrl = (image) => {
  const [url, setUrl] = useState(null);
  console.log(typeof image);
  // useEffect(() => {
  //   if (!image || typeof image === "string") return; //|| typeof image === "string"

  //   const objectUrl = URL.createObjectURL(image);
  //   console.log("file:", image);

  //   setUrl(objectUrl);
  //   toast.success("Image uploaded successfully");

  //   return () => {
  //     URL.revokeObjectURL(objectUrl);
  //   };
  // }, [image]);
  useEffect(() => {
    if (!image || typeof image === "string") return;

    const blob = new Blob([image], { type: image.type });
    const objectUrl = URL.createObjectURL(blob);
    console.log("file:", image);

    setUrl(objectUrl);
    toast.success("Image uploaded successfully");

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);
  return { url, setUrl };
};

export default useObjectUrl;
