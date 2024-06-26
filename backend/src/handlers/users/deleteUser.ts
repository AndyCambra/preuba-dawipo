import { Request, Response } from "express";
import { userController } from "../../controllers";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;

  try {
    await userController.deleteByName(name);

    res.status(200).json({
      message: "The user was deleted successfully",
    });
  } catch (error: any) {
    // Tipado del error, el any en TypeScript es para que acepte cualquier tipo de error
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
