import { Request, Response } from 'express';
import { Shipment } from '../models/shipment.model';
import { handleControllerError } from '../utils/error.handlers';

export default class ShipmentsController {

  public static getAll = async (_req: Request, res: Response) => {
    try {            
      const shipments = await Shipment.findAll();            
      res.json(shipments);
    } catch (error: any) {      
      handleControllerError(error, res);
    }
  };  
}