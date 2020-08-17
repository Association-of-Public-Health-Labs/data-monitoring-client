const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const OpenldrController = require("./controllers/OpenldrController");
const DisalabController = require("./controllers/DisalabController");

cron.schedule("* */1 * * *", async () => {
  const disa = await DisalabController.index();
  const ldr = await OpenldrController.index();

  fs.writeFile(
    path.resolve(__dirname, "../cache", "disalab.json"),
    JSON.stringify(disa, null, 2),
    (err) => {
      if (err) throw new Error("Something went wrong!");

      console.log("File generated successfully");
    }
  );

  fs.writeFile(
    path.resolve(__dirname, "../cache", "openldr.json"),
    JSON.stringify(ldr, null, 2),
    (err) => {
      if (err) throw new Error("Something went wrong!");

      console.log("File generated successfully");
    }
  );
});
