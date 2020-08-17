const si = require("systeminformation");

module.exports = {
  async index(req, res) {
    const cpu = await si.cpuCurrentspeed();
    const ram = await si.mem();

    return res.json({
      cpu: cpu,
      ram: ram,
    });
  },
};
