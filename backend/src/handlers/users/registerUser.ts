import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userController } from "../../controllers";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, lastName, email, password, avatarUrl } = req.body;

  try {
    const newUser = await userController.create({
      name,
      lastName,
      email,
      password,
      avatarUrl,
    });

    res.status(201).json({
      message: "The user was registered successfully",
      user: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
