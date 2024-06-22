const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
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
    },
    { freezeTableName: true, timestamps: false },
  );
};
