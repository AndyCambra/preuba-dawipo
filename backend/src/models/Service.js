const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Service', {
    id : {
      type : DataTypes.UUID,
      primaryKey : true,
      defaultValue : DataTypes.UUIDV4,
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_key : {
      type: DataTypes.STRING,
      allowNull: false,
    },         
  },
  {freezeTableName : true, timestamps : false}
  );
};
