import { Router } from "express";
import {
  postConnector,
  getConnectors,
  getConnectorByName,
  putConnector,
  deleteConnector,
} from "../handlers";

const router = Router();

router.post("/", postConnector);
router.get("/", getConnectors);
router.get("/:name", getConnectorByName);
router.put("/:name", putConnector);
router.delete("/:name", deleteConnector);

export default router;
