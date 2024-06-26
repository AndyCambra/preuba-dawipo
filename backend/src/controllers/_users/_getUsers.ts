import { UsersController } from "./UsersController";

const userController = new UsersController();

export const _getUsers = async () => {
  const allUsers = await userController.getAll();

  if (allUsers.length === 0) {
    throw new Error("There are no registered users yet");
  } else {
    return allUsers;
  }
};
