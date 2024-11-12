const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";

//USERS_URLS
const users_endpoints = {
  login: `Users/Login`,
  // register: `${BASE_URL}Users/Register`,
  resetRequest: `Users/Reset/Request`,
  reset: `Users/Reset`,
};
// CATEGORIES_URLS
const categories_endpoints = {
  categories: (pageSize, pageNumber) =>
    `${BASE_URL}Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  deleteCategory: (id) => `Category/${id}`,
};
// RECIPE_URLS
const recipes_endpoints = {
  recipes: (pageSize, pageNumber) =>
    `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
};
export { BASE_URL, users_endpoints, categories_endpoints, recipes_endpoints };
