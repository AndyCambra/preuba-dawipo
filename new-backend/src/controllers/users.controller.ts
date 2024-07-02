import { Request, Response } from 'express';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import UserService from '../services/users.service';
import { IUser } from '../types/models.interfaces';

export default class UsersController {
  public static getAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const users: IUser[] = await UserService.getAllUsers();
      sendSuccessResponse(res, users, 'Users retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const username = req.params.name as string;

    try {
      const user: IUser = await UserService.getUserByUsername(username);
      sendSuccessResponse(
        res,
        user,
        `Username ${username} retrieved successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;

    try {
      const user: IUser = await UserService.getUserById(userId);
      sendSuccessResponse(res, user, 'User retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static register = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userData: IUser = req.body;

    try {
      const newUser: IUser = await UserService.registerUser(userData);
      sendSuccessResponse(res, newUser, 'User created successfully', 201);
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    try {
      const token: string = await UserService.login(email, password);
      sendSuccessResponse(res, { token }, 'Login successful');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const username = req.params.email as string;
    const newData: Partial<IUser> = req.body;

    try {
      const updatedUser: IUser = await UserService.updateUserByUsername(
        username,
        newData,
      );
      sendSuccessResponse(
        res,
        updatedUser,
        `User ${username} updated successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;
    const newData: Partial<IUser> = req.body;

    try {
      const updatedUser: IUser = await UserService.updateUserById(
        userId,
        newData,
      );
      sendSuccessResponse(
        res,
        updatedUser,
        `User with ID ${userId} updated successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await UserService.deleteAllUsers();
      sendSuccessResponse(res, null, 'All users deleted successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const email = req.params.email as string;

    try {
      await UserService.deleteUserByUsername(email);
      sendSuccessResponse(res, null, `Username ${email} deleted successfully`);
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;

    try {
      await UserService.deleteUserById(userId);
      sendSuccessResponse(
        res,
        null,
        `User with ID ${userId} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };
}
