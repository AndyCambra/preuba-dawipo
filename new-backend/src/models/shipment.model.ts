import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, BelongsToMany } from 'sequelize-typescript';
import { Connector } from './connector.model';
import { ConnectorShipment } from './pivot-tables/connector-shipment.model';
import { ShipmentAttributes } from '../types/models.interfaces';

@Table({
  tableName: 'shipments',
  freezeTableName: true,
  timestamps: false,
})
export class Shipment extends Model<ShipmentAttributes> implements ShipmentAttributes {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  trackingNumber?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  originCountry?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  finalCountry?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  departureDate?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  arrivalDate?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  status?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  provider?: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  courier?: string | null;

  @BelongsToMany(() => Connector, () => ConnectorShipment)
  connectors!: Connector[];
};