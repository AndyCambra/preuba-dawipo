import bcrypt from "bcrypt";
import { UsersController } from "./UsersController";

const userController = new UsersController();

const _registerUser = async (
  name: string,
  lastName: string,
  email: string,
  password: string,
  avatarUrl?: string,
  rol: "user" | "admin" = "user"
) => {
  const findUser = await userController.getByName(name);

  if (findUser) {
    throw new Error(`${name} has already been registered`);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await userController.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      avatarUrl,
      rol,
    });
  }
};

export { _registerUser };
