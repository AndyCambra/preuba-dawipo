import { Connector } from '../models/connector.model';
import { ConnectorAttributes } from '../types/models.interfaces';

export default class ConnectorsService {
  public static async getAllConnectors() {
    try {
      const allConnectors = await Connector.findAll();
      if (allConnectors.length === 0) {
        throw new Error("There are no registered connectors yet");
      }
      return allConnectors;
    } catch (error) {
      throw error;
    }
  }

  public static async getConnectorByName(name: string) {
    try {
      const connector = await Connector.findOne({ where: { name } });
      if (!connector) {
        throw new Error(`Connector with name ${name} not found`);
      }
      return connector;
    } catch (error) {
      throw error;
    }
  }

  public static async getConnectorById(id: string) {
    try {
      const connector = await Connector.findByPk(id);
      if (!connector) {
        throw new Error(`Connector with ID ${id} not found`);
      }
      return connector;
    } catch (error) {
      throw error;
    }
  }

  public static async createConnector(attributes: ConnectorAttributes) {
    try {
      const newConnector = await Connector.create(attributes);
      return newConnector;
    } catch (error) {
      throw error;
    }
  }

  public static async updateConnectorByName(name: string, updates: Partial<ConnectorAttributes>) {
    try {
      const connector = await Connector.findOne({ where: { name } });
      if (!connector) {
        throw new Error(`Connector with name ${name} not found`);
      }
      await connector.update(updates);
      return connector;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteConnectorByName(name: string) {
    try {
      const connector = await Connector.findOne({ where: { name } });
      if (!connector) {
        throw new Error(`Connector with name ${name} not found`);
      }
      await connector.destroy();
      return { message: `Connector with name ${name} has been deleted` };
    } catch (error) {
      throw error;
    }
  }
}