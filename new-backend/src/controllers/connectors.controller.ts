import { Request, Response } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import { IConnector } from '../types/models.interfaces';
import ConnectorService from '../services/connectors.service';

export default class ConnectorsController {
  public static getAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const connectors: IConnector[] =
        await ConnectorService.getAllConnectors();
      sendSuccessResponse(res, connectors, 'Connectors retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getByName = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const name: string = req.params.name;

    if (!name) {
      sendErrorResponse(res, 'Connector not found');
    }

    try {
      const connector: IConnector = await ConnectorService.getConnectorByName(
        name,
      );
      sendSuccessResponse(
        res,
        connector,
        `Connector with name ${name} retrieved successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static getById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const connectorId: string = req.params.id;

    try {
      const connector: IConnector = await ConnectorService.getConnectorById(
        connectorId,
      );
      sendSuccessResponse(res, connector, 'Connector retrieved successfully');
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static create = async (req: Request, res: Response): Promise<void> => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(
        res,
        {
          message: errors
            .array()
            .map((e: ValidationError) => e.msg)
            .join(', '),
        },
        400,
      );
    }

    const connectorData: IConnector = req.body;

    try {
      const newConnector: IConnector | IConnector[] =
        await ConnectorService.createConnector(connectorData);
      sendSuccessResponse(
        res,
        newConnector,
        'Connector created successfully',
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
    const name: string = req.params.name;
    const newData: IConnector = req.body;

    try {
      const updatedConnectors: IConnector[] =
        await ConnectorService.updateConnectorsByName(name, newData);
      sendSuccessResponse(
        res,
        updatedConnectors,
        `Connectors with name ${name} updated successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static updateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const connectorId: string = req.params.id;
    const newData: IConnector = req.body;

    try {
      const updatedConnector: IConnector =
        await ConnectorService.updateConnectorById(connectorId, newData);
      sendSuccessResponse(
        res,
        updatedConnector,
        `Connector with ID ${connectorId} updated successfully`,
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
      await ConnectorService.deleteAllConnectors();
      sendSuccessResponse(res, null, 'All connectors deleted successfully');
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
      await ConnectorService.deleteConnectorByName(name);
      sendSuccessResponse(
        res,
        null,
        `Connectors with name ${name} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };

  public static deleteById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const connectorId: string = req.params.id;

    try {
      await ConnectorService.deleteConnectorById(connectorId);
      sendSuccessResponse(
        res,
        null,
        `Connector with ID ${connectorId} deleted successfully`,
      );
    } catch (error: unknown) {
      sendErrorResponse(res, error);
    }
  };
}
