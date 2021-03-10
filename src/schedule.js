const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const api = require("./config/api");
const socket = require("./config/socket");
const SystemController = require("./controllers/SystemController");

// LIS Version schedule
cron.schedule("0 */6 * * *", async () => {
  await SystemController.updateVersions()
});

