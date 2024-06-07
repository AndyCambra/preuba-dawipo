const externalApisRouter = require("express").Router();
const {
  postExternalApi,
  getExternalApis,
  fetchDataFromExternalApi,
  deleteExternalApi,
  getExternalApiByName,
} = require("../handlers");

externalApisRouter.post("/", postExternalApi);
externalApisRouter.get("/", getExternalApis);
externalApisRouter.post("/fetch-data", fetchDataFromExternalApi);
externalApisRouter.delete("/", deleteExternalApi);
externalApisRouter.get("/:name", getExternalApiByName);

module.exports = externalApisRouter;
