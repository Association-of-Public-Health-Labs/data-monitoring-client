const Sequelize = require("sequelize");

const openldr = new Sequelize(
  process.env.OPENLDR_DB,
  process.env.OPENLDR_USER,
  process.env.OPENLDR_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
      },
      bigNumberStrings: true,
    },
    // logging: false,
  }
);

const disalab = new Sequelize(
  process.env.DISA_DB,
  process.env.DISA_USER,
  process.env.DISA_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
      },
      bigNumberStrings: true,
    },
    logging: false,
  }
);

module.exports = {
  openldr: openldr,
  disalab: disalab,
};
