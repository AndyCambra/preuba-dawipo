const { _postService } = require("./_postService");
const { _getServices } = require("./_getServices");
const { _putService } = require("./_putService");
const { _deleteService } = require("./_deleteService");

// External APIs controllers
const { _postExternalApi } = require("./_postExternalApi");
const { _getExternalApis } = require("./_getExternalApis");
const { _getExternalApiByName } = require("./_getExternalApiByName");
const { _deleteExternalApi } = require("./_deleteExternalApi");

module.exports = {
  _postService,
  _getServices,
  _putService,
  _deleteService,

  // External APIs controllers
  _postExternalApi,
  _getExternalApis,
  _getExternalApiByName,
};
