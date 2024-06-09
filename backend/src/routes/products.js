const productsRouter = require("express").Router();
const {
  postProduct,
  getProducts,
  getProductByName,
  putProduct,
  deleteProduct,  
} = require("../handlers");

productsRouter.get("/:name", getProductByName);
productsRouter.get("/", getProducts);

productsRouter.post("/", postProduct);

productsRouter.put("/update", putProduct);

productsRouter.delete("/:name", deleteProduct);

module.exports = productsRouter;
