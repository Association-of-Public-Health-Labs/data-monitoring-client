var Service = require("node-windows").Service;
const path = require("path");

var svc = new Service({
  name: "Server Monitoring",
  description: "This is a Windows service for LIMS Servers Monitoring",
  script: path.join(__dirname, "server.js"),
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

svc.on("install", function () {
  svc.start();
});

svc.install();
