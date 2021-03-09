const socket = require("socket.io-client");


const io = socket(process.env.API_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    },
    query: {
        server_id: process.env.SERVER_ID,
        server_name: process.env.SERVER_NAME,
        server_category: process.env.SERVER_CATEGORY
    }
});

module.exports = io;