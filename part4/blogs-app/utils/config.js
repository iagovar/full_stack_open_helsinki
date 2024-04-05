require("dotenv").config();
const mongoConfig = require("../config/mongodb.config.json");
const backendConfig = require("../config/backend.config.json");

const PORT = process.env.PORT ? process.env.PORT : backendConfig.PORT;
const MONGODB_STANDARDURI = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}/${mongoConfig.database}?retryWrites=true&w=majority`;

let MONGODB_URI;

if (process.env.NODE_ENV === "test") {
    MONGODB_URI = process.env.TEST_MONGODB_URI ? process.env.TEST_MONGODB_URI : null;
    if (MONGODB_URI === null) {
        throw new Error("TEST_MONGODB_URI is not defined");
    }
} else {
    MONGODB_URI = MONGODB_STANDARDURI;
}

module.exports = {
    MONGODB_URI,
    PORT
};