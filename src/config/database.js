const openldr = {
  database: process.env.OPENLDR_DB,
  username: process.env.OPENLDR_USER,
  password: process.env.OPENLDR_PASSWORD,
  options: {
    dialect: "mssql",
    host: process.env.HOST,
    dialectOptions: {
      options: {
        encrypt: false,
      },
      bigNumberStrings: true,
      multipleStatements: true
    },
  },
};

const disalab = {
  database: process.env.DISA_DB,
  password: process.env.DISA_PASSWORD,
  username: process.env.DISA_USER,
  options: {
    dialect: "mssql",
    host: process.env.HOST,
    dialectOptions: {
      options: {
        encrypt: false,
      },
      bigNumberStrings: true,
    },
  },
};

module.exports = { openldr: openldr, disalab: disalab };
