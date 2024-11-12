const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";

//USERS_URLS
const endpoints = {
  login: `Users/Login`,
  // register: `${BASE_URL}Users/Register`,
  resetRequest: `Users/Reset/Request`,
  reset: `Users/Reset`,
  categories: (pageSize, pageNumber) =>
    `${BASE_URL}Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  deleteCategory: (id) => `Category/${id}`,
  recipes: (pageSize, pageNumber) =>
    `Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
};
export { BASE_URL, endpoints };
