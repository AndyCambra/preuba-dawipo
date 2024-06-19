const servicesRouter = require("express").Router();
const {
  postService,
  getServices,
  getServiceByName,
  putService,
  deleteService,
  fetchDataFromExternalApi,
} = require("../handlers");

servicesRouter.get("/:name", getServiceByName);
servicesRouter.get("/", getServices);

servicesRouter.post("/", postService);
servicesRouter.post("/fetchAPIData", fetchDataFromExternalApi);

servicesRouter.put("/update", putService);

servicesRouter.delete("/:name", deleteService);

module.exports = servicesRouter;
