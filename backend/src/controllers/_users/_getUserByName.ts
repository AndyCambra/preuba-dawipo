import { UsersController } from "./UsersController";

const userController = new UsersController();

export const _getUserByName = async (name: string) => {
  const user = await userController.getByName(name);

  if (!user) {
    throw new Error("User not found");
  } else {
    return user;
  }
};
