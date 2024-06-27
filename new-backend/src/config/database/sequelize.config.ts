import { Sequelize } from 'sequelize-typescript';
import { User } from '../../models/user.model';
import { Connector } from '../../models/connector.model';
import { UserConnector } from '../../models/pivot-tables/user-connector.model';
import { Shipment } from '../../models/shipment.model';
import { ConnectorShipment } from '../../models/pivot-tables/connector-shipment.model';

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: DB_NAME || 'database',
  username: DB_USER || 'username',
  password: DB_PASS || 'password',
  host: DB_HOST || 'localhost',
  port: parseInt(DB_PORT || '5432', 10),
  logging: false,
  models: [User, Connector, UserConnector, Shipment, ConnectorShipment],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
