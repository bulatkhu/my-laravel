const app = require("express")();
const axios = require("axios");
const cors = require("cors");
const server = require("http").createServer(app);
const Redis = require("redis");
const RedisClient = Redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});
const io = require("socket.io")(server, {
    allowEIO3: true ,
    cors: {
        methods: ['GET', 'PATCH', 'POST', 'PUT'],
        origin: true,
        credentials: true
    }
});


const PORT = process.env.PORT || 8081;
app.use(cors());

const restApiDomain = process.argv.slice(2)[0] || "http://127.0.0.1:8000";

server.listen(PORT, () => {
    console.log("server is started on port", PORT, "and url", restApiDomain);
});

axios.defaults.baseURL = restApiDomain + "api/bot";

RedisClient.subscribe("newMessage");
RedisClient.subscribe("loadChat");
RedisClient.subscribe("newFake");

RedisClient.on("connect", () => {
    console.log("redis client connected");
})

RedisClient.on("message", async (channel, message) => {
    console.log("channel", channel);
    io.sockets.emit(channel, JSON.parse(message));
    console.log("message", message);
})

io.on("connection", (socket) => {
    const updateOnline = () => {
        io.sockets.emit("online", io.engine.clientsCount);
    };

    socket.on("message", (data) => {
        io.sockets.emit("message", data);
        console.log("data", data)
    })

    socket.on("disconnect", () => {
        updateOnline();
    });

    updateOnline();
});

setInterval(() => {
    io.sockets.emit("message", "hello from server");
}, 3000)
























// const REDIS_PORT = 5000;
//
// const app = require("express");
// const Redis = require("redis");
// const server = require("http").createServer(app);
// const RedisClient = Redis.createClient(REDIS_PORT);
// const io = require("socket.io")(server);
//
// const axios = require("axios");
// const PORT = 8080;
// const restApiDomain = "http://127.0.0.1:8000";
// axios.defaults.baseURL = restApiDomain + '/api/bot/';
//
// console.log("restApiDomain", restApiDomain);
//
//
// server.listen(PORT, function() {
//     console.log('Server Started. Listening on *:' + PORT);
// });
//
RedisClient.on("error", (err) => {
    console.log("redis client error", err);
})
