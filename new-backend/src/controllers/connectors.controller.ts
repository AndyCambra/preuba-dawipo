import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response.handlers';
import { ConnectorAttributes } from '../types/models.interfaces';
import ConnectorService from '../services/connectors.service';

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

  public static getByName = async (req: Request, res: Response) => {
    const connectorName = req.params.name;

    try {
      const connector = await ConnectorService.getConnectorByName(connectorName);
      sendSuccessResponse(res, connector, 'Connector retrieved successfully by name');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteAll = async (req: Request, res: Response) => {
    try {
      await ConnectorService.deleteAllConnectors();
      sendSuccessResponse(res, null, 'All connectors deleted successfully');
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteByName = async (req: Request, res: Response) => {
    const connectorName = req.params.name;

    try {
      await ConnectorService.deleteConnectorByName(connectorName);
      sendSuccessResponse(res, null, `Connector ${connectorName} deleted successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteById = async (req: Request, res: Response) => {
    const connectorId = req.params.id;

    try {
      await ConnectorService.deleteConnectorById(connectorId);
      sendSuccessResponse(res, null, `Connector with ID ${connectorId} deleted successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateByName = async (req: Request, res: Response) => {
    const connectorName = req.params.name;
    const newData: ConnectorAttributes = req.body;

    try {
      const updatedConnector = await ConnectorService.updateConnectorByName(connectorName, newData);
      sendSuccessResponse(res, updatedConnector, `Connector ${connectorName} updated successfully`);
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (req: Request, res: Response) => {
    const connectorId = req.params.id;
    const newData: ConnectorAttributes = req.body;

    try {
      const updatedConnector = await ConnectorService.updateConnectorById(connectorId, newData);
      sendSuccessResponse(res, updatedConnector, `Connector with ID ${connectorId} updated successfully`);
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