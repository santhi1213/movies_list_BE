// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// module.exports = sequelize;

// db.js
const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();

const dialectOptions = {};

// if you downloaded the CA, include it:
if (process.env.AIVEN_CA_PATH) {
  dialectOptions.ssl = {
    ca: fs.readFileSync(process.env.AIVEN_CA_PATH)
  };
  // Some environments may need:
  dialectOptions.ssl.rejectUnauthorized = true;
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions
  }
);

module.exports = sequelize;
