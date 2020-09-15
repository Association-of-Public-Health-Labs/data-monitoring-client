const api = require("../config/api");
const SystemController = require("../controllers/SystemController");
const os = require("os");

module.exports = {
  async checkConnectionWithAPI() {
    const osinfo = await SystemController.osInfo();
    const cpu = await os.cpus()[0];

    const { data } = await api.post(`servers/${process.env.SERVER_ID}`, {
      name: process.env.SERVER_NAME,
      category: process.env.SERVER_CATEGORY,
      cpu: cpu.model,
      ram: osinfo.ram,
      disk_storage: osinfo.disk_storage,
    });

    return data;
  },
};
