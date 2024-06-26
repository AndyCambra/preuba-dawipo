import { ProductsController } from "./ProductsController";

const productController = new ProductsController();

export const _postProduct = async (
  name: string,
  description: string | undefined,
  price: number,
  stock: number,
  category: string | undefined,
  imageUrl: string | undefined,
  courier: string | undefined,
  originCountry: string,
  finalCountry: string,
  departureDate: Date,
  arrivalDate: Date,
  status: string,
  provider: string
) => {
  try {
    const newProduct = await productController.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      courier,
      originCountry,
      finalCountry,
      departureDate,
      arrivalDate,
      status,
      provider,
    });
    return newProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
