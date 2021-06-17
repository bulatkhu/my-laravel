const { redisConfig } = require("../helpers");

const Redis = require("redis");
const RedisClient = Redis.createClient(redisConfig);

class RedisController {
    constructor(io) {
        this.io = io;

        this.initRedis = this.initRedis.bind(this);
        this.initRedis();
    }

    initRedis() {
        RedisClient.on('error', err => {
            console.log('Error ' + err);
        });
        RedisClient.subscribe("newMessage");
        RedisClient.subscribe("loadChat");
        RedisClient.subscribe("newFake");
        RedisClient.on("connect", () => {
            console.log("redis client connected", RedisClient.address);
        });
        RedisClient.on("message", async (channel, message) => {
            this.io.sockets.emit(channel, JSON.parse(message));
        });
    }
}

module.exports = (io) => new RedisController(io);
