const sequelize = require("../config/db");
const Movie = require("./Movie");
const User = require("./User");

module.exports = { sequelize, Movie, User };
