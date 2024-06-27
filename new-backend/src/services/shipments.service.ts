import { Shipment } from '../models/shipment.model';
import { ShipmentAttributes } from '../types/models.interfaces';

export default class ShipmentService {
  public static async getAllShipments() {
    try {
      const allShipments = await Shipment.findAll();
      if (allShipments.length === 0) {
        throw new Error("There are no shipments available");
      }
      return allShipments;
    } catch (error) {
      throw error;
    }
  };

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
  };

  public static async createShipment(shipmentData: ShipmentAttributes | ShipmentAttributes[]): Promise<Shipment | Shipment[]> {
    try {      
      const dataArray = Array.isArray(shipmentData) ? shipmentData : [shipmentData];
      
      const createPromises = dataArray.map(async (data) => {
        const { name } = data;
        const existingShipment = await Shipment.findOne({ where: { name } });

        if (existingShipment) {
          throw new Error(`${name} has already been created`);
        }

        return Shipment.create(data);
      });

      const createdShipments = await Promise.all(createPromises);
      
      return Array.isArray(shipmentData) ? createdShipments : createdShipments[0];
    } catch (error) {
      throw error;
    }
  };
};