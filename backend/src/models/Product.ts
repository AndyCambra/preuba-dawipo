import { Model, DataTypes, Sequelize } from "sequelize";

class Product extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public price?: number;
  public stock?: number;
  public category?: string;
  public imageUrl?: string;
  public courier?: string;
  public originCountry?: string;
  public finalCountry?: string;
  public departureDate?: Date;
  public arrivalDate?: Date;
  public status?: string;
  public provider?: string;

  static initialize(sequelize: Sequelize) {
    Product.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: 0.0,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        courier: {
          type: DataTypes.STRING,
          allowNull: true,
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
          type: DataTypes.DATE(6),
          allowNull: true,
        },
        arrivalDate: {
          type: DataTypes.DATE,
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
      },
      {
        sequelize,
        modelName: "Product",
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}

export default Product;
