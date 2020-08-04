// const { disalab, openldr } = require("../config/database");
const Sequelize = require("sequelize");

const openldr_db = new Sequelize("OpenLDRData", "sa", "disalab", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
    },
    bigNumberStrings: true,
  },
});

const disalab_db = new Sequelize("DisalabData", "sa", "disalab", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
    },
    bigNumberStrings: true,
  },
});

module.exports = {
  openldr: openldr_db,
  disalab: disalab_db,
};
