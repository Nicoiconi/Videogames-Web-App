const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Platform", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};