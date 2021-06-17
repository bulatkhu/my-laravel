const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path:   path.resolve(__dirname + "/../.env") });

module.exports = {
    redisConfig: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    },
    url: process.env.APP_URI,
    serverPort: process.env.NODEJS_SERVER_PORT,
    apiPort: process.env.APP_PORT
}
