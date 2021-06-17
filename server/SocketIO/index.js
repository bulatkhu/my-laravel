const SocketIO = require("socket.io");
const server = require("../server");

const SocketConfig = {
    allowEIO3: true ,
    cors: {
        methods: ['GET', 'PATCH', 'POST', 'PUT'],
        origin: true,
        credentials: true
    }
}

class SocketIoContainer {
    constructor() {
        this.io = SocketIO(server, SocketConfig);
        this.io.on("connection", this.onConnection.bind(this))
    }

    updateOnline() {
        this.SocketsEmit("online", this.io.engine.clientsCount);
    }

    SocketsEmit(channel, data) {
        this.io.sockets.emit(channel, data);
    }

    onConnection(socket) {

        socket.on("message", (data) => {
            this.io.sockets.emit("message", data);
            console.log("data", data);
        });

        socket.on("disconnect", () => {
            this.updateOnline();
        });

        this.updateOnline();
    }

}

module.exports = new SocketIoContainer();
