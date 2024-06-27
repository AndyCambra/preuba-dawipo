import { Shipment } from '../models/shipment.model';
import { ShipmentAttributes } from '../types/models.interfaces';

export default class ShipmentsService {
  public static async getAllShipments() {
    try {
      const allShipments = await Shipment.findAll();
      if (allShipments.length === 0) {
        throw new Error("There are no registered shipments yet");
      }
      return allShipments;
    } catch (error) {
      throw error;
    }
  }

  public static async getShipmentByName(name: string) {
    try {
      const shipment = await Shipment.findOne({ where: { name } });
      if (!shipment) {
        throw new Error(`Shipment with name ${name} not found`);
      }
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async getShipmentById(id: string) {
    try {
      const shipment = await Shipment.findByPk(id);
      if (!shipment) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async createShipment(attributes: ShipmentAttributes) {
    try {
      const newShipment = await Shipment.create(attributes);
      return newShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentByName(name: string, updates: Partial<ShipmentAttributes>) {
    try {
      const shipment = await Shipment.findOne({ where: { name } });
      if (!shipment) {
        throw new Error(`Shipment with name ${name} not found`);
      }
      await shipment.update(updates);
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentByName(name: string) {
    try {
      const shipment = await Shipment.findOne({ where: { name } });
      if (!shipment) {
        throw new Error(`Shipment with name ${name} not found`);
      }
      await shipment.destroy();
      return { message: `Shipment with name ${name} has been deleted` };
    } catch (error) {
      throw error;
    }
  }
}