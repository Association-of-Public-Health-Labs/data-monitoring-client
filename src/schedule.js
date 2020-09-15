const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const api = require("./config/api");
const socket = require("./config/socket");
const OpenldrController = require("./controllers/OpenldrController");
const DisalabController = require("./controllers/DisalabController");
const SystemController = require("./controllers/SystemController");
const ConnectionController = require("./controllers/ConnectionController");

// Data Sync schedule
cron.schedule("* */1 * * *", async () => {
  if (!socket.connected) {
    return;
  }

  const connection = await ConnectionController.checkConnectionWithAPI();

  if (!connection) {
    return;
  }

  const disa = await DisalabController.index();
  const ldr = await OpenldrController.index();

  const { data } = await api.put(`servers/${process.env.SERVER_ID}/data`, {
    name: process.env.SERVER_NAME,
    category: process.env.SERVER_CATEGORY,
    report_date: String(new Date()),
    disalab_total_records: disa.records,
    openldr_total_records: ldr.records,
  });
});

// LIS Version schedule
cron.schedule("* */1 * * *", async () => {
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
