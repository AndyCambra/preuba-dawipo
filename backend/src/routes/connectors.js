const connectorsRouter = require("express").Router();
const {
  postConnector,
  getConnectors,
  getConnectorByName,
  putConnector,
  deleteConnector,  
} = require("../handlers");

connectorsRouter.get("/:name", getConnectorByName);
connectorsRouter.get("/", getConnectors);

connectorsRouter.post("/", postConnector);

connectorsRouter.put("/update", putConnector);

connectorsRouter.delete("/:name", deleteConnector);

module.exports = connectorsRouter;
