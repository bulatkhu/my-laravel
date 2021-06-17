const { url, apiPort, serverPort, redisConfig } = require("./config");
const app = require("express")();
const axios = require("axios");
const cors = require("cors");
const server = require("http").createServer(app);
const Redis = require("redis");
const RedisClient = Redis.createClient(redisConfig);

const io = require("socket.io")(server, {
    allowEIO3: true ,
    cors: {
        methods: ['GET', 'PATCH', 'POST', 'PUT'],
        origin: true,
        credentials: true
    }
});

RedisClient.on('error', err => {
    console.log('Error ' + err);
});

app.use(cors());

const restApiDomain = `http://${url}:${apiPort}`;

server.listen(serverPort, () => {
    console.log("server is started on port", serverPort, "and url", restApiDomain);
});

axios.defaults.baseURL = restApiDomain + "/api/bot";

RedisClient.subscribe("newMessage");
RedisClient.subscribe("loadChat");
RedisClient.subscribe("newFake");

RedisClient.on("connect", () => {
    console.log("redis client connected", RedisClient.address);
})

RedisClient.on("message", async (channel, message) => {
    io.sockets.emit(channel, JSON.parse(message));
})

io.on("connection", (socket) => {
    const updateOnline = () => {
        io.sockets.emit("online", io.engine.clientsCount);
    };

    socket.on("message", (data) => {
        io.sockets.emit("message", data);
        console.log("data", data)
    });

    socket.on("newDoubleBet", (data) => {
        console.log("new bet", data)
    })

    socket.on("disconnect", () => {
        updateOnline();
    });

    updateOnline();
});

const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


const bettingTime = 10000;
const rouletteRollingTime = 8000;
const timeout = 1000;
const gameDuration = bettingTime + rouletteRollingTime + timeout;

const colors = [
    "blue",
    "green",
    "blue",
    "green",
    "blue",
    "green",
    "blue",
    "green",
    "blue",
    "green",
    "blue",
    "green",
    "blue",
    "green",
    "gold"
];
const colorsWithIndexes = colors.map((color, index) => ({ color, index: index + 1 }));


const startDoubleGame = () => {
    const startDate = Date.now();
    const startedDate = new Date(startDate);
    io.sockets.emit("startDouble", { startDate: startedDate, bettingTime: bettingTime })
    const winner = colorsWithIndexes[randomInteger(0, colorsWithIndexes.length - 1)];

    setTimeout(async () => {
        const rollingAt = Date.now();
        const endAt = new Date(rollingAt + rouletteRollingTime);

        try {
            const { data } = await axios.post("/roulette/store", {
                endAt,
                winnerId: winner.index,
                winnerColor: winner.color,
                rollingAt: new Date(rollingAt),
                startAt: startedDate,
            })

            io.sockets.emit("endDouble", {
                endAt,
                winner: {
                    color: data.winnerColor,
                    index: data.winnerId,
                },
                rollingAt: new Date(rollingAt),
                data,
            })
        } catch (e) {
            console.log("error on create roulette round", e.message);
        }
    }, bettingTime)
}


// startDoubleGame();
setInterval(() => {
    startDoubleGame();
}, gameDuration);

RedisClient.on("error", (err) => {
    console.log("redis client error", err);
})
