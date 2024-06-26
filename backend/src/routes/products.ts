import { Router } from "express"; // Cambio: Importa Router de express
import {
  postProduct,
  getProducts,
  getProductByName,
  putProduct,
  deleteProduct,
} from "../handlers";

const router = Router();

router.post("/", postProduct);
router.get("/", getProducts);
router.get("/:name", getProductByName);
router.put("/:name", putProduct);
router.delete("/:name", deleteProduct);

export default router;
