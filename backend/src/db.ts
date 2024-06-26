import { Sequelize } from "sequelize";
import Product from "./models/Product";
import User from "./models/User";
import Connector from "./models/Connector";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
  throw new Error("Database environment variables are not set properly.");
}

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
  {
    dialect: "postgres",
    dialectModule: require("pg"),
    logging: false,
    native: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Initialize models
Product.initialize(sequelize);
User.initialize(sequelize);
Connector.initialize(sequelize);

// Define associations
User.belongsToMany(Connector, { through: "user_connectors" });
Connector.belongsToMany(User, { through: "user_connectors" });

export { sequelize as conn, Product, User, Connector };
