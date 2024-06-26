import { ProductsController } from "./ProductsController";

const productController = new ProductsController();

interface UpdateProductData {
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  imageUrl?: string;
  courier?: string;
  originCountry?: string;
  finalCountry?: string;
  departureDate?: Date;
  arrivalDate?: Date;
  status?: string;
  provider?: string;
}

export const _putProduct = async (
  name: string,
  updateData: UpdateProductData
) => {
  const [updatedCount, updatedProducts] = await productController.updateByName(
    name,
    updateData
  );

  if (updatedCount === 0) {
    throw new Error("That Product does not exist");
  }

  return updatedProducts[0];
};
