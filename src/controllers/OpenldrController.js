const Requests = require("../models/Requests");
const { index } = require("./OpenldrController");
const { fn, Op, col, literal, where } = require("sequelize");
const moment = require("moment");

module.exports = {
  async index() {
    const data = await Requests.findOne({
      attributes: [
        [literal("SUBSTRING(RequestID,7,3)"), "lab"],
        [fn("year", col("RegisteredDatetime")), "year"],
        [fn("month", col("RegisteredDatetime")), "month"],
        [fn("DAY", col("RegisteredDatetime")), "days"],
        [fn("count", literal("Distinct RequestID")), "records"],
      ],
      where: {
        [Op.and]: [
          literal("year(RegisteredDatetime) = year(GETDATE())"),
          literal("month(RegisteredDatetime) = month(GETDATE())"),
          literal("day(RegisteredDatetime) = day(GETDATE())"),
        ],
      },
      group: [
        literal("SUBSTRING(RequestID,7,3)"),
        fn("year", col("RegisteredDatetime")),
        fn("month", col("RegisteredDatetime")),
        fn("DAY", col("RegisteredDatetime")),
      ],
      order: [
        [literal("SUBSTRING(RequestID,7,3)"), "DESC"],
        [fn("year", col("RegisteredDatetime")), "DESC"],
        [fn("month", col("RegisteredDatetime")), "DESC"],
        [fn("DAY", col("RegisteredDatetime")), "DESC"],
      ],
    });

    if (data) {
      return data.dataValues;
    }

    return { records: null };
  },
};
