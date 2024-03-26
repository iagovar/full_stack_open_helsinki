/**
 * Library/Module imports
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

/**
 * Load local middleware
 */

// Router
const blogsRouter = require("./controllers/blogsRouter");

/**
 * Load config files
 */

const mongoConfig = require("./config/mongodb.config.json");

/**
 * Initialize app & set up middleware
 */

try {
    const mongoUrl = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}/${mongoConfig.database}?retryWrites=true&w=majority`;
    (async () => {
        logger.info("Connecting to MongoDB");
        await mongoose.connect(mongoUrl);
        logger.info("Connected to MongoDB");
    })();
} catch (error) {
    logger.error(error);
    logger.info("Could not connect to MongoDB. Exiting...");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.static("view"));
app.use(express.json());
app.use(blogsRouter);

module.exports = app;