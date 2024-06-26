import { UsersController } from "./UsersController";

const userController = new UsersController();

export const _deleteUser = async (name: string): Promise<void> => {
  const findUser = await userController.getByName(name);

  if (!findUser) {
    throw new Error("That user does not exist");
  } else {
    await userController.deleteByName(name);
  }
};
