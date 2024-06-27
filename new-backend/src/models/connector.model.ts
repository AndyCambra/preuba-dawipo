import { DataTypes, Model, BelongsToMany } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { ConnectorAttributes } from '../types/models.interfaces';
import { Shipment } from './shipment.model';
import { User } from './user.model';

class Connector extends Model<ConnectorAttributes> implements ConnectorAttributes {
  public id!: string;
  public name!: string;
  public apiUrl!: string;
  public apiKey!: string;

  public readonly shipments?: Shipment[];
  public readonly users?: User[];

  public static associations: {
    shipments: BelongsToMany<Connector, Shipment>;
    users: BelongsToMany<Connector, User>;
  };
}

Connector.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Connector',
  tableName: 'connectors',
  timestamps: false,
});

Connector.belongsToMany(Shipment, {
  through: 'ConnectorShipments',
  timestamps: false,
  onDelete: 'CASCADE',
});

Connector.belongsToMany(User, {
  through: 'UserConnectors',
  timestamps: false,
  onDelete: 'CASCADE',
});

export { Connector };
