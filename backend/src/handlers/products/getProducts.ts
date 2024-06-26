import { Request, Response } from "express";
import { productController } from "../../controllers";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProducts = await productController.getAll();

    res.status(201).json({
      message: "The Products were obtained successfully",
      products: allProducts,
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  getProducts,
};
