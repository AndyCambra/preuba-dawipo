const { postService } = require("./services/postService");
const { getServices } = require("./services/getServices");
const { getServiceByName } = require("./services/getServiceByName");
const { putService } = require("./services/putService");
const { deleteService } = require("./services/deleteService");
const { fetchDataFromExternalApi } = require("./services/fetchDataFromExternalApi");

const { postProduct } = require("./products/postProduct");
const { getProducts } = require("./products/getProducts");
const { getProductByName } = require("./products/getProductByName");
const { putProduct } = require("./products/putProduct");
const { deleteProduct } = require("./products/deleteProduct");
  
const { postUser } = require("./users/postUser");
const { getUsers } = require("./users/getUsers");
const { getUserByName } = require("./users/getUserByName");
const { putUser } = require("./users/putUser");
const { deleteUser } = require("./users/deleteUser");

module.exports = {
  postService,
  getServices,
  getServiceByName,
  putService,
  deleteService,
  fetchDataFromExternalApi,
  
  postProduct,
  getProducts,
  getProductByName,
  putProduct,
  deleteProduct,

  postUser,
  getUsers,
  getUserByName,
  putUser,
  deleteUser,
};
