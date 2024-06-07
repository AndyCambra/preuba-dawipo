const { postService } = require("./services/postService");
const { getServices } = require("./services/getServices");
const { putService } = require("./services/putService");
const { deleteService } = require("./services/deleteService");
const { getServiceByName } = require("./services/getServiceByName");
const { fetchDataFromExternalApi } = require("./services/fetchDataFromExternalApi");

module.exports = {
  postService,
  getServices,
  putService,
  deleteService,
  getServiceByName,
  fetchDataFromExternalApi
};