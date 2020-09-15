const si = require("systeminformation");
const os = require("./utils/cpu");
const io = require("./config/socket");

var interval = 1000;

setInterval(async function () {
  if (io.connected) {
    const ram = await si.mem();
    os.getPercentageUsage(interval, function (percentage) {
      io.emit("osinfo", {
        server_id: process.env.SERVER_ID,
        cpu: percentage,
        ram: ram.used,
      });
    });
  }
}, interval);
