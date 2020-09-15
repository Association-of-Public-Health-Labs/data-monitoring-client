var Service = require("node-windows").Service;

var svc = new Service({
  name: "Server Monitoring",
  description: "This is a Windows service for LIMS Servers Monitoring",
  script:
    "C:\\Users\\User\\Documents\\Projects\\APHL\\Github\\data-monitoring-client\\src\\server.js",
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

svc.on("install", function () {
  svc.start();
});

svc.install();
