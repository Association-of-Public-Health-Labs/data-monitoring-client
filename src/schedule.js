const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const api = require("./config/api");
const socket = require("./config/socket");
const SystemController = require("./controllers/SystemController");
const ConnectionController = require("./controllers/ConnectionController");

// LIS Version schedule
cron.schedule("0 2 * * *", async () => {
  if (!socket.connected) {
    return;
  }

  const connection = await ConnectionController.checkConnectionWithAPI();

  if (!connection) {
    return;
  }

  const versions = await SystemController.version();

  const { data } = await api.put(`versions/${process.env.SERVER_ID}`, versions);
});
