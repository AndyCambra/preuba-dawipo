const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Connector",
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
        allowNull: true, // Temporarily allow null
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false },
  );
};
