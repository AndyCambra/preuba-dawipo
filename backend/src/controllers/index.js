const { _postService } = require("./_services/_postService");
const { _getServices } = require("./_services/_getServices");
const { _putService } = require("./_services/_putService");
const { _deleteService } = require("./_services/_deleteService");
const { _getServiceByName } = require("./_services/_getServiceByName");

module.exports = {
  _postService,
  _getServices,
  _putService,
  _deleteService,
  _getServiceByName,
};
