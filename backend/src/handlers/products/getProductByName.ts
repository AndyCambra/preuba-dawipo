import { Request, Response } from "express";
import { productController } from "../../controllers";

export const getProductByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;

  try {
    const product = await productController.getByName(name);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};
