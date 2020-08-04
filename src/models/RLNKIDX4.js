const { disalab } = require("../database");
const { DataTypes } = require("sequelize");

const RLNKIDX4 = disalab.define(
  "RLNKIDX4",
  {
    UNIQUEID: DataTypes.STRING,
    REGDATE: DataTypes.DATE,
    LABNO: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

RLNKIDX4.removeAttribute("id");

module.exports = RLNKIDX4;
