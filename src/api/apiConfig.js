const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";

const endpoints = {
  login: `${BASE_URL}Users/Login`,
  // register: `${BASE_URL}Users/Register`,
  resetRequest: `${BASE_URL}Users/Reset/Request`,
  reset: `${BASE_URL}Users/Reset`,
  categories: `${BASE_URL}Category/?pageSize=10&pageNumber=1`,
  deleteCategory: (id) => `${BASE_URL}Category/${id}`,
};
export { BASE_URL, endpoints };
