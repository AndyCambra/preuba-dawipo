import { Request, Response } from "express";
import { productController } from "../../controllers";

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;

  try {
    await productController.deleteByName(name);

    res.status(200).json({
      message: "The Product instance was deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
