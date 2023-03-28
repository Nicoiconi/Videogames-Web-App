const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    img_url: {
      type: DataTypes.STRING
    },
    img_public_id: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    createdByForm: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });
};