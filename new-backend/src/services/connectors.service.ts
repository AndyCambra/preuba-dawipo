import { Connector } from '../models/connector.model';
import { ConnectorAttributes } from '../types/models.interfaces';

export default class ConnectorService {
  public static async getAllConnectors() {
    try {
      const allConnectors = await Connector.findAll();
      if (allConnectors.length === 0) {
        throw new Error("There are no connectors available");
      }
      return allConnectors;
    } catch (error) {
      throw error;
    }
  };

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
  };

  public static async createConnector(connectorData: ConnectorAttributes | ConnectorAttributes[]): Promise<Connector | Connector[]> {
    try {      
      const dataArray = Array.isArray(connectorData) ? connectorData : [connectorData];
      
      const createPromises = dataArray.map(async (data) => {
        const { name } = data;
        const existingConnector = await Connector.findOne({ where: { name } });

        if (existingConnector) {
          throw new Error(`${name} has already been created`);
        }

        return Connector.create(data);
      });

      const createdConnectors = await Promise.all(createPromises);
      
      return Array.isArray(connectorData) ? createdConnectors : createdConnectors[0];
    } catch (error) {
      throw error;
    }
  };
};
