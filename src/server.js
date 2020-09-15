require("dotenv/config");

const express = require("express");

const app = express();

require("./websocket");
require("./schedule");

app.listen(6767);
