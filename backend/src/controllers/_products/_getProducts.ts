import { ProductsController } from "./ProductsController";

const productController = new ProductsController();

export const _getProducts = async () => {
  const allProducts = await productController.getAll();

  if (allProducts.length === 0) {
    throw new Error("There are no registered products yet");
  } else {
    return allProducts;
  }
};
