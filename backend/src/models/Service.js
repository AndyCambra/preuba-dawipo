const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service",
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
        allowNull: false, // Temporarily allow null
      },
      apiKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
