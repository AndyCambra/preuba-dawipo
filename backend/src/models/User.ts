import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {
  public id!: string;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public avatarUrl?: string;
  public rol!: "user" | "admin";

  static initialize(sequelize: Sequelize) {
    User.init(
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
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatarUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        rol: {
          type: DataTypes.ENUM("user", "admin"),
          defaultValue: "user",
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}

export default User;
