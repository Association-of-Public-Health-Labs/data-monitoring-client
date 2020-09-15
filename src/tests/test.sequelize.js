const { openldr, disalab } = require("../database/index");

const testDatabasesConnection = async () => {
  try {
    await openldr.authenticate();
    showMessage(
      "1. Connection with OpenLDR has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  try {
    await disalab.authenticate();
    showMessage(
      "2. Connection with DisalabData has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

function showMessage(text) {
  console.log("\u001b[" + 32 + "m" + text + "\u001b[0m");
}

module.exports = testDatabasesConnection;
