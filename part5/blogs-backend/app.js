/**
 * Library/Module imports
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/middleware/logger");
const config = require("./utils/config");
const tokenAndUserExtractor = require("./utils/middleware/tokenAndUserExtractor");

/**
 * Load local middleware
 */

// Router
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");

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
app.use(usersRouter);
app.use(tokenAndUserExtractor, blogsRouter);
app.use(loginRouter);


module.exports = app;