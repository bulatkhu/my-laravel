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

         this.startDate = null;
         this.winner = null;
         this.rollingAt = null;
         this.endAt = null;

        this.startDoubleGame = this.startDoubleGame.bind(this);
        this.io.on("connection", this.onConnection.bind(this));

        this.startDoubleGame();
        setInterval(this.startDoubleGame, this.gameDuration);
    }

    startDoubleGame() {
        this.startDate = Date.now();
        this.rollingAt = this.startDate + this.bettingTime;
        this.endAt = new Date(this.rollingAt + this.rouletteRollingTime);
        const startedDate = new Date(this.startDate);

        this.io.sockets.emit("startDouble", { startDate: startedDate, bettingTime: this.bettingTime })
        this.winner = colorsWithIndexes[randomInteger(0, colorsWithIndexes.length - 1)];

        setTimeout(async () => {
            try {
                const { data } = await axios.post("/roulette/store", {
                    endAt: this.endAt,
                    winnerId: this.winner.index,
                    winnerColor: this.winner.color,
                    rollingAt: new Date(this.rollingAt),
                    startAt: startedDate,
                });

                this.io.sockets.emit("endDouble", {
                    endAt: this.endAt,
                    winner: {
                        color: data.winnerColor,
                        index: data.winnerId,
                    },
                    rollingAt: new Date(this.rollingAt),
                    data,
                });
            } catch (e) {
                console.log("error on create roulette round", e.message);
            }
        }, this.bettingTime)
    }

    onConnection(socket) {
        socket.on("newDoubleBet", ({ type, amount, token }) => {
            console.log("new double bet", type, amount, token );
        });

        socket.emit("getLastDoubleBet", {
            startDate: new Date(this.startDate),
            winner: this.winner,
            rollingAt: new Date(this.rollingAt),
            endAt: this.endAt,
            bettingTime: this.bettingTime,
        });
    }
}

module.exports = (io) =>  new DoubleController(io);
