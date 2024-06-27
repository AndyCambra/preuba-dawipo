import { Request, Response } from 'express';
import ShipmentsService from '../services/shipments.service';
import { handleControllerError } from '../utils/error.handlers';
import { ShipmentAttributes } from '../types/models.interfaces';

export default class ShipmentsController {

  public static getAll = async (_req: Request, res: Response) => {
    try {
      const allShipments = await ShipmentsService.getAllShipments();
      res.json(allShipments);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static getByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const shipment = await ShipmentsService.getShipmentByName(name);
      res.json(shipment);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const shipment = await ShipmentsService.getShipmentById(id);
      res.json(shipment);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static create = async (req: Request, res: Response) => {
    const shipmentData: ShipmentAttributes = req.body;
    try {
      const newShipment = await ShipmentsService.createShipment(shipmentData);
      res.json(newShipment);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static updateByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const updates: Partial<ShipmentAttributes> = req.body;
   
    try {
      const updatedShipment = await ShipmentsService.updateShipmentByName(name, updates);
      res.json(updatedShipment);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };
  
  public static deleteByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const result = await ShipmentsService.deleteShipmentByName(name);
      res.json(result);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };
}