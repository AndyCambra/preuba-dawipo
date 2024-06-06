const servicesRouter = require("express").Router();
const { postService, getServices, putService, deleteService } = require("../handlers");

servicesRouter.post("/", postService);
servicesRouter.get("/", getServices);
servicesRouter.put("/", putService);
servicesRouter.delete("/", deleteService);

module.exports = servicesRouter;