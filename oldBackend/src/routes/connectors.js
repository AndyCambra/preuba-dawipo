const connectorsRouter = require("express").Router();
const {
  postConnector,
  getConnectors,
  getConnectorByName,
  putConnector,
  deleteConnector,
  setEConnectors,
} = require("../handlers");

connectorsRouter.get("/:name", getConnectorByName);
connectorsRouter.get("/", getConnectors);

connectorsRouter.post("/", postConnector);
connectorsRouter.post("/set", setEConnectors);

connectorsRouter.put("/update", putConnector);

connectorsRouter.delete("/:name", deleteConnector);

module.exports = connectorsRouter;
