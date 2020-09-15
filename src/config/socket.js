const socket = require("socket.io-client");

const io = socket(process.env.API_URL);

module.exports = io;
