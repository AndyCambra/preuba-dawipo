const { postIntegration } = require("./integrations/postIntegration");
const { getIntegrations } = require("./integrations/getIntegrations");
const { getIntegrationByName } = require("./integrations/getIntegrationByName");
const { putIntegration } = require("./integrations/putIntegration");
const { deleteIntegration } = require("./integrations/deleteIntegration");
const { fetchDataFromExternalApi } = require("./integrations/fetchDataFromExternalApi");

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
  postIntegration,
  getIntegrations,
  getIntegrationByName,
  putIntegration,
  deleteIntegration,
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
