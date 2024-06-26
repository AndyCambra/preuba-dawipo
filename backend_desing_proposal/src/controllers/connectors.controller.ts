import { Request, Response } from 'express';
import { Connector } from '../models/connector.model';
import { handleControllerError } from '../utils/error.handlers';

export default class ConnectorsController {

  public static getAll = async (_req: Request, res: Response) => {
    try {            
      const connectors = await Connector.findAll();
      res.json(connectors);
    } catch (error: any) {      
      handleControllerError(error, res);
    }
  }; 
}