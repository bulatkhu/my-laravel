const axios = require("axios");
const RedisController = require("./Controllers/RedisController");
const DoubleController = require("./Controllers/DoubleController");
const { url, apiPort, serverPort } = require("./config");

axios.defaults.baseURL = `http://${url}:${apiPort}/api/bot`;

const server = require("./server");
const { io } = require("./SocketIO");

RedisController(io);
DoubleController(io);

server.listen(serverPort, () => {
    console.log("server is started on port", serverPort, "and url", axios.defaults.baseURL);
});
