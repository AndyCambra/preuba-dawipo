import { Request, Response } from 'express';
import ShipmentService from '../services/shipments.service';
import { validationResult } from 'express-validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response.handlers';
import { ShipmentAttributes } from '../types/models.interfaces';

export default class ShipmentsController {

  public static getAll = async (req: Request, res: Response) => {
    try {
      const shipments = await ShipmentService.getAllShipments();
      sendSuccessResponse(res, shipments, 'Shipments retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const shipmentId = req.params.id;

    try {
      const shipment = await ShipmentService.getShipmentById(shipmentId);
      sendSuccessResponse(res, shipment, 'Shipment retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, { message: errors.array().map(e => e.msg).join(', ') }, 400);
    }

    const shipmentData: ShipmentAttributes = req.body;

    try {
      const newShipment = await ShipmentService.createShipment(shipmentData);
      sendSuccessResponse(res, newShipment, "Shipment created successfully", 201);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };
};