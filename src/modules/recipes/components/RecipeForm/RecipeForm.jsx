import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getRequiredMessage } from "../../../../services/validation/validationRules";
import {
  apiInstance,
  privateApiInstance,
} from "../../../../services/api/apiInstance";
import {
  IMAGE_URL,
  recipes_endpoints,
} from "../../../../services/api/apiConfig";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";
import UploadImgBox from "../../../shared/components/UploadImgBox/UploadImgBox";
import ShowUploadImgBox from "../../../shared/components/ShowUploadImgBox/ShowUploadImgBox";
import useCategories from "../../../categories/components/hooks/useCategories";
import useTags from "../../../tags/components/hooks/useTags";
import FillRecipesHeader from "../../../shared/components/FillRecipesHeader/FillRecipesHeader";
import useObjectUrl from "../../../../hooks/useObjectUrl";
// setValue("categoriesIds", [recipe?.category?.[0]?.id]);

const RecipeForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const initialValuesRef = useRef({});
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const categoriesQuery = useCategories(pathname.includes("/recipes"));
  const tagsQuery = useTags(pathname.includes("/recipes"));
  const newRecipe =
    recipeId === undefined && pathname === "/recipes/new-recipe";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });
  const watchedFields = watch();

  const selectedImg = watch("recipeImage");
  const imageName = selectedImg?.[0]?.name;
  const uploadedImage = getValues("recipeImage");

  const { url, setUrl } = useObjectUrl(selectedImg?.[0]);
  // const { url, setUrl } = useObjectUrl(
  //   new Blob([selectedImg?.[0]], { type: selectedImg?.[0].type })
  // );
  const { state } = useLocation();

  useEffect(() => {
    if (isDataLoaded) {
      initialValuesRef.current = getValues();
    }
  }, [getValues, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      const hasFormChanged = Object.keys(watchedFields).some(
        (key) => watchedFields[key] !== initialValuesRef.current[key]
      );
      setHasChanges(hasFormChanged);
    }
  }, [watchedFields, isDataLoaded]);

  useBeforeUnload(() => {
    localStorage.setItem("recipeData", JSON.stringify(getValues()));
  }, hasChanges);

  useEffect(() => {
    if (localStorage.getItem("recipeData")) {
      const data = JSON.parse(localStorage.getItem("recipeData"));
      for (let key in data) {
        if (key !== "recipeImage" && key !== "categoriesIds") {
          setValue(key, data[key]);
        } else {
          setValue(key, [data[key]]);
        }
      }
      setIsDataLoaded(true);
    }
  }, [setValue, tagsQuery.tags]);

  useEffect(() => {
    (async () => {
      tagsQuery?.triggerTags();
      await categoriesQuery?.getAllCategories();
      if (!newRecipe && !localStorage.getItem("recipeData")) {
        const getRecipe = async () => {
          const response = await apiInstance.get(
            recipes_endpoints.GET_RECIPE(recipeId)
          );
          const recipe = response?.data;
          console.log("recipe", recipe);
          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("price", recipe?.price);
          setValue("categoriesIds", recipe?.category[0]?.id);
          setValue("tagId", recipe?.tag?.id);
          setValue("recipeImage", recipe?.imagePath);
          setIsDataLoaded(true);
        };
        await getRecipe();
      }
    })();
  }, [recipeId, setValue, newRecipe]);

  const imageUrlToFileList = async (imageUrl) => {
    const blob = await fetch(IMAGE_URL + imageUrl).then((response) =>
      response.blob()
    );
    const file = new File([blob], imageUrl.split("/").pop(), {
      type: blob.type,
    });
    // const fileList = [file];
    return file;
  };

  const onSubmit = async (data) => {
    console.log("data.recipeImage:", data.recipeImage);
    console.log("selecedimg", selectedImg);
    const formData = new FormData();
    for (let key in data) {
      if (key !== "recipeImage" && key !== "categoriesIds") {
        formData.append(key, data[key]);
      } else if (key === "categoriesIds") {
        formData.append(key, [data[key]]);
      } else if (key === "recipeImage") {
        if (typeof data[key] === "string") {
          const file = await imageUrlToFileList(selectedImg);
          console.log("file:", file);
          if (file) {
            formData.append(key, file, {
              headers: {
                "Content-Type": "image/*",
              },
            });
          } else {
            console.error("Failed to convert image path to file");
          }
        } else if (data[key].length > 0) {
          formData.append(key, data[key][0]);
        } else {
          console.error("Invalid file input for recipeImage");
        }
      }
    }
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // [object File]
    }
    try {
      const response = await privateApiInstance[newRecipe ? "post" : "put"](
        newRecipe
          ? recipes_endpoints.POST_RECIPE
          : recipes_endpoints.UPDATE_RECIPE(recipeId),
        formData
      );
      if (response.status === 201) {
        toast.success(
          response?.data?.message || "The Recipe created successfully"
        );
        newRecipe
          ? navigate("/recipes")
          : navigate(`/recipes?page=${state?.pageNo}`);
      } else if (response.status === 200) {
        toast.success(
          response?.data?.message || "The Recipe updated successfully"
        );
        newRecipe
          ? navigate("/recipes")
          : navigate(`/recipes?page=${state?.pageNo}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="raw mx-3">
      <FillRecipesHeader action={newRecipe ? "Fill" : "Edit"} title={"All"} />
      <form
        className=" col-md-12 recipe-form "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="recipe-container d-flex flex-column gap-3 ">
          <div>
            <input
              type="text"
              className="form-control border-0 py-2 px-3 mb-2"
              placeholder="Recipe Name"
              {...register("name", { required: getRequiredMessage("Name") })}
            />
            {errors?.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>
          <div className="w-100">
            <select
              className="form-select border-0 py-2 px-3  mb-2"
              {...register("tagId", { required: getRequiredMessage("Tag") })}
            >
              <option value="">Tag</option>
              {tagsQuery?.tags?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors?.tagId && (
              <span className="text-danger">{errors.tagId.message}</span>
            )}
          </div>
          <div>
            <input
              type="number"
              min={0}
              placeholder="Price"
              className="form-control border-0 py-2 px-3  mb-2"
              {...register("price", { required: getRequiredMessage("Price") })}
            />
            {errors?.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
          </div>
          <div className="select-wrapper">
            <select
              className="form-select border-0 py-2 px-3  mb-2 custom-dropdown-menu "
              {...register("categoriesIds", {
                required: getRequiredMessage("Category"),
              })}
            >
              <option className="custom-dropdown-item" value="">
                Category
              </option>
              {categoriesQuery?.allCategories?.map(({ id, name }) => (
                <option key={id} value={id} className="custom-dropdown-item">
                  {name}
                </option>
              ))}
            </select>

            {errors.categoriesIds && (
              <span className="text-danger">
                {errors.categoriesIds.message}
              </span>
            )}
          </div>

          <div>
            <textarea
              className="form-control border-0 py-2 px-3  mb-2"
              placeholder="Description"
              rows={3}
              {...register("description", {
                required: getRequiredMessage("Description"),
              })}
            />
            {errors?.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
          </div>
          <UploadImgBox
            register={{ ...register("recipeImage") }}
            setValue={setValue}
            setImgUrl={setUrl}
            imageToUpload={"recipeImage"}
          />
          <ShowUploadImgBox
            imgUrl={url}
            imageName={imageName}
            uploadedImage={uploadedImage}
          />
        </div>
        <hr className="pb-1 text-muted " />
        <div className="buttons-container d-flex gap-5 px-3  ">
          <Link
            to={`/recipes?page=${state?.pageNo || 1}`}
            type="button"
            className="btn btn-outline-success cancel-button"
          >
            Cancel
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-success save-button"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
