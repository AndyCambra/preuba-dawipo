import { Shipment } from '../models/shipment.model';
import { IShipment } from '../types/models.interfaces';
import axios from 'axios';
import { CreateShipmentDTO, UpdateShipmentDTO } from '@/dtos/shipments.dtos';

export default class ShipmentService {
  public static async getAllShipments(): Promise<IShipment[]> {
    try {
      const allShipments: IShipment[] = await Shipment.findAll();
      if (allShipments.length === 0) {
        throw new Error('There are no shipments available');
      }
      return allShipments;
    } catch (error) {
      throw error;
    }
  }

  public static async getShipmentByName(name: string): Promise<IShipment> {
    try {
      const shipment: IShipment | null = await Shipment.findOne({
        where: { name },
      });
      if (!shipment) {
        throw new Error(`Shipment with name ${name} not found`);
      }
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async getShipmentByTrackingNumber(
    trackingNumber: string,
  ): Promise<IShipment> {
    try {
      const shipment: IShipment | null = await Shipment.findOne({
        where: { trackingNumber },
      });
      if (!shipment) {
        throw new Error(
          `Shipment with tracking number ${trackingNumber} not found`,
        );
      }
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async getShipmentById(id: string): Promise<IShipment> {
    try {
      const shipment: IShipment | null = await Shipment.findByPk(id);
      if (!shipment) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      return shipment;
    } catch (error) {
      throw error;
    }
  }

  public static async createShipment(
    shipmentData: CreateShipmentDTO | CreateShipmentDTO[],
  ): Promise<IShipment[]> {
    try {
      const dataArray: CreateShipmentDTO[] = Array.isArray(shipmentData)
        ? shipmentData
        : [shipmentData];

      const createPromises: Promise<IShipment>[] = dataArray.map(
        async (data) => {
          const { trackingNumber } = data;
          const existingShipment: IShipment | null = await Shipment.findOne({
            where: { trackingNumber },
          });

          if (existingShipment) {
            throw new Error(
              `Shipment with tracking number ${trackingNumber} already exists`,
            );
          }

          return Shipment.create(data);
        },
      );

      const createdShipments: IShipment[] = await Promise.all(createPromises);

      return createdShipments;
    } catch (error) {
      throw error;
    }
  }

  public static async formatAndValidateShipment(
    shipmentData: IShipment,
  ): Promise<IShipment> {
    try {
      const response = await axios.post<IShipment>(
        'http://localhost:5000/add_shipment',
        shipmentData,
      );
      return response.data;
    } catch (error) {
      console.error('Error in AI formatting and validation:', error);
      throw error;
    }
  }

  public static async updateShipmentByName(
    name: string,
    newData: UpdateShipmentDTO,
  ): Promise<IShipment> {
    try {
      const shipment: Shipment | null = await Shipment.findOne({
        where: { name },
      });

      if (!shipment) {
        throw new Error(`Shipment with name ${name} not found`);
      }
      await shipment.update(newData);
      return shipment as IShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentById(
    id: string,
    newData: UpdateShipmentDTO,
  ): Promise<IShipment> {
    try {
      const shipment: Shipment | null = await Shipment.findByPk(id);
      if (!shipment) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      await shipment.update(newData);
      return shipment as IShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async updateShipmentByTrackingNumber(
    trackingNumber: string,
    newData: UpdateShipmentDTO,
  ): Promise<IShipment> {
    try {
      const shipment: Shipment | null = await Shipment.findOne({
        where: { trackingNumber },
      });
      if (!shipment) {
        throw new Error(
          `Shipment with tracking number ${trackingNumber} not found`,
        );
      }
      await shipment.update(newData);
      return shipment as IShipment;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllShipments(): Promise<void> {
    try {
      await Shipment.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentByName(name: string): Promise<void> {
    try {
      const shipments: Shipment[] | null = await Shipment.findAll({
        where: { name },
      });
      if (shipments.length === 0) {
        throw new Error(`No shipments with name ${name} found`);
      }
      await Shipment.destroy({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentByTrackingNumber(
    trackingNumber: string,
  ): Promise<void> {
    try {
      const shipment: Shipment | null = await Shipment.findOne({
        where: { trackingNumber },
      });
      if (!shipment) {
        throw new Error(
          `Shipment with tracking number ${trackingNumber} not found`,
        );
      }
      await Shipment.destroy({ where: { trackingNumber } });
    } catch (error) {
      throw error;
    }
  }

  public static async deleteShipmentById(id: string): Promise<void> {
    try {
      const shipment: Shipment | null = await Shipment.findByPk(id);
      if (!shipment) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      await Shipment.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
