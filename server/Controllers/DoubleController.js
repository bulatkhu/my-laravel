const axios = require("axios");
const { randomInteger } = require("../helpers");

const colors = [ "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "gold" ];
const colorsWithIndexes = colors.map((color, index) => ({ color, index: index + 1 }));

class DoubleController {
    constructor(io) {
        this.io = io;
        this.bettingTime = 10000;
        this.rouletteRollingTime = 8000;
        this.timeout = 1000;
        this.gameDuration = this.bettingTime + this.rouletteRollingTime + this.timeout;

        this.startDoubleGame = this.startDoubleGame.bind(this);
        this.io.on("connection", this.onConnection.bind(this));

        setInterval(this.startDoubleGame, this.gameDuration);
    }

    startDoubleGame() {
        const startDate = Date.now();
        const startedDate = new Date(startDate);

        this.io.sockets.emit("startDouble", { startDate: startedDate, bettingTime: this.bettingTime })
        const winner = colorsWithIndexes[randomInteger(0, colorsWithIndexes.length - 1)];

        setTimeout(async () => {
            const rollingAt = Date.now();
            const endAt = new Date(rollingAt + this.rouletteRollingTime);

            try {
                const { data } = await axios.post("/roulette/store", {
                    endAt,
                    winnerId: winner.index,
                    winnerColor: winner.color,
                    rollingAt: new Date(rollingAt),
                    startAt: startedDate,
                })

                this.io.sockets.emit("endDouble", {
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
        }, this.bettingTime)
    }

    onConnection(socket) {
        socket.on("newDoubleBet", (data) => {
            console.log("new double bet", data);
        });
    }
}

module.exports = (io) =>  new DoubleController(io);
