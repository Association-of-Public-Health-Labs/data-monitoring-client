require("dotenv/config");

const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("./config/api");

const cpu = require("./utils/cpu");

const SystemController = require("./controllers/SystemController");

const app = express();

const routes = express.Router();

require("./websocket");
require("./schedule");

routes.get("/osinfo", SystemController.index);

app.use(routes);

app.listen(6767);
