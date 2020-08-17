const express = require("express");
const fs = require("fs");
const path = require("path");

const SystemController = require("./controllers/SystemController");

const app = express();

const routes = express.Router();

require("./schedule");

routes.get("/", (req, res) => {
  return res.json({ message: "APHL" });
});

routes.get("/os", SystemController.index);

app.use(routes);

app.listen(6767);
