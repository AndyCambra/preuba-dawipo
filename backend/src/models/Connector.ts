import { Model, DataTypes, Sequelize } from "sequelize";

class Connector extends Model {
  public id!: string;
  public name!: string;
  public apiUrl?: string;
  public apiKey?: string;

  static initialize(sequelize: Sequelize) {
    Connector.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
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
      },
      {
        sequelize,
        modelName: "Connector",
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}

export default Connector;
