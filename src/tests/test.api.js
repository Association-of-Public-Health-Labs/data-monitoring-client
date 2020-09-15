const ConnectionController = require("../controllers/ConnectionController");
const DisalabController = require("../controllers/DisalabController");
const OpenldrController = require("../controllers/OpenldrController");
const SystemController = require("../controllers/SystemController");
const api = require("../config/api");
const si = require("systeminformation");
const os = require("os");

const testAPIConnection = async () => {
  // const connection = await ConnectionController.checkConnectionWithAPI();

  // if (!connection) {
  //   showMessage("The Server is not connected with the API!");
  //   return;
  // }

  const ram = await si.mem();
  const disk = await si.diskLayout();
  const cpu = await os.cpus()[0].model;

  const server = await api.post(`servers/${process.env.SERVER_ID}`, {
    name: process.env.SERVER_NAME,
    category: process.env.SERVER_CATEGORY,
    cpu: cpu,
    ram: Math.round(ram.total / 1000000000),
    disk_storage: Math.round(disk[0].size / 1000000000),
  });

  if (!server.data) {
    console.log("The Server is not connected to the API!");
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

  if (data) {
    showMessage(
      "3. The Server is connected with the API and the link was estabilished successfully!"
    );
  }
};

const testVersion = async () => {
  // const connection = await ConnectionController.checkConnectionWithAPI();

  // if (!connection) {
  //   showMessage("The Server is not connected with the API!");
  //   return;
  // }

  const versions = await SystemController.version();

  const { data } = await api.put(`versions/${process.env.SERVER_ID}`, versions);

  if (data) {
    showMessage("4. The LIS version was loaded successfully!");
  }
};

function showMessage(text) {
  console.log("\u001b[" + 32 + "m" + text + "\u001b[0m");
}

module.exports = {
  testAPIConnection,
  testVersion,
};
