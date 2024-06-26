import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userController } from "../../controllers";
import { _loginUser } from "../../controllers/_users/_loginUser";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const { token, user } = await userController.login(
      email,
      password,
      _loginUser
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
