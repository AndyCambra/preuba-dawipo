import { Shipment } from "../models/shipment.model";
import { ShipmentAttributes } from "../types/models.interfaces";

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

  public static async getShipmentByTrackingNumber(trackingNumber: string) {
    try {
      const shipment = await Shipment.findOne({ where: { trackingNumber } });
      if (!shipment) {
        throw new Error(
          `Shipment with tracking number ${trackingNumber} not found`
        );
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

  public static async createShipment(
    shipmentData: ShipmentAttributes | ShipmentAttributes[]
  ): Promise<Shipment | Shipment[]> {
    try {
      const dataArray = Array.isArray(shipmentData)
        ? shipmentData
        : [shipmentData];

      const createPromises = dataArray.map(async (data) => {
        const { trackingNumber } = data;
        const existingShipment = await Shipment.findOne({
          where: { trackingNumber },
        });

        if (existingShipment) {
          throw new Error(
            `Shipment with tracking number ${trackingNumber} already exists`
          );
        }

        return Shipment.create(data);
      });

      const createdShipments = await Promise.all(createPromises);

      return Array.isArray(shipmentData)
        ? createdShipments
        : createdShipments[0];
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentsByName(
    name: string,
    newData: ShipmentAttributes
  ) {
    try {
      const [updatedRows] = await Shipment.update(newData, { where: { name } });
      if (updatedRows === 0) {
        throw new Error(`No shipments with name ${name} found`);
      }
      const updatedShipments = await Shipment.findAll({ where: { name } });
      return updatedShipments;
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentByTrackingNumber(
    trackingNumber: string,
    newData: ShipmentAttributes
  ) {
    try {
      const [updatedRows] = await Shipment.update(newData, {
        where: { trackingNumber },
      });
      if (updatedRows === 0) {
        throw new Error(
          `Shipment with tracking number ${trackingNumber} not found`
        );
      }
      const updatedShipment = await Shipment.findOne({
        where: { trackingNumber },
      });
      return updatedShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentById(
    id: string,
    newData: ShipmentAttributes
  ) {
    try {
      const [updatedRows] = await Shipment.update(newData, { where: { id } });
      if (updatedRows === 0) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      const updatedShipment = await Shipment.findByPk(id);
      return updatedShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllShipments() {
    try {
      await Shipment.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentByName(name: string) {
    try {
      await Shipment.destroy({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentByTrackingNumber(trackingNumber: string) {
    try {
      await Shipment.destroy({ where: { trackingNumber } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentById(id: string) {
    try {
      const deletedRows = await Shipment.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}
