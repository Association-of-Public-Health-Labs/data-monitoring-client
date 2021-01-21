require("dotenv/config");

const express = require("express");

const SystemController = require("./controllers/SystemController")

const app = express();

require("./websocket");
require("./schedule");

const routes = express.Router();

routes.get("/sqlagent", SystemController.checkIfSQLAgentIsOnline);

app.use(routes);

app.listen(6767);
