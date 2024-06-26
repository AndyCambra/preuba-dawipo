import { ProductsController } from "./ProductsController";

const productController = new ProductsController();

export const _getProductByName = async (name: string) => {
  const product = await productController.getByName(name);

  if (!product) {
    throw new Error("Product not found");
  } else {
    return product;
  }
};
