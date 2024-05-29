const app = require("./app.js");
const backendConfig = require("./config/backend.config.json");
const logger = require("./utils/middleware/logger");

app.listen(backendConfig.PORT, () => {
    logger.info(`Server running on port ${backendConfig.PORT}`);
});