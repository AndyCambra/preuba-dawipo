const { _postIntegration } = require("./_integrations/_postIntegration");
const { _getIntegrations } = require("./_integrations/_getIntegrations");
const { _getIntegrationsByName } = require("./_integrations/_getIntegrationByName");
const { _putIntegration } = require("./_integrations/_putIntegration");
const { _deleteIntegration } = require("./_integrations/_deleteIntegration");

const { _postProduct } = require("./_products/_postProduct");
const { _getProducts } = require("./_products/_getProducts");
const { _getProductByName } = require("./_products/_getProductByName");
const { _putProduct } = require("./_products/_putProduct");
const { _deleteProduct } = require("./_products/_deleteProduct");

const { _postUser } = require("./_users/_postUser");
const { _getUsers } = require("./_users/_getUsers");
const { _getUserByName } = require("./_users/_getUserByName");
const { _putUser } = require("./_users/_putUser");
const { _deleteUser } = require("./_users/_deleteUser");

module.exports = {
  _postIntegration,
  _getIntegrations,
  _getIntegrationsByName,
  _putIntegration,
  _deleteIntegration,

  _postProduct,
  _getProducts,
  _getProductByName,
  _putProduct,
  _deleteProduct,

  _postUser,
  _getUsers,
  _getUserByName,
  _putUser,
  _deleteUser,
};