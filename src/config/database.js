const openldr = {
  database: "OpenLDRData",
  username: "sa",
  password: "disalab",
  options: {
    dialect: "mssql",
    host: "localhost",
  },
};

const disalab = {
  database: "DisalabData",
  password: "disalab",
  username: "sa",
  options: {
    dialect: "mssql",
    host: "localhost",
  },
};

module.exports = { openldr: openldr, disalab: disalab };
