import { Request, Response } from 'express';
import ConnectorsService from '../services/connectors.service';
import { handleControllerError } from '../utils/error.handlers';
import { ConnectorAttributes } from '../types/models.interfaces';

export default class ConnectorsController {

  public static getAll = async (_req: Request, res: Response) => {
    try {
      const allConnectors = await ConnectorsService.getAllConnectors();
      res.json(allConnectors);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static getByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const connector = await ConnectorsService.getConnectorByName(name);
      res.json(connector);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const connector = await ConnectorsService.getConnectorById(id);
      res.json(connector);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static create = async (req: Request, res: Response) => {
    const connectorData: ConnectorAttributes = req.body;
    try {
      const newConnector = await ConnectorsService.createConnector(connectorData);
      res.json(newConnector);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };

  public static updateByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const updates: Partial<ConnectorAttributes> = req.body;
   
    try {
      const updatedConnector = await ConnectorsService.updateConnectorByName(name, updates);
      res.json(updatedConnector);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };
  
  public static deleteByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const result = await ConnectorsService.deleteConnectorByName(name);
      res.json(result);
    } catch (error: any) {
      handleControllerError(error, res);
    }
  };
}
