import { Connector } from '../models/connector.model';
import { IConnector } from '../types/models.interfaces';

export default class ConnectorService {
  public static async getAllConnectors(): Promise<IConnector[]> {
    try {
      const allConnectors: IConnector[] = await Connector.findAll();
      if (allConnectors.length === 0) {
        throw new Error('There are no connectors available');
      }
      return allConnectors;
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async getConnectorByName(name: string): Promise<IConnector> {
    try {
      const connector: IConnector | null = await Connector.findOne({
        where: { name },
      });
      if (!connector) {
        throw new Error(`Connector with name ${name} not found`);
      }
      return connector;
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async getConnectorById(id: string): Promise<IConnector> {
    try {
      const connector: IConnector | null = await Connector.findByPk(id);
      if (!connector) {
        throw new Error(`Connector with ID ${id} not found`);
      }
      return connector;
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async createConnector(
    connectorData: IConnector | IConnector[],
  ): Promise<IConnector | IConnector[]> {
    try {
      const dataArray: IConnector[] = Array.isArray(connectorData)
        ? connectorData
        : [connectorData];

      const createdConnectors: IConnector[] = await Promise.all(
        dataArray.map(async (data: IConnector): Promise<IConnector> => {
          return await Connector.create(data);
        }),
      );

      return Array.isArray(connectorData)
        ? createdConnectors
        : createdConnectors[0];
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async updateConnectorsByName(
    name: string,
    newData: IConnector,
  ): Promise<IConnector[]> {
    try {
      const [updatedRows, updatedConnectors]: [number, IConnector[]] =
        await Connector.update(newData, {
          where: { name },
          returning: true,
        });

      if (updatedRows === 0) {
        throw new Error(`No connectors with name ${name} found`);
      }

      return updatedConnectors;
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async updateConnectorById(
    id: string,
    newData: IConnector,
  ): Promise<IConnector> {
    try {
      const [updatedRows, [updatedConnector]]: [number, IConnector[]] =
        await Connector.update(newData, {
          where: { id },
          returning: true,
        });

      if (updatedRows === 0) {
        throw new Error(`Connector with ID ${id} not found`);
      }

      return updatedConnector;
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async deleteAllConnectors(): Promise<void> {
    try {
      await Connector.destroy({ where: {} });
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async deleteConnectorByName(name: string): Promise<void> {
    try {
      const deletedRows: number = await Connector.destroy({ where: { name } });
      if (deletedRows === 0) {
        throw new Error(`No connectors with name ${name} found`);
      }
    } catch (error: unknown) {
      throw error;
    }
  }

  public static async deleteConnectorById(id: string): Promise<void> {
    try {
      const deletedRows: number = await Connector.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error(`Connector with ID ${id} not found`);
      }
    } catch (error: unknown) {
      throw error;
    }
  }
}
