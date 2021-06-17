const app = require("express")();
const cors = require("cors");

class Server {
    constructor() {
        const server = require("http").createServer(app);
        app.use(cors());

        return server;
    }
}

module.exports = new Server();
