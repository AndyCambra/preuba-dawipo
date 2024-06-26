import { ProductsController } from "./ProductsController";

const productController = new ProductsController();

export const _deleteProduct = async (name: string): Promise<void> => {
  const deletedCount = await productController.deleteByName(name);

  if (deletedCount === 0) {
    throw new Error("That product does not exist");
  }
};
