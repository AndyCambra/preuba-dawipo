import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsersController } from "./UsersController";

const userController = new UsersController();

export const _loginUser = async (email: string, password: string) => {
  const userRecord = await userController.getUserByEmail(email);

  if (!userRecord) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, userRecord.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: userRecord.id, email: userRecord.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1hr" }
  );

  return {
    token,
    user: {
      id: userRecord.id,
      name: userRecord.name,
      lastName: userRecord.lastName,
      email: userRecord.email,
    },
  };
};
