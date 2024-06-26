import bcrypt from "bcrypt";
import { UsersController } from "./UsersController";

const userController = new UsersController();

interface UpdateUserData {
  lastName?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  rol?: "user" | "admin";
}

const _putUser = async (name: string, updateData: UpdateUserData) => {
  const findUser = await userController.getByName(name);

  if (!findUser) {
    throw new Error("That user does not exist");
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const [updatedCount, updatedUsers] = await userController.updateByName(
    name,
    updateData
  );

  if (updatedCount === 0) {
    throw new Error("Failed to update the user");
  }

  return updatedUsers[0];
};

export { _putUser };
