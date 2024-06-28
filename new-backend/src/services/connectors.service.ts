import { Connector } from "../models/connector.model";
import { ConnectorAttributes } from "../types/models.interfaces";

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

  public static async createConnector(
    connectorData: ConnectorAttributes | ConnectorAttributes[]
  ): Promise<Connector | Connector[]> {
    try {
      const dataArray = Array.isArray(connectorData)
        ? connectorData
        : [connectorData];

      const createPromises = dataArray.map(async (data) => {
        return Connector.create(data); // Use data directly
      });

      const createdConnectors = await Promise.all(createPromises);

      return Array.isArray(connectorData)
        ? createdConnectors
        : createdConnectors[0];
    } catch (error) {
      throw error;
    }
  }

  public static async updateConnectorsByName(
    name: string,
    newData: ConnectorAttributes
  ) {
    try {
      const [updatedRows] = await Connector.update(newData, {
        where: { name },
      });
      if (updatedRows === 0) {
        throw new Error(`No connectors with name ${name} found`);
      }
      const updatedConnectors = await Connector.findAll({ where: { name } });
      return updatedConnectors;
    } catch (error) {
      throw error;
    }
  }

  public static async updateConnectorById(
    id: string,
    newData: ConnectorAttributes
  ) {
    try {
      const [updatedRows] = await Connector.update(newData, { where: { id } });
      if (updatedRows === 0) {
        throw new Error(`Connector with ID ${id} not found`);
      }
      const updatedConnector = await Connector.findByPk(id);
      return updatedConnector;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllConnectors() {
    try {
      await Connector.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteConnectorByName(name: string) {
    try {
      await Connector.destroy({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteConnectorById(id: string) {
    try {
      const deletedRows = await Connector.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error(`Connector with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}
