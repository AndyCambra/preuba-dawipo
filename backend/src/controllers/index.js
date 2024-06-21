const { _postConnector } = require("./_connectors/_postConnector");
const { _getConnectors } = require("./_connectors/_getConnectors");
const { _getConnectorByName } = require("./_connectors/_getConnectorByName");
const { _putConnector } = require("./_connectors/_putConnector");
const { _deleteConnector } = require("./_connectors/_deleteConnector");

const { _postProduct } = require("./_products/_postProduct");
const { _getProducts } = require("./_products/_getProducts");
const { _getProductByName } = require("./_products/_getProductByName");
const { _putProduct } = require("./_products/_putProduct");
const { _deleteProduct } = require("./_products/_deleteProduct");

const { _registerUser } = require("./_users/_registerUser");
const { _loginUser } = require("./_users/_loginUser");
const { _getUsers } = require("./_users/_getUsers");
const { _getUserByName } = require("./_users/_getUserByName");
const { _putUser } = require("./_users/_putUser");
const { _deleteUser } = require("./_users/_deleteUser");

module.exports = {
  _postConnector,
  _getConnectors,
  _getConnectorByName,
  _putConnector,
  _deleteConnector,

  _postProduct,
  _getProducts,
  _getProductByName,
  _putProduct,
  _deleteProduct,

  _registerUser,
  _loginUser,
  _getUsers,
  _getUserByName,
  _putUser,
  _deleteUser,
};