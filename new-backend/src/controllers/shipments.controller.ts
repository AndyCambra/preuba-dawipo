import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response.handlers';
import { ShipmentAttributes } from '../types/models.interfaces';
import ShipmentService from '../services/shipments.service';

export default class ShipmentsController {

  public static getAll = async (req: Request, res: Response) => {
    try {
      const shipments = await ShipmentService.getAllShipments();
      sendSuccessResponse(res, shipments, 'Shipments retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getByName = async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
      const shipment = await ShipmentService.getShipmentByName(name);
      sendSuccessResponse(res, shipment, `Shipment with name ${name} retrieved successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getByTrackingNumber = async (req: Request, res: Response) => {
    const trackingNumber = req.params.trackingNumber;

    try {
      const shipment = await ShipmentService.getShipmentByTrackingNumber(trackingNumber);
      sendSuccessResponse(res, shipment, 'Shipment retrieved successfully by tracking number');
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

  public static updateByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newData: ShipmentAttributes = req.body;

    try {
      const updatedShipments = await ShipmentService.updateShipmentsByName(name, newData);
      sendSuccessResponse(res, updatedShipments, `Shipments with name ${name} updated successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (req: Request, res: Response) => {
    const shipmentId = req.params.id;
    const newData: ShipmentAttributes = req.body;

    try {
      const updatedShipment = await ShipmentService.updateShipmentById(shipmentId, newData);
      sendSuccessResponse(res, updatedShipment, `Shipment with ID ${shipmentId} updated successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByTrackingNumber = async (req: Request, res: Response) => {
    const trackingNumber = req.params.trackingNumber;
    const newData: ShipmentAttributes = req.body;

    try {
      const updatedShipment = await ShipmentService.updateShipmentByTrackingNumber(trackingNumber, newData);
      sendSuccessResponse(res, updatedShipment, `Shipment with tracking number ${trackingNumber} updated successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteAll = async (req: Request, res: Response) => {
    try {
      await ShipmentService.deleteAllShipments();
      sendSuccessResponse(res, null, 'All shipments deleted successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByName = async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
      await ShipmentService.deleteShipmentByName(name);
      sendSuccessResponse(res, null, `Shipments with name ${name} deleted successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };  

  public static deleteByTrackingNumber = async (req: Request, res: Response) => {
    const trackingNumber = req.params.trackingNumber;

    try {
      await ShipmentService.deleteShipmentByTrackingNumber(trackingNumber);
      sendSuccessResponse(res, null, `Shipment with tracking number ${trackingNumber} deleted successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };  

  public static deleteById = async (req: Request, res: Response) => {
    const shipmentId = req.params.id;

    try {
      await ShipmentService.deleteShipmentById(shipmentId);
      sendSuccessResponse(res, null, `Shipment with ID ${shipmentId} deleted successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };  
};