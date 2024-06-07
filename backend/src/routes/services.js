const servicesRouter = require("express").Router();
const { 
  postService, 
  getServices, 
  getServiceByName, 
  putService, 
  deleteService,  
  fetchDataFromExternalApi
} = require("../handlers");

servicesRouter.get("/:name", getServiceByName);
servicesRouter.get("/", getServices);

servicesRouter.post("/", postService);
servicesRouter.post("/fetchData", fetchDataFromExternalApi);

servicesRouter.put("/:name/:newApiKey", putService);

servicesRouter.delete("/:name", deleteService);

module.exports = servicesRouter;