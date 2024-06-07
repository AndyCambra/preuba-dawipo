const { postService } = require("./postService");
const { getServices } = require("./getServices");
const { putService } = require("./putService");
const { deleteService } = require("./deleteService");

// External APIs handlers
const { postExternalApi } = require("./postExternalApi");
const { getExternalApis } = require("./getExternalApis");
const { deleteExternalApi } = require("./deleteExternalApi");
const { getExternalApiByName } = require("./getExternalApiByName");

// Frontend Requests
const { fetchDataFromExternalApi } = require("./fetchDataFromExternalApi");

module.exports = {
  postService,
  getServices,
  putService,
  deleteService,

  // External APIs handlers
  postExternalApi,
  getExternalApis,
  deleteExternalApi,
  getExternalApiByName,

  //Frontend Requests
  fetchDataFromExternalApi,
};
