import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getRequiredMessage } from "../../../../services/validation/validationRules";
import {
  apiInstance,
  privateApiInstance,
} from "../../../../services/api/apiInstance";
import { recipes_endpoints } from "../../../../services/api/apiConfig";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";
import UploadImgBox from "../../../shared/components/UploadImgBox/UploadImgBox";
import ShowUploadImgBox from "../../../shared/components/ShowUploadImgBox/ShowUploadImgBox";
import useCategories from "../../../categories/components/hooks/useCategories";
import useTags from "../../../tags/components/hooks/useTags";

const RecipeForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgName, setImgName] = useState(null);
  const initialValuesRef = useRef({});
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const categoriesQuery = useCategories();
  const tagsQuery = useTags();
  const newRecipe =
    recipeId === undefined && pathname === "/recipes/new-recipe";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm({ defaultValues: { recipeImage: "" }, mode: "onChange" });

  const watchedFields = watch();
  const selectedImg = watch("recipeImage");

  useEffect(() => {
    if (selectedImg?.[0]) {
      if (selectedImg?.[0] && typeof selectedImg === "object") {
        setImgUrl(URL.createObjectURL(selectedImg?.[0]));
        setImgName(selectedImg?.[0]?.name);
        toast.success("Image uploaded successfully");
      }
    }
  }, [selectedImg]);

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
      for (let key in data) setValue(key, data[key]);
      setIsDataLoaded(true);
    }
  }, [setValue, tagsQuery.tags]);

  useEffect(() => {
    (async () => {
      tagsQuery.triggerTags();
      categoriesQuery.triggerCategories();
      if (!newRecipe && !localStorage.getItem("recipeData")) {
        const getRecipe = async () => {
          const response = await apiInstance.get(
            recipes_endpoints.GET_RECIPE(recipeId)
          );
          const recipe = response.data;
          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("price", recipe?.price);
          // setValue("categoriesIds", recipe?.category?.[0]?.id);
          setValue("categoriesIds", [recipe?.category?.[0]?.id]);
          setValue("tagId", recipe?.tag?.id);
          setValue("recipeImage", recipe?.imagePath);
          setIsDataLoaded(true);
        };
        await getRecipe();
      }
    })();
  }, [recipeId, setValue, newRecipe]);

  useEffect(() => {
    if (isDataLoaded) {
      const selectedCategoryId = getValues("categoriesIds")[0];
      const selectedCategory = categoriesQuery?.categories?.data.find(
        (category) => category.id === selectedCategoryId
      );
      if (selectedCategory) {
        setValue("categoriesIds", [selectedCategory.id]);
      }
    }
  }, [isDataLoaded, getValues, categoriesQuery?.categories?.data, setValue]);
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key !== "recipeImage") {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data?.[key][0]);
      }
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
        navigate("/recipes");
      } else if (response.status === 200) {
        toast.success(
          response?.data?.message || "The Recipe updated successfully"
        );
        navigate("/recipes");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
    // reset({ recipeImage: "", categoriesIds: "", tagId: "" });
  };

  return (
    <div className="raw mx-3">
      <header className="recipe-header d-flex justify-content-between  p-3 p-md-5">
        <div className="d-flex flex-column">
          <h4>
            Fill the <span className="text-success ">Recipes !</span>{" "}
          </h4>
          <span>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </span>
        </div>
        <Link
          to={"/recipes"}
          className="btn btn-success fw-bold d-flex gap-2 align-items-center ms-3"
        >
          All Recipes
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z"
              fill="white"
            />
          </svg>
        </Link>
      </header>
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
              {categoriesQuery?.categories?.data.map(({ id, name }) => (
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
            setImgUrl={setImgUrl}
            imageToUpload={"recipeImage"}
          />
          <ShowUploadImgBox imgUrl={imgUrl} imageName={imgName} />
        </div>
        <hr className="pb-1 text-muted " />
        <div className="buttons-container d-flex gap-5 px-3  ">
          <Link
            to={"/recipes"}
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
