require("dotenv/config");
const test_sequelize = require("./test.sequelize");
const { testAPIConnection, testVersion } = require("./test.api");

const test = async () => {
  await test_sequelize();
  await testAPIConnection();
  await testVersion();
};

test();
