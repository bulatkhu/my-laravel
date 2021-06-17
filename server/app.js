const axios = require("axios");
const { url, apiPort, serverPort } = require("./config");
axios.defaults.baseURL = `http://${url}:${apiPort}/api/bot`;

const server = require("./server");
const { io } = require("./SocketIO");
const RedisController = require("./Controllers/RedisController");
const DoubleController = require("./Controllers/DoubleController");

RedisController(io);
DoubleController(io);

server.listen(serverPort, () => {
    console.log("server is started on port", serverPort, "and url", axios.defaults.baseURL);
});
