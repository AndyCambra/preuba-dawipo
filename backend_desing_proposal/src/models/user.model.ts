import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string | null;
  rol: 'user' | 'admin';
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public avatarUrl?: string | null;
  public rol!: 'user' | 'admin';
}

export function initialize(sequelize: Sequelize): void {
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    timestamps: false,
  });
}