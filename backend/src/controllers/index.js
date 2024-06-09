const { _postService } = require("./_services/_postService");
const { _getServices } = require("./_services/_getServices");
const { _getServiceByName } = require("./_services/_getServiceByName");
const { _putService } = require("./_services/_putService");
const { _deleteService } = require("./_services/_deleteService");

const { _postProduct } = require("./_products/_postProduct");
const { _getProducts } = require("./_products/_getProducts");
const { _getProductByName } = require("./_products/_getProductByName");
const { _putProduct } = require("./_products/_putProduct");
const { _deleteProduct } = require("./_products/_deleteProduct");

module.exports = {
  _postService,
  _getServices,
  _getServiceByName,
  _putService,
  _deleteService,

  _postProduct,
  _getProducts,
  _getProductByName,
  _putProduct,
  _deleteProduct,
};
