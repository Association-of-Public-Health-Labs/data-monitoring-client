const express = require("express");

const app = express();

const RequestController = require("./controllers/RequestController");
const RLNKIDX4Controller = require("./controllers/RLNKIDX4Controller");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "APHL" });
});

routes.get("/requests", RequestController.index);
routes.get("/disalab", RLNKIDX4Controller.index);

app.use(routes);

app.listen(6767);
