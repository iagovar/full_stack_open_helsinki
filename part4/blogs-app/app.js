/**
 * Library/Module imports
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

/**
 * Load local middleware
 */

// Router
const blogsRouter = require("./controllers/blogsRouter");

/**
 * Initialize app & set up middleware
 */

try {
    (async () => {
        logger.info("Connecting to MongoDB");
        await mongoose.connect(config.MONGODB_URI);
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