import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShipmentAttributes } from '../types/models.interfaces';

export class Shipment extends Model<ShipmentAttributes> implements ShipmentAttributes {
  public id!: string;
  public name!: string;
  public originCountry?: string | null;
  public finalCountry?: string | null;
  public departureDate?: string | null;
  public arrivalDate?: string | null;
  public status?: string | null;
  public provider?: string | null;
  public courier?: string | null;  
}

export function initialize(sequelize: Sequelize): void {
  Shipment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finalCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrivalDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courier: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
  }, {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipments',
    freezeTableName: true,
    timestamps: false,
  });
}