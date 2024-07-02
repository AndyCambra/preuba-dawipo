import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import { IShipment } from '../types/models.interfaces';
import ShipmentService from '../services/shipments.service';

export default class ShipmentsController {
  public static getAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const shipments: IShipment[] = await ShipmentService.getAllShipments();
      sendSuccessResponse(res, shipments, 'Shipments retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const name: string = req.params.name;

    try {
      const shipment: IShipment = await ShipmentService.getShipmentByName(name);
      sendSuccessResponse(
        res,
        shipment,
        `Shipment with name ${name} retrieved successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getByTrackingNumber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const trackingNumber: string = req.params.trackingNumber;

    try {
      const shipment: IShipment =
        await ShipmentService.getShipmentByTrackingNumber(trackingNumber);
      sendSuccessResponse(
        res,
        shipment,
        'Shipment retrieved successfully by tracking number',
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const shipmentId: string = req.params.id;

    try {
      const shipment: IShipment = await ShipmentService.getShipmentById(
        shipmentId,
      );
      sendSuccessResponse(res, shipment, 'Shipment retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static create = async (req: Request, res: Response): Promise<void> => {
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

    let shipmentData: IShipment = req.body;

    try {
      // Attempt to format and validate the shipment data using the AI service
      const formattedData: IShipment =
        await ShipmentService.formatAndValidateShipment(shipmentData);
      if (formattedData) {
        shipmentData = formattedData;
      }

      const newShipment = await ShipmentService.createShipment(shipmentData);
      sendSuccessResponse(
        res,
        newShipment,
        'Shipment created successfully',
        201,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const shipmentName: string = req.params.name;
    const newData: Partial<IShipment> = req.body;

    try {
      const updatedShipment: IShipment =
        await ShipmentService.updateShipmentByName(shipmentName, newData);

      sendSuccessResponse(
        res,
        updatedShipment,
        `Shipment with name ${shipmentName} updated successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const shipmentId: string = req.params.id;
    const newData: Partial<IShipment> = req.body;

    try {
      const updatedShipment: IShipment =
        await ShipmentService.updateShipmentById(shipmentId, newData);
      sendSuccessResponse(
        res,
        updatedShipment,
        `Shipment with ID ${shipmentId} updated successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByTrackingNumber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const trackingNumber: string = req.params.trackingNumber;
    const newData: Partial<IShipment> = req.body;

    try {
      const updatedShipment: IShipment =
        await ShipmentService.updateShipmentByTrackingNumber(
          trackingNumber,
          newData,
        );
      sendSuccessResponse(
        res,
        updatedShipment,
        `Shipment with tracking number ${trackingNumber} updated successfully`,
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
      await ShipmentService.deleteAllShipments();
      sendSuccessResponse(res, null, 'All shipments deleted successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const name: string = req.params.name;

    try {
      await ShipmentService.deleteShipmentByName(name);
      sendSuccessResponse(
        res,
        null,
        `Shipments with name ${name} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByTrackingNumber = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const trackingNumber: string = req.params.trackingNumber;

    try {
      await ShipmentService.deleteShipmentByTrackingNumber(trackingNumber);
      sendSuccessResponse(
        res,
        null,
        `Shipment with tracking number ${trackingNumber} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const shipmentId: string = req.params.id;

    try {
      await ShipmentService.deleteShipmentById(shipmentId);
      sendSuccessResponse(
        res,
        null,
        `Shipment with ID ${shipmentId} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };
}
