import { Request, Response } from 'express';
import ConnectorService from '../services/connectors.service';
import { validationResult } from 'express-validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response.handlers';
import { ConnectorAttributes } from '../types/models.interfaces';

export default class ConnectorsController {

  public static getAll = async (req: Request, res: Response) => {
    try {
      const connectors = await ConnectorService.getAllConnectors();
      sendSuccessResponse(res, connectors, 'Connectors retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const connectorId = req.params.id;

    try {
      const connector = await ConnectorService.getConnectorById(connectorId);
      sendSuccessResponse(res, connector, 'Connector retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, { message: errors.array().map(e => e.msg).join(', ') }, 400);
    }

    const connectorData: ConnectorAttributes = req.body;

    try {
      const newConnector = await ConnectorService.createConnector(connectorData);
      sendSuccessResponse(res, newConnector, "Connector created successfully", 201);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };
};