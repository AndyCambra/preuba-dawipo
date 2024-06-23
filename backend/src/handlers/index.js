const { postConnector } = require("./connectors/postConnector");
const { getConnectors } = require("./connectors/getConnectors");
const { getConnectorByName } = require("./connectors/getConnectorByName");
const { putConnector } = require("./connectors/putConnector");
const { deleteConnector } = require("./connectors/deleteConnector");
const { setEConnectors } = require("./connectors/setEConnectors");

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
  setEConnectors,

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
