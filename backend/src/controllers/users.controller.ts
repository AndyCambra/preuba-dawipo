import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { handleControllerError } from '../utils/error.handlers';
import AxiosService from '../services/external/axios.service';

const URL = 'https://jsonplaceholder.typicode.com/users';

export default class UsersController {

  public static getAll = async (_req: Request, res: Response) => {
    try {      
      const response = await AxiosService.placeholderApiInstance.get<User[]>(URL);            
      const users = response.data;            
      res.json(users);
    } catch (error: any) {         
      handleControllerError(error, res);
    }
  };
}