import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import { validationResult } from 'express-validator';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import { UserAttributes } from '../types/models.interfaces';

export default class UsersController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const users = await UsersService.getAllUsers();
      sendSuccessResponse(res, users, 'Users retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const user = await UsersService.getUserById(userId);
      sendSuccessResponse(res, user, 'User retrieved successfully');
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
      const newUser = await UsersService.createUser(userData);
      sendSuccessResponse(
        res,
        newUser,
        'The user was registered successfully',
        201,
      );
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };
}
