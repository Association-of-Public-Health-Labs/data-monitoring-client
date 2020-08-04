const Requests = require("../models/Requests");

module.exports = {
  async index(req, res) {
    const requests = await Requests.findAll();

    return res.json(requests);
  },
};
