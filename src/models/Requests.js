const { openldr } = require("../database");
const { DataTypes } = require("sequelize");

const Requests = openldr.define(
  "Requests",
  {
    RequestID: DataTypes.STRING,
    DateTimeStamp: DataTypes.DATE,
    RequestID: DataTypes.STRING,
    OBRSetID: DataTypes.INTEGER,
    LOINCPanelCode: DataTypes.STRING,
    LIMSPanelCode: DataTypes.STRING,
    LIMSPanelDesc: DataTypes.STRING,
    SpecimenDateTime: DataTypes.DATE,
    RegisteredDateTime: DataTypes.DATE,
    ReceivedDateTime: DataTypes.DATE,
    AnalysisDateTime: DataTypes.DATE,
    AuthorisedDateTime: DataTypes.DATE,
  },
  {
    timestamps: false,
  }
);

Requests.removeAttribute("id");

module.exports = Requests;
