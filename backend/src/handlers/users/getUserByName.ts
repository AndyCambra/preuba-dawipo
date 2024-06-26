import { Request, Response } from "express";
import { userController } from "../../controllers";

export const getUserByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;

  try {
    const User = await userController.getByName(name);
    if (!User) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(User);
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching User", error: error.message });
  }
};
