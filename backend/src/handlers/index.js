const { postConnector } = require("./connectors/postConnector");
const { getConnectors } = require("./connectors/getConnectors");
const { getConnectorByName } = require("./connectors/getConnectorByName");
const { putConnector } = require("./connectors/putConnector");
const { deleteConnector } = require("./connectors/deleteConnector");
const { setConnectors } = require("./connectors/setConnectors");

const { postProduct } = require("./products/postProduct");
const { getProducts } = require("./products/getProducts");
const { getProductByName } = require("./products/getProductByName");
const { putProduct } = require("./products/putProduct");
const { deleteProduct } = require("./products/deleteProduct");

const { registerUser } = require("./users/registerUser");
const { loginUser } = require("./users/loginUser");
const { getUsers } = require("./users/getUsers");
const { getUserByName } = require("./users/getUserByName");
const { putUser } = require("./users/putUser");
const { deleteUser } = require("./users/deleteUser");

module.exports = {
  postConnector,
  getConnectors,
  getConnectorByName,
  putConnector,
  deleteConnector,
  setConnectors,

  postProduct,
  getProducts,
  getProductByName,
  putProduct,
  deleteProduct,

  registerUser,
  loginUser,
  getUsers,
  getUserByName,
  putUser,
  deleteUser,
};
