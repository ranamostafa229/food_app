const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";
const IMAGE_URL = "https://upskilling-egypt.com:3006/";

//USERS_URLS
const users_endpoints = {
  LOGIN: `Users/Login`,
  REGISTER: `Users/Register`,
  VERFIY: `Users/verify`,
  RESET_REQUEST: `Users/Reset/Request`,
  RESET: `Users/Reset`,
  GET_USERS: `Users/`,
  DELETE_USER: (id) => `Users/${id}`,
};
// CATEGORIES_URLS
const categories_endpoints = {
  GET_CATEGORIES: (pageSize, pageNumber) =>
    `Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  DELETE_CATEGORY: (id) => `Category/${id}`,
  POST_CATEGORY: `Category`,
  UPDATE_CATEGORY: (id) => `Category/${id}`,
};
// RECIPE_URLS
const recipes_endpoints = {
  GET_RECIPES: (pageSize, pageNumber) =>
    `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  GET_RECIPE: (id) => `Recipe/${id}`,
  POST_RECIPE: `Recipe`,
  UPDATE_RECIPE: (id) => `Recipe/${id}`,
  DELETE_RECIPE: (id) => `Recipe/${id}`,
};
// TAGS_URLS
const tags_endpoints = {
  GET_TAGS: `tag/`,
};
export {
  BASE_URL,
  IMAGE_URL,
  users_endpoints,
  categories_endpoints,
  recipes_endpoints,
  tags_endpoints,
};
