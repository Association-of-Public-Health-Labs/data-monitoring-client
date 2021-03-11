const si = require("systeminformation");
// const disk = require('diskusage');
const os = require("./utils/cpu");
const isRunning = require("./utils/process");
const io = require("./config/socket");
const SystemController = require("./controllers/SystemController")

var interval = 1000;
var isDisacommsOn = false;

setInterval(async function () {
  if (io.connected) {
    const ram = await si.mem();
    const sqlagent = await SystemController.checkIfSQLAgentIsOnline();
    // const { free } = await disk.check("c:");

    isRunning(process.env.DISACOMMS, (status) => {
      isDisacommsOn = status
    });

    os.getPercentageUsage(interval, function (percentage) {
      io.emit("osinfo", {
        server_id: process.env.SERVER_ID,
        server_name: process.env.SERVER_NAME,
        server_category: process.env.SERVER_CATEGORY,
        cpu: percentage,
        ram: ram.used,
        sqlagent: sqlagent,
        isDisacommsOn: isDisacommsOn,
        diskFree: null
      });
      console.log({
        server_id: process.env.SERVER_ID,
        server_name: process.env.SERVER_NAME,
        server_category: process.env.SERVER_CATEGORY,
        cpu: percentage,
        ram: ram.used,
        sqlagent: sqlagent,
        isDisacommsOn: isDisacommsOn,
        diskFree: null
      })
    });
  }
}, interval);
