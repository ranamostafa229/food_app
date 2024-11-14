const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";
const IMAGE_URL = "https://upskilling-egypt.com:3006/";

//USERS_URLS
const users_endpoints = {
  login: `Users/Login`,
  // register: `${BASE_URL}Users/Register`,
  resetRequest: `Users/Reset/Request`,
  reset: `Users/Reset`,
};
// CATEGORIES_URLS
const categories_endpoints = {
  GET_CATEGORIES: (pageSize, pageNumber) =>
    `${BASE_URL}Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  DELETE_CATEGORY: (id) => `Category/${id}`,
  POST_CATEGORY: `${BASE_URL}Category`,
  UPDATE_CATEGORY: (id) => `Category/${id}`,
};
// RECIPE_URLS
const recipes_endpoints = {
  recipes: (pageSize, pageNumber) =>
    `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  deleteRecipe: (id) => `Recipe/${id}`,
};
export {
  BASE_URL,
  IMAGE_URL,
  users_endpoints,
  categories_endpoints,
  recipes_endpoints,
};
