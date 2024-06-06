const servicesRouter = require("express").Router();
const { postService, getServices, putService, deleteService } = require("../handlers");

servicesRouter.post("/", postService);
servicesRouter.get("/", getServices);
servicesRouter.put("/:name/:newApiKey", putService);
servicesRouter.delete("/:name", deleteService);

module.exports = servicesRouter;