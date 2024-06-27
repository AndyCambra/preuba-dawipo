import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.config';
import { ConnectorAttributes } from '../types/models.interfaces';

class Connector extends Model<ConnectorAttributes> implements ConnectorAttributes {
  public id!: string;
  public name!: string;
  public apiUrl!: string;
  public apiKey!: string;  
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

export { Connector };