const RLNKIDX4 = require("../models/RLNKIDX4");
const { index } = require("./OpenldrController");
const { fn, Op, col, literal, where } = require("sequelize");
const moment = require("moment");

module.exports = {
  async index() {
    const data = await RLNKIDX4.findAll({
      attributes: [
        [literal("LEFT(LABNO,3)"), "lab"],
        [fn("year", col("REGDATE")), "year"],
        [fn("month", col("REGDATE")), "month"],
        [fn("DAY", col("REGDATE")), "days"],
        [fn("count", literal("Distinct LABNO")), "records"],
      ],
      where: {
        [Op.and]: [
          literal("year(REGDATE) = year(GETDATE())"),
          literal("month(REGDATE) = month(GETDATE())"),
        ],
      },
      group: [
        literal("LEFT(LABNO,3)"),
        fn("year", col("REGDATE")),
        fn("month", col("REGDATE")),
        fn("DAY", col("REGDATE")),
      ],
      order: [
        [literal("LEFT(LABNO,3)"), "DESC"],
        [fn("year", col("REGDATE")), "DESC"],
        [fn("month", col("REGDATE")), "DESC"],
        [fn("DAY", col("REGDATE")), "DESC"],
      ],
    });

    return { updated_at: moment().format("YYYY-MM-DD hh:mm:ss"), data: data };
  },
};
