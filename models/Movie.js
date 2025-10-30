const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Movie = sequelize.define(
  "Movie",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM("Movie", "TV Show"),
      allowNull: false,
      defaultValue: "Movie",
    },
    director: { type: DataTypes.STRING },
    budget: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    duration: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING },
    poster_url: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "movies",
    timestamps: true,
  }
);

module.exports = Movie;
