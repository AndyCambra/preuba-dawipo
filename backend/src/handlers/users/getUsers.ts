import { Request, Response } from "express";
import { userController } from "../../controllers";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await userController.getAll();

    res.status(201).json({
      message: "The users have been obtained successfully",
      users: allUsers,
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
