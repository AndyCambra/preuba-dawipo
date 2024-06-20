const integrationsRouter = require("express").Router();
const {
  postIntegration,
  getIntegrations,
  getIntegrationByName,
  putIntegration,
  deleteIntegration,
  fetchDataFromExternalApi,
} = require("../handlers");

integrationsRouter.get("/:name", getIntegrationByName);
integrationsRouter.get("/", getIntegrations);

integrationsRouter.post("/", postIntegration);
integrationsRouter.post("/fetchAPIData", fetchDataFromExternalApi);

integrationsRouter.put("/update", putIntegration);

integrationsRouter.delete("/:name", deleteIntegration);

module.exports = integrationsRouter;
