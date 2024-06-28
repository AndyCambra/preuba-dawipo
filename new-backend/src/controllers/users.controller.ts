import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../types/models.interfaces';
import UserService from '../services/users.service';

export default class UsersController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers();
      sendSuccessResponse(res, users, 'Users retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getByName = async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
      const user = await UserService.getUserByName(name);
      sendSuccessResponse(
        res,
        user,
        `User with name ${name} retrieved successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserById(userId);
      sendSuccessResponse(res, user, 'User retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return sendErrorResponse(res, { message: 'User not found' }, 404);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return sendErrorResponse(res, { message: 'Invalid credentials' }, 401);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );

      res.json({ token });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(
        res,
        {
          message: errors
            .array()
            .map((e) => e.msg)
            .join(', '),
        },
        400,
      );
    }

    const userData: UserAttributes = req.body;

    try {
      const newUser = await UserService.registerUser(userData);
      sendSuccessResponse(res, newUser, 'User created successfully', 201);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newData: UserAttributes = req.body;

    try {
      const updatedUsers = await UserService.updateUserByName(name, newData);
      sendSuccessResponse(
        res,
        updatedUsers,
        `Users with name ${name} updated successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const newData: UserAttributes = req.body;

    try {
      const updatedUser = await UserService.updateUserById(userId, newData);
      sendSuccessResponse(
        res,
        updatedUser,
        `User with ID ${userId} updated successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteAll = async (req: Request, res: Response) => {
    try {
      await UserService.deleteAllUsers();
      sendSuccessResponse(res, null, 'All users deleted successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByName = async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
      await UserService.deleteUserByName(name);
      sendSuccessResponse(
        res,
        null,
        `Users with name ${name} deleted successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      await UserService.deleteUserById(userId);
      sendSuccessResponse(
        res,
        null,
        `User with ID ${userId} deleted successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };
}
