/* eslint-disable react/prop-types */

import { IMAGE_URL } from "../../../../services/api/apiConfig";
import noImg from "../../../../assets/no-img.jpg";

const FavoritesCard = ({ recipeItem, removeFromFavorite }) => {
  return (
    <div className="fav-card  d-flex flex-column ">
      <div className=" ">
        {recipeItem.recipe?.imagePath ? (
          <img
            src={IMAGE_URL + recipeItem.recipe?.imagePath}
            alt="recipe image"
          />
        ) : (
          <img src={noImg} alt="no image" className=" " />
        )}
      </div>
      <div className="px-2 d-flex flex-column fs-5 gap-1">
        <span>{recipeItem?.recipe?.name}</span>
        <span className="fav-desc">{recipeItem?.recipe?.description}</span>
      </div>
      <div className=" rounded fav-icon" onClick={removeFromFavorite}>
        <i
          className="fa-solid fa-heart text-success"
          aria-hidden="true"
          aria-label="heart"
        />
      </div>
    </div>
  );
};

export default FavoritesCard;
